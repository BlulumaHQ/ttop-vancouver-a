# Activate inquiry forms
- [x] Audit all inquiry fields and connect email-only Resend sending across three locales.
- [x] Add validation, duplicate protection, spam safeguards and localized submission states.
- [x] Test valid/invalid submissions and document Cloudflare bindings and live delivery checks.
- [x] Reproduce the lost-request-bindings failure and add the official Workers environment fallback for deployment adapters.
- [x] Preserve inquiry security and delivery behavior while adding safe diagnostic codes and server-side logs.
- [x] Add binding, failure, rate-limit, provider-error and successful-delivery tests; run checks and inspect the automatic production build.
- [ ] Live delivery verification — blocked until the corrected build is deployed with the configured Cloudflare bindings.

# Chinese website
- [x] Add independent Traditional Chinese and Simplified Chinese page URLs while retaining English.
- [x] Translate all pages, navigation, menus and inquiry controls using Taiwan/mainland terminology respectively.
- [x] Connect language links and add language-specific page metadata.
- [x] Verify translated pages, navigation, images and inquiry controls.

# Cloudflare deployment compatibility
- [ ] Externalize the official Workers module for the SSR build; verify the complete build and generated server output.
- [x] Replace production delivery-logo CDN references with existing public images and archive unused pointers without deleting remote assets.
- [x] Audit deployment settings and multilingual routes without changing design or content.
- [x] Run asset and locale checks, verify rendered logos, and inspect the automatically generated production build result.

# DoorDash logo replacement
- [x] Show complete printed-menu thumbnails and food photos without cropping; remove DoorDash's source-image white rim and verify both.
- [x] Replace DoorDash with the latest original PNG using a self-hosted public image path.
- [x] Verify equal logo dimensions on desktop/mobile and run asset and locale checks.
- [x] Explain GitHub sync and external deployment verification limits; these external statuses are not accessible from this chat.