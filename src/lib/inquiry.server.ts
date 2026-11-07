import { z } from "zod";
import { fieldLabels, inquirySchema, inquirySubjects, MAX_INQUIRY_BYTES, type Inquiry } from "./inquiry";
type RateLimiter = { limit: (input: { key: string }) => Promise<{ success: boolean }> };
export type WorkerEnvironment = { RESEND_API_KEY?: string; CONTACT_TO_EMAIL?: string; CONTACT_FROM_EMAIL?: string; CONTACT_RATE_LIMITER?: RateLimiter };
type RuntimeRequest = Request & { runtime?: { cloudflare?: { env?: WorkerEnvironment } } };
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}
export function buildInquiryEmail(data: Inquiry, timestamp: string) {
  const rows = [["Form type", inquirySubjects[data.formType]], ["Language", data.locale], ...Object.entries(data.fields).map(([key,value]) => [fieldLabels[key] ?? key, value || "—"]), ["Submission timestamp (UTC)", timestamp]];
  return { subject: inquirySubjects[data.formType], text: rows.map(([label,value]) => `${label}: ${value}`).join("\n\n"),
    html: `<html><body><h1>${escapeHtml(inquirySubjects[data.formType])}</h1><table cellpadding="8">${rows.map(([label,value]) => `<tr><th align="left" valign="top">${escapeHtml(label)}</th><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("")}</table></body></html>` };
}
function result(status: number, code: string) { return Response.json({ ok: status === 200, code }, { status, headers: { "Cache-Control": "no-store" } }); }
async function readLimitedBody(request: Request) {
  if (Number(request.headers.get("content-length")) > MAX_INQUIRY_BYTES || !request.body) return null;
  const reader = request.body.getReader(); const chunks: Uint8Array[] = []; let size = 0;
  while (true) { const { value, done } = await reader.read(); if (done) break; size += value.byteLength; if (size > MAX_INQUIRY_BYTES) { await reader.cancel(); return null; } chunks.push(value); }
  const bytes = new Uint8Array(size); let offset = 0; for (const chunk of chunks) { bytes.set(chunk,offset); offset += chunk.length; }
  return new TextDecoder().decode(bytes);
}
// Nitro 3's Cloudflare preset augments the original Request before invoking TanStack.
// Bindings are resolved per request. process.env is only a local Vite development fallback.
export async function handleInquiry(request: Request, send: typeof fetch = fetch): Promise<Response> {
  try {
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin) return result(403,"invalid");
    if (!request.headers.get("content-type")?.startsWith("application/json")) return result(415,"invalid");
    const raw = await readLimitedBody(request); if (raw === null) return result(413,"invalid");
    let input: unknown; try { input = JSON.parse(raw); } catch { return result(400,"invalid"); }
    const parsed = inquirySchema.safeParse(input); if (!parsed.success) return result(400,"invalid"); const data = parsed.data;
    const cloudflare = (request as RuntimeRequest).runtime?.cloudflare;
    const env: WorkerEnvironment = cloudflare?.env ?? (import.meta.env.DEV ? { RESEND_API_KEY: process.env['RESEND_API_KEY'], CONTACT_TO_EMAIL: process.env['CONTACT_TO_EMAIL'], CONTACT_FROM_EMAIL: process.env['CONTACT_FROM_EMAIL'] } : {});
    const recipient = z.string().email().safeParse(env.CONTACT_TO_EMAIL);
    const sender = z.string().max(320).regex(/^[^\r\n<>]+<[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+>$/).safeParse(env.CONTACT_FROM_EMAIL);
    if (!env.RESEND_API_KEY || !recipient.success || !sender.success) return result(503,"unavailable");
    // Fail closed in Workers until the documented native Rate Limiting binding is configured.
    if (cloudflare && !env.CONTACT_RATE_LIMITER) return result(503,"unavailable");
    if (env.CONTACT_RATE_LIMITER) {
      const ip = request.headers.get("cf-connecting-ip"); if (!ip) return result(503,"unavailable");
      if (!(await env.CONTACT_RATE_LIMITER.limit({ key: `inquiry:${ip}` })).success) return result(429,"limited");
    }
    // Preserve identical payload on retries: Resend idempotency rejects changed bodies.
    const email = buildInquiryEmail(data,data.submittedAt);
    const response = await send("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `inquiry-${data.submissionId}` }, body: JSON.stringify({ from: sender.data, to: [recipient.data], reply_to: data.fields.email, ...email }), signal: AbortSignal.timeout(15000) });
    if (!response.ok) return result(502,"delivery_failed");
    const accepted = z.object({ id: z.string().min(1) }).safeParse(await response.json());
    return accepted.success ? result(200,"sent") : result(502,"delivery_failed");
  } catch { return result(503,"unavailable"); } // No visitor, credential or provider payload logging.
}
