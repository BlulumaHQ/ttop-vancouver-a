# TTOP inquiry forms — Cloudflare deployment

## Connected forms
General Contact, Catering, School Hot Lunch, and Montessori / Daycare share `POST /api/inquiry` on English, `/zh-tw/*`, and `/zh-cn/*`. Every existing field is included in HTML and plain-text notifications. Form labels, options, layout and page metadata are retained.

Email-only delivery uses your existing Resend account. There is no stored submission copy; a stored copy could protect leads if delivery fails and can be added on request. Failed sends retain the visitor's input. A success means Resend API acceptance, not guaranteed inbox delivery.

## Existing settings — retain them
In the **same deployed Cloudflare Worker**, retain `RESEND_API_KEY` as an encrypted secret, `CONTACT_TO_EMAIL=ttopvancouver@gmail.com` and `CONTACT_FROM_EMAIL=TTOP Chicken <forms@ttopchicken.com>`. No new Resend credentials or DNS changes are needed.

Nitro 3's installed `cloudflare_module` preset augments requests with `request.runtime.cloudflare.env`; the handler reads the bindings there at request time. It does not depend on production `process.env`. Only local Vite development has a `process.env` fallback. Resend is called directly using Web Fetch, with no added SDK or deployment framework.

## Required new Cloudflare resource
Add a **native Cloudflare Rate Limiting binding** named `CONTACT_RATE_LIMITER` to this Worker, with **5 requests per IP per 60 seconds**. Choose a namespace ID unique within your account. If your deployment manages bindings in Wrangler config, merge this fragment into that configuration (do not replace domain, routes, vars or other bindings):

```json
{
  "ratelimits": [
    {
      "name": "CONTACT_RATE_LIMITER",
      "namespace_id": "1001",
      "simple": { "limit": 5, "period": 60 }
    }
  ]
}
```

`1001` is an example namespace, not a verified unused ID. The binding uses Cloudflare's native API, not an in-memory counter or KV approximation. The endpoint fails closed with a visitor-friendly error if this binding is absent in Workers. Cloudflare applies limits per location; it is not a strict globally serialized quota. See https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/ for availability and current account requirements. No KV or extra paid third-party service is introduced.

Same-origin checks, strict server/client schemas, bounded streamed JSON (20,000 bytes), HTML escaping, a honeypot and disabled loading controls protect submissions. Resend idempotency keys prevent re-sending identical retry requests for Resend's 24-hour retention window. This is not indefinite deduplication across new visits; no persistent submission store is configured. Retry payload and timestamp stay identical. Timestamps describe visitor submission time in UTC, not a trusted server audit record. No personal data or provider payloads are logged by this handler.

## Build and verification
Use the existing external CI/deployment command `bun run check:assets && bun run build`; this editor runs production builds automatically and must not run a duplicate manual build. Do not deploy until the generated build is successful and the new binding is set on the actual Worker. GitHub sync and external Cloudflare deployment cannot be confirmed from this editor.

The unit tests use mock provider responses, never pretend to be actual email delivery. The sandbox lacks the existing Cloudflare Resend credentials; live delivery remains unverified here.

After deployment:
1. Open Contact, Catering, School Lunch and Montessori on all three language URLs at https://ttopchicken.com.
2. Submit a clearly named test inquiry with a real reply email. Verify every field in the notification received at ttopvancouver@gmail.com, including subject, From, Reply-To and timestamp. Reply to check the visitor address.
3. Verify Resend's dashboard records the message as accepted/delivered; check spam if it does not appear in the inbox. A delivered event alone does not guarantee inbox placement.
4. Check invalid email, omitted required fields, and oversize content fail validation. After 5 attempts from the same IP/location in one minute, a further attempt should show the localized wait message.
5. Verify errors preserve entered information and do not show a success state. Inspect the browser network request to ensure only form content (never API credentials) is sent to `/api/inquiry`.

## Changed files
Created: `src/lib/inquiry.ts`, `src/lib/inquiry.server.ts`, `src/lib/inquiry.test.ts`, `src/routes/api/inquiry.ts`, this guide.
Modified: `src/components/site/InquiryForm.tsx`, `src/components/site/ProgramInquirySection.tsx`, `src/components/pages/contact.tsx`, `src/components/pages/catering.tsx`, `AGENTS.md`, `roadmap.md`. TanStack regenerates its route tree automatically.