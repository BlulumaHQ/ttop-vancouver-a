export type Locale = "en" | "zh-TW" | "zh-CN";

export const CONTENT_PATHS = ["/", "/menu", "/chuchu-bar", "/frozen-foods", "/school-lunch", "/montessori", "/catering", "/about", "/contact"] as const;

export function localeFromPath(path: string): Locale {
  if (/^\/zh-tw(?:\/|$)/.test(path)) return "zh-TW";
  if (/^\/zh-cn(?:\/|$)/.test(path)) return "zh-CN";
  return "en";
}

export function unlocalizedPath(path: string): string {
  return path.replace(/^\/zh-(?:tw|cn)(?=\/|$)/, "") || "/";
}

export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const base = unlocalizedPath(path);
  if (locale === "en") return base;
  return `/${locale.toLowerCase()}${base === "/" ? "/" : base}`;
}