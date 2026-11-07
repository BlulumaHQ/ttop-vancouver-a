# TTOP inquiry forms — Cloudflare deployment

## Connected forms
General Contact, Catering, School Hot Lunch, and Montessori / Daycare share `POST /api/inquiry` on English, `/zh-tw/*`, and `/zh-cn/*`. Every existing field is included in HTML and plain-text notifications. Form labels, options, layout and page metadata are retained.

Email-only delivery uses your existing Resend account. There is no stored submission copy; a stored copy could protect leads if delivery fails and can be added on request. Failed sends retain the visitor's input. A success means Resend API acceptance, not guaranteed inbox delivery.

## Existing settings — retain them
In the **same deployed Cloudflare Worker**, retain `RESEND_API_KEY` as an encrypted secret, `CONTACT_TO_EMAIL=ttopvancouver@gmail.com` and `CONTACT_FROM_EMAIL=TTOP Chicken <forms@ttopchicken.com>`. No new Resend credentials or DNS changes are needed.

Nitro 3's installed `cloudflare_module` preset augments requests with `request.runtime.cloudflare.env`; the handler reads those bindings per request and falls back to the official `import { env } from "cloudflare:workers"` API if a deployment adapter supplies an ordinary request without that augmentation. Nitro externalizes the official module for Workers builds. A serve-only Vite shim supports the local preview; it is excluded from production builds. Production never depends on `process.env`, and only the four required values are read on the server. Resend is called directly using Web Fetch, with no added SDK or deployment framework.

Safe response codes distinguish `configuration_missing`, `rate_limiter_missing`, `rate_limit_unavailable`, `invalid`, `limited`, `delivery_failed`, and `unexpected_error`. Server logs contain only fixed codes, binding-presence booleans, error class names and Resend HTTP status—never API keys, email contents, visitor information, IP addresses or provider response bodies.

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
Modified: `src/components/site/InquiryForm.tsx`, `src/components/site/ProgramInquirySection.tsx`, `src/components/pages/contact.tsx`, `src/components/pages/catering.tsx`, `package.json`, `bun.lock` (Bun test types), `AGENTS.md`, `roadmap.md`. TanStack regenerates its route tree automatically.

Verification completed in the editor: 21 tests passed (18 inquiry tests and 3 locale tests); all 12 form/locale combinations reached the actual endpoint, displayed localized failures when credentials were unavailable, preserved input and never falsely reported success. Desktop and mobile form screenshots were checked; no browser runtime exceptions were observed. Image validation passed. The latest automatic build at 2026-11-07T02:52:05Z reported `build OK`. Production artifact files are not exposed in this sandbox, so the bundled handler and browser bundle were not independently inspected; the real endpoint was exercised in Vite, and automatic compilation passed. Live Cloudflare deployment and email delivery remain unverified.

## Runtime binding repair — 2026-11-07

The live Worker returned `503 {"ok":false,"code":"unavailable"}` before this repair. A focused new test confirmed the code-level failure mechanism: when a deployment adapter supplies an ordinary request without `request.runtime.cloudflare.env`, the old handler resolved no production bindings and returned 503 before contacting Resend. The installed Nitro version supports both request-attached bindings and the official `cloudflare:workers` environment import; the handler now supports both. This confirms and fixes the lost-bindings defect, but the external Worker's exact failure stage cannot be confirmed until this version is deployed and its new safe response code is observed.

Files modified: `src/lib/inquiry.server.ts`, `src/lib/inquiry.test.ts`, `vite.config.ts`, `CONTACT_FORMS_DEPLOYMENT.md`, `AGENTS.md`, and `roadmap.md`. Files added: `src/cloudflare-workers.d.ts` and `src/lib/cloudflare-workers-dev.server.ts`. No form design, fields, translations, URLs, DNS or credentials were changed.

Verification after the repair: 26 tests passed (23 inquiry and 3 locale), including native-binding fallback success, missing bindings, missing/malformed configuration, rate limiting, Resend rejection/network failure, unexpected errors and idempotency. TypeScript and targeted ESLint checks passed. The asset audit passed. English, Traditional Chinese and Simplified Chinese contact forms were submitted end to end in the preview; each reached `/api/inquiry`, returned the expected local `configuration_missing` response, preserved input, showed its localized error, showed no false success, and produced no browser runtime exception. The latest automatic production build at 2026-11-07T18:09:50Z reported `build OK`.

Remaining production verification: deploy this exact version to the Worker serving `ttopchicken.com`, retain all four bindings, submit a clearly marked real test, and confirm Resend acceptance plus receipt at `ttopvancouver@gmail.com`. If it still fails, the response now distinguishes missing email configuration, missing rate limiter, rate limiting, provider failure and unexpected errors without exposing secrets or visitor data. Live email delivery is not claimed yet.
## Production 503 `configuration_missing` diagnosis (2026-11-07)

Reproduced locally with the built Worker in Wrangler's simulator: when the encrypted `RESEND_API_KEY` secret exists but the plain-text `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` variables are absent from the *running* version, the endpoint returns exactly the production response. With those variables present (including `TTOP Chicken <forms@ttopchicken.com>`), the same build passes configuration and the rate limiter and reaches Resend. Bindings resolve through `request.runtime.cloudflare.env` and the `cloudflare:workers` fallback; the sender format is accepted.

Likely cause: `wrangler deploy` replaces dashboard plain-text variables unless `keep_vars` is set, and the generated config previously targeted an auto-generated Worker name (`tanstack-start-ts`). The root `wrangler.jsonc` now sets `name: "ttop-vancouver-a"` and `keep_vars: true`.

The 503 body now includes `checks` with only `ok` / `missing` / `invalid` per setting (never values). Values are trimmed and one pair of wrapping quotes is removed.

What to inspect in Cloudflare: Worker `ttop-vancouver-a` → Deployments: confirm the *active* version contains the two variables (not only Build → Variables); Settings → Domains & Routes: confirm `www.ttopchicken.com` is attached to this Worker; confirm no other Worker (e.g. `tanstack-start-ts`) owns the route. Rate-limit bindings come only from Wrangler config: if the next response is `rate_limiter_missing`, add the `ratelimits` fragment above to `wrangler.jsonc` with your real namespace ID.
