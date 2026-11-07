import { env as cloudflareWorkerEnv } from "cloudflare:workers";
import { z } from "zod";
import {
  fieldLabels,
  inquirySchema,
  inquirySubjects,
  MAX_INQUIRY_BYTES,
  type Inquiry,
} from "./inquiry";

type RateLimiter = {
  limit: (input: { key: string }) => Promise<{ success: boolean }>;
};

export type WorkerEnvironment = {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_RATE_LIMITER?: RateLimiter;
};

export type EmailFetch = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

type RuntimeRequest = Request & {
  runtime?: { cloudflare?: { env?: WorkerEnvironment } };
};

export type BindingSource = "request" | "worker-module" | "development" | "none";

export function resolveWorkerEnvironment(
  request: Request,
  moduleBindings: WorkerEnvironment | undefined = cloudflareWorkerEnv as WorkerEnvironment,
): { env: WorkerEnvironment; source: BindingSource; isCloudflare: boolean } {
  const cloudflare = (request as RuntimeRequest).runtime?.cloudflare;
  const developmentBindings: WorkerEnvironment = import.meta.env.DEV
    ? {
        RESEND_API_KEY: process.env["RESEND_API_KEY"],
        CONTACT_TO_EMAIL: process.env["CONTACT_TO_EMAIL"],
        CONTACT_FROM_EMAIL: process.env["CONTACT_FROM_EMAIL"],
      }
    : {};
  const source: BindingSource = cloudflare?.env
    ? "request"
    : moduleBindings
      ? "worker-module"
      : import.meta.env.DEV
        ? "development"
        : "none";

  return {
    // Request bindings win; the official Workers module is the production fallback.
    env: { ...developmentBindings, ...moduleBindings, ...cloudflare?.env },
    source,
    isCloudflare: Boolean(cloudflare || !import.meta.env.DEV),
  };
}

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );
}

export function buildInquiryEmail(data: Inquiry, timestamp: string) {
  const rows = [
    ["Form type", inquirySubjects[data.formType]],
    ["Language", data.locale],
    ...Object.entries(data.fields).map(([key, value]) => [
      fieldLabels[key] ?? key,
      value || "—",
    ]),
    ["Submission timestamp (UTC)", timestamp],
  ];

  return {
    subject: inquirySubjects[data.formType],
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n\n"),
    html: `<html><body><h1>${escapeHtml(inquirySubjects[data.formType])}</h1><table cellpadding="8">${rows
      .map(
        ([label, value]) =>
          `<tr><th align="left" valign="top">${escapeHtml(label)}</th><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
      )
      .join("")}</table></body></html>`,
  };
}

function result(status: number, code: string) {
  return Response.json(
    { ok: status === 200, code },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

function failure(
  status: number,
  code: string,
  diagnostics: Record<string, string | number | boolean> = {},
) {
  // Diagnostics contain only fixed codes, provider status and binding-presence booleans.
  console.error("[inquiry]", { code, ...diagnostics });
  return result(status, code);
}

async function readLimitedBody(request: Request) {
  if (
    Number(request.headers.get("content-length")) > MAX_INQUIRY_BYTES ||
    !request.body
  ) {
    return null;
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_INQUIRY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return new TextDecoder().decode(bytes);
}

export async function handleInquiry(
  request: Request,
  send: EmailFetch = fetch,
  moduleBindings: WorkerEnvironment | undefined = cloudflareWorkerEnv as WorkerEnvironment,
): Promise<Response> {
  try {
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin) {
      return failure(403, "invalid");
    }
    if (!request.headers.get("content-type")?.startsWith("application/json")) {
      return failure(415, "invalid");
    }

    const raw = await readLimitedBody(request);
    if (raw === null) return failure(413, "invalid");

    let input: unknown;
    try {
      input = JSON.parse(raw);
    } catch {
      return failure(400, "invalid");
    }

    const parsed = inquirySchema.safeParse(input);
    if (!parsed.success) return failure(400, "invalid");
    const data = parsed.data;

    const { env, source, isCloudflare } = resolveWorkerEnvironment(
      request,
      moduleBindings,
    );
    const recipient = z.string().email().safeParse(env.CONTACT_TO_EMAIL);
    const sender = z
      .string()
      .max(320)
      .regex(/^[^\r\n<>]+<[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+>$/)
      .safeParse(env.CONTACT_FROM_EMAIL);
    const bindingDiagnostics = {
      bindingSource: source,
      hasApiKey: Boolean(env.RESEND_API_KEY),
      hasValidRecipient: recipient.success,
      hasValidSender: sender.success,
      hasRateLimiter: Boolean(env.CONTACT_RATE_LIMITER),
    };

    if (!env.RESEND_API_KEY || !recipient.success || !sender.success) {
      return failure(503, "configuration_missing", bindingDiagnostics);
    }

    // Production must never send without the native rate limiter.
    if (isCloudflare && !env.CONTACT_RATE_LIMITER) {
      return failure(503, "rate_limiter_missing", bindingDiagnostics);
    }

    if (env.CONTACT_RATE_LIMITER) {
      const ip = request.headers.get("cf-connecting-ip");
      if (!ip) {
        return failure(503, "rate_limit_unavailable", bindingDiagnostics);
      }
      const limited = await env.CONTACT_RATE_LIMITER.limit({
        key: `inquiry:${ip}`,
      });
      if (!limited.success) return failure(429, "limited");
    }

    // Preserve the identical payload on retries for Resend idempotency.
    const email = buildInquiryEmail(data, data.submittedAt);
    let response: Response;
    try {
      response = await send("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `inquiry-${data.submissionId}`,
        },
        body: JSON.stringify({
          from: sender.data,
          to: [recipient.data],
          reply_to: data.fields.email,
          ...email,
        }),
        signal: AbortSignal.timeout(15000),
      });
    } catch (error) {
      return failure(502, "delivery_failed", {
        providerStatus: "network_error",
        errorName: error instanceof Error ? error.name : "UnknownError",
      });
    }

    if (!response.ok) {
      return failure(502, "delivery_failed", {
        providerStatus: response.status,
      });
    }

    let providerPayload: unknown;
    try {
      providerPayload = await response.json();
    } catch {
      return failure(502, "delivery_failed", {
        providerStatus: response.status,
      });
    }
    const accepted = z
      .object({ id: z.string().min(1) })
      .safeParse(providerPayload);
    if (!accepted.success) {
      return failure(502, "delivery_failed", {
        providerStatus: response.status,
      });
    }

    console.info("[inquiry]", { code: "sent" });
    return result(200, "sent");
  } catch (error) {
    return failure(500, "unexpected_error", {
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
  }
}
