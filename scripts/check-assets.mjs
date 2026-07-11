#!/usr/bin/env node
// Asset audit for TTOP Chicken. Fails if any website-owned asset reference
// is broken, uses a preview-only URL, or has a capitalization mismatch.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");

const SCAN_DIRS = ["src", "public"];
const SCAN_EXTS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".css", ".scss", ".html", ".json", ".md",
]);
const IGNORE_DIRS = new Set(["node_modules", "dist", ".output", ".vinxi", ".tanstack", ".nitro", ".wrangler"]);

const errors = [];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (IGNORE_DIRS.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

// Build a case-sensitive map of files in public/.
const publicFiles = new Map(); // key: "/images/foo.png" lowercased -> actual path "/images/Foo.PNG"
function indexPublic(dir, prefix = "") {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = prefix + "/" + name;
    const st = statSync(full);
    if (st.isDirectory()) indexPublic(full, rel);
    else publicFiles.set(rel.toLowerCase(), rel);
  }
}
indexPublic(publicDir);

const files = [];
for (const d of SCAN_DIRS) {
  const p = join(root, d);
  if (existsSync(p)) walk(p, files);
}

const BAD_PATTERNS = [
  { re: /\/__l5e\//g, msg: "Lovable preview URL (/__l5e/) — copy asset to public/" },
  { re: /\bblob:[a-z]+/gi, msg: "blob: URL reference" },
  { re: /\bfile:\/\//gi, msg: "file:// URL reference" },
  { re: /https?:\/\/localhost[:\/]/gi, msg: "localhost asset reference" },
  { re: /[A-Z]:\\\\[A-Za-z]/g, msg: "Windows local path reference" },
  { re: /\/Users\/[A-Za-z0-9]+\//g, msg: "macOS local path reference" },
];

// Match local /images, /downloads, /fonts references and other public-rooted asset paths.
const LOCAL_ASSET_RE = /["'`(]\s*(\/(?:images|downloads|fonts|assets)\/[A-Za-z0-9_./\-]+\.(?:png|jpe?g|webp|gif|svg|ico|avif|pdf|mp4|webm|mp3|woff2?|ttf|otf))/g;
// Match .asset.json imports
const ASSET_JSON_RE = /["'`][^"'`]*\.asset\.json["'`]/g;

// Website-owned images hotlinked from foreign origins (heuristic: image extension over http from non-approved host)
const APPROVED_EXTERNAL = /^(https?:\/\/)?(fonts\.googleapis\.com|fonts\.gstatic\.com|www\.google\.com|maps\.google\.com|maps\.app\.goo\.gl|www\.instagram\.com|www\.facebook\.com|share\.google|order\.chatchefs\.com|.*\.doordash\.com|.*\.ubereats\.com|.*\.fantuan\.ca|.*\.bluluma\.com|.*\.swiftlift\.[a-z]+)/i;
const REMOTE_IMG_RE = /["'`](https?:\/\/[^"'`\s]+\.(?:png|jpe?g|webp|gif|avif))["'`]/gi;

for (const file of files) {
  const ext = file.slice(file.lastIndexOf("."));
  if (!SCAN_EXTS.has(ext)) continue;
  // Skip the audit script itself and lockfiles / generated
  const rel = relative(root, file).split(sep).join("/");
  if (rel === "scripts/check-assets.mjs") continue;
  if (rel === "src/routeTree.gen.ts") continue;

  const text = readFileSync(file, "utf8");

  for (const { re, msg } of BAD_PATTERNS) {
    re.lastIndex = 0;
    if (re.test(text)) errors.push(`${rel}: ${msg}`);
  }

  // .asset.json imports (website assets)
  ASSET_JSON_RE.lastIndex = 0;
  let m;
  while ((m = ASSET_JSON_RE.exec(text)) !== null) {
    errors.push(`${rel}: leftover .asset.json import ${m[0]} — inline asset into public/`);
  }

  // Local asset existence + capitalization
  LOCAL_ASSET_RE.lastIndex = 0;
  while ((m = LOCAL_ASSET_RE.exec(text)) !== null) {
    const ref = m[1]; // "/images/foo.png"
    const key = ref.toLowerCase();
    const actual = publicFiles.get(key);
    if (!actual) {
      errors.push(`${rel}: references ${ref} but public${ref} does not exist`);
    } else if (actual !== ref) {
      errors.push(`${rel}: capitalization mismatch — code uses ${ref} but file is public${actual}`);
    }
  }

  // Remote image hotlinks that aren't approved external destinations
  REMOTE_IMG_RE.lastIndex = 0;
  while ((m = REMOTE_IMG_RE.exec(text)) !== null) {
    const url = m[1];
    const host = url.replace(/^https?:\/\//, "").split("/")[0];
    if (!APPROVED_EXTERNAL.test(host)) {
      errors.push(`${rel}: website image hotlinked from ${host} — store in public/ instead (${url})`);
    }
  }
}

if (errors.length) {
  console.error("\n✗ Asset audit failed:\n");
  for (const e of errors) console.error("  " + e);
  console.error(`\n${errors.length} problem(s) found.\n`);
  process.exit(1);
}
console.log("✓ Asset audit passed — no broken or preview-only asset references.");