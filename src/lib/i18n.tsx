import { createContext, useContext, type ReactNode } from "react";
import { Link as RouterLink, useRouterState } from "@tanstack/react-router";
import tw from "./translations/zh-tw.json";
import cn from "./translations/zh-cn.json";
import { CONTENT_PATHS, localizedPath, localeFromPath, unlocalizedPath, type Locale } from "./locale";
import { SITE_URL } from "./site";

const LocaleContext = createContext<Locale>("en");
const dictionaries: Record<string, Record<string, string>> = { "zh-TW": tw, "zh-CN": cn };

export function translateText(text: string, locale: Locale): string {
  if (locale === "en") return text;
  const trimmed = text.replace(/\s+/g, " ").trim();
  const dictionary = dictionaries[locale];
  const translated = dictionary?.[trimmed];
  if (translated) return (text.match(/^\s*/)?.[0] ?? "") + translated + (text.match(/\s*$/)?.[0] ?? "");
  return text;
}

export function SiteLanguageProvider({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return <LocaleContext.Provider value={localeFromPath(pathname)}>{children}</LocaleContext.Provider>;
}

export function LocalizedText({ value }: { value: ReactNode }) {
  const locale = useContext(LocaleContext);
  return <>{typeof value === "string" ? translateText(value, locale) : value}</>;
}

export function useSiteLanguage() {
  const locale = useContext(LocaleContext);
  const t = <T,>(value: T): T => {
    if (typeof value === "string") return translateText(value, locale) as T;
    return value;
  };
  const href = (value: string) => {
    const path = value.split(/[?#]/)[0];
    return CONTENT_PATHS.some((p) => p === unlocalizedPath(path)) ? localizedPath(value, locale) : value;
  };
  return { locale, t, href };
}

export function Link(props: React.ComponentProps<typeof RouterLink>) {
  const { href } = useSiteLanguage();
  return <RouterLink {...props} to={typeof props.to === "string" ? href(props.to) : props.to} />;
}

export function localizedHead(locale: Locale, path: string, title: string, description: string) {
  const url = `https://instant-client-ready.lovable.app${localizedPath(path, locale)}`;
  const translatedTitle = translateText(title, locale);
  const translatedDescription = translateText(description, locale);
  return {
    meta: [
      { title: translatedTitle },
      { name: "description", content: translatedDescription },
      { property: "og:title", content: translatedTitle },
      { property: "og:description", content: translatedDescription },
      { property: "og:url", content: url },
      { property: "og:locale", content: locale === "zh-TW" ? "zh_TW" : locale === "zh-CN" ? "zh_CN" : "en_CA" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: url },
      ...(["en", "zh-TW", "zh-CN"] as const).map((language) => ({ rel: "alternate", hrefLang: language, href: `https://instant-client-ready.lovable.app${localizedPath(path, language)}` })),
      { rel: "alternate", hrefLang: "x-default", href: `https://instant-client-ready.lovable.app${path}` },
    ],
  };
}
