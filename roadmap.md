# Activate inquiry forms
- [ ] Audit all inquiry fields and connect email-only Resend sending across three locales.
- [ ] Add validation, duplicate protection, spam safeguards and localized submission states.
- [ ] Test valid/invalid submissions and document Cloudflare bindings and live delivery checks.

# Chinese website
- [x] Add independent Traditional Chinese and Simplified Chinese page URLs while retaining English.
- [x] Translate all pages, navigation, menus and inquiry controls using Taiwan/mainland terminology respectively.
- [x] Connect language links and add language-specific page metadata.
- [x] Verify translated pages, navigation, images and inquiry controls.

# Cloudflare deployment compatibility
- [x] Replace production delivery-logo CDN references with existing public images and archive unused pointers without deleting remote assets.
- [x] Audit deployment settings and multilingual routes without changing design or content.
- [x] Run asset and locale checks, verify rendered logos, and inspect the automatically generated production build result.

# DoorDash logo replacement
- [x] Show complete printed-menu thumbnails and food photos without cropping; remove DoorDash's source-image white rim and verify both.
- [x] Replace DoorDash with the latest original PNG using a self-hosted public image path.
- [x] Verify equal logo dimensions on desktop/mobile and run asset and locale checks.
- [x] Explain GitHub sync and external deployment verification limits; these external statuses are not accessible from this chat.