/// <reference types="bun" />
import { describe, expect, mock, test } from "bun:test";
import { inquirySchema, inquirySubjects, MAX_INQUIRY_BYTES } from "./inquiry";
import type { EmailFetch, WorkerEnvironment } from "./inquiry.server";

mock.module("cloudflare:workers", () => ({ env: {} }));

const { buildInquiryEmail, handleInquiry, resolveWorkerEnvironment } =
  await import("./inquiry.server");

const base = {
  locale: "en",
  submissionId: "12345678-1234-4234-8234-123456789abc",
  submittedAt: "2026-11-07T02:46:00.000Z",
  website: "",
};
const contact = {
  ...base,
  formType: "contact",
  fields: {
    name: "Test Visitor",
    email: "visitor@example.com",
    phone: "",
    message: "Inquiry test",
  },
};
const program = {
  contact: "Test Visitor",
  school: "Test Centre",
  email: "visitor@example.com",
  phone: "",
  program: "School Hot Lunch Program",
  frequency: "Weekly",
  count: "20",
  message: "",
};
const env: WorkerEnvironment = {
  RESEND_API_KEY: "test-only-not-a-credential",
  CONTACT_TO_EMAIL: "ttopvancouver@gmail.com",
  CONTACT_FROM_EMAIL: "TTOP Chicken <forms@ttopchicken.com>",
  CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
};

function request(input: unknown, environment: WorkerEnvironment = env) {
  const req = new Request("https://ttopchicken.com/api/inquiry", {
    method: "POST",
    headers: {
      origin: "https://ttopchicken.com",
      "content-type": "application/json",
      "cf-connecting-ip": "192.0.2.1",
    },
    body: JSON.stringify(input),
  });
  Object.assign(req, { runtime: { cloudflare: { env: environment } } });
  return req;
}

function requestWithoutRuntime(input: unknown) {
  return new Request("https://ttopchicken.com/api/inquiry", {
    method: "POST",
    headers: {
      origin: "https://ttopchicken.com",
      "content-type": "application/json",
      "cf-connecting-ip": "192.0.2.1",
    },
    body: JSON.stringify(input),
  });
}

const accepted: EmailFetch = async () => Response.json({ id: "test-message" });

describe("Inquiry contracts", () => {
  test("all four forms and all three locales validate", () => {
    const catering = {
      name: "Test Visitor",
      organization: "Test",
      email: "visitor@example.com",
      phone: "+1 604 555 0100",
      eventDate: "2026-12-01",
      guests: "50",
      fulfillment: "Delivery",
      mealType: "Lunch",
      dietary: "None",
      details: "Test",
    };
    for (const locale of ["en", "zh-TW", "zh-CN"])
      for (const form of [
        contact,
        { ...base, formType: "catering", fields: catering },
        { ...base, formType: "school", fields: program },
        {
          ...base,
          formType: "montessori",
          fields: { ...program, program: "Montessori Daily Meals" },
        },
      ])
        expect(inquirySchema.safeParse({ ...form, locale }).success).toBe(true);
  });
  test("required fields are enforced", () => {
    expect(
      inquirySchema.safeParse({
        ...contact,
        fields: { ...contact.fields, name: "" },
      }).success,
    ).toBe(false);
  });
  test("invalid email is rejected", () => {
    expect(
      inquirySchema.safeParse({
        ...contact,
        fields: { ...contact.fields, email: "not-email" },
      }).success,
    ).toBe(false);
  });
  test("field lengths are limited", () => {
    expect(
      inquirySchema.safeParse({
        ...contact,
        fields: { ...contact.fields, message: "x".repeat(5001) },
      }).success,
    ).toBe(false);
  });
  test("unsupported forms are rejected", () => {
    expect(inquirySchema.safeParse({ ...contact, formType: "unknown" }).success).toBe(false);
  });
  test("honeypot blocks bots", () => {
    expect(inquirySchema.safeParse({ ...contact, website: "spam" }).success).toBe(false);
  });
  test("HTML content is escaped while text preserves all fields", () => {
    const data = inquirySchema.parse({
      ...contact,
      fields: { ...contact.fields, message: '<script>"&</script>' },
    });
    const mail = buildInquiryEmail(data, base.submittedAt);
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).toContain("&lt;script&gt;");
    for (const value of Object.values(data.fields).filter(Boolean))
      expect(mail.text).toContain(value);
  });
  test("subjects match the four requested form names", () => {
    expect(inquirySubjects.contact).toBe("TTOP Chicken — New Contact Inquiry");
    expect(inquirySubjects.catering).toBe("TTOP Chicken — New Catering Inquiry");
    expect(inquirySubjects.school).toBe("TTOP Chicken — New School Hot Lunch Inquiry");
    expect(inquirySubjects.montessori).toBe("TTOP Chicken — New Montessori / Daycare Inquiry");
  });
});

describe("Cloudflare binding resolution", () => {
  test("request bindings take precedence over module fallbacks", () => {
    const resolved = resolveWorkerEnvironment(request(contact), {
      ...env,
      RESEND_API_KEY: "fallback-test-value",
    });
    expect(resolved.source).toBe("request");
    expect(resolved.env.RESEND_API_KEY).toBe("test-only-not-a-credential");
  });

  test("Workers module bindings submit successfully when request runtime bindings are lost", async () => {
    const res = await handleInquiry(requestWithoutRuntime(contact), accepted, env);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, code: "sent" });
  });
});

describe("Email handler", () => {
  test("recipient, sender and validated reply-to use required configuration", async () => {
    let calls = 0;
    const send: EmailFetch = async (url, init) => {
      calls++;
      expect(url).toBe("https://api.resend.com/emails");
      const payload = JSON.parse(String(init?.body));
      expect(payload.to).toEqual(["ttopvancouver@gmail.com"]);
      expect(payload.from).toBe("TTOP Chicken <forms@ttopchicken.com>");
      expect(payload.reply_to).toBe("visitor@example.com");
      expect(payload.html).toBeTruthy();
      expect(payload.text).toBeTruthy();
      return Response.json({ id: "test-message" });
    };
    const res = await handleInquiry(request(contact), send);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, code: "sent" });
    expect(calls).toBe(1);
  });
  test("provider rejection returns a distinct safe error", async () => {
    const res = await handleInquiry(
      request(contact),
      async () => new Response("", { status: 403 }),
    );
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ ok: false, code: "delivery_failed" });
  });
  test("provider network failure returns a distinct safe error", async () => {
    const res = await handleInquiry(request(contact), async () => {
      throw new TypeError("test-only network failure");
    });
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ ok: false, code: "delivery_failed" });
  });
  test("missing provider acceptance id never returns success", async () => {
    const res = await handleInquiry(request(contact), async () => Response.json({}));
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ ok: false, code: "delivery_failed" });
  });
  test("missing credentials fail closed with a distinct safe error", async () => {
    const res = await handleInquiry(request(contact, {}), accepted);
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, code: "configuration_missing" });
  });
  test("missing production rate limiter fails closed with a distinct safe error", async () => {
    const res = await handleInquiry(
      request(contact, { ...env, CONTACT_RATE_LIMITER: undefined }),
      accepted,
    );
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, code: "rate_limiter_missing" });
  });
  test("missing client IP fails closed without sending", async () => {
    let calls = 0;
    const req = request(contact);
    req.headers.delete("cf-connecting-ip");
    const res = await handleInquiry(req, async () => {
      calls++;
      return Response.json({ id: "test" });
    });
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, code: "rate_limit_unavailable" });
    expect(calls).toBe(0);
  });
  test("native rate limiting prevents sends", async () => {
    let calls = 0;
    const res = await handleInquiry(
      request(contact, {
        ...env,
        CONTACT_RATE_LIMITER: { limit: async () => ({ success: false }) },
      }),
      async () => {
        calls++;
        return Response.json({ id: "test" });
      },
    );
    expect(res.status).toBe(429);
    expect(await res.json()).toEqual({ ok: false, code: "limited" });
    expect(calls).toBe(0);
  });
  test("unexpected runtime errors have a distinct safe error", async () => {
    const res = await handleInquiry(
      request(contact, {
        ...env,
        CONTACT_RATE_LIMITER: {
          limit: async () => {
            throw new TypeError("test-only runtime failure");
          },
        },
      }),
      accepted,
    );
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ ok: false, code: "unexpected_error" });
  });
  test("invalid input never reaches Resend", async () => {
    let calls = 0;
    const res = await handleInquiry(request({ ...contact, formType: "unknown" }), async () => {
      calls++;
      return Response.json({ id: "test" });
    });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, code: "invalid" });
    expect(calls).toBe(0);
  });
  test("cross-origin submissions are rejected", async () => {
    const req = request(contact);
    req.headers.set("origin", "https://example.com");
    expect((await handleInquiry(req, accepted)).status).toBe(403);
  });
  test("oversize payloads are rejected", async () => {
    expect(
      (
        await handleInquiry(
          request({ ...contact, padding: "x".repeat(MAX_INQUIRY_BYTES) }),
          accepted,
        )
      ).status,
    ).toBe(413);
  });
  test("retries preserve idempotency key and exact body", async () => {
    const calls: { body: unknown; key: string | null }[] = [];
    const send: EmailFetch = async (_, init) => {
      calls.push({
        body: init?.body,
        key: new Headers(init?.headers).get("Idempotency-Key"),
      });
      return Response.json({ id: "test" });
    };
    await handleInquiry(request(contact), send);
    await handleInquiry(request(contact), send);
    expect(calls[0]).toEqual(calls[1]);
    expect(calls[0]?.key).toBe(`inquiry-${base.submissionId}`);
  });
});
