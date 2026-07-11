import { useState } from "react";
import { PHONE, PHONE_TEL } from "@/lib/site";

export function TopBar() {
  const [lang, setLang] = useState<"EN" | "ZH">("EN");
  return (
    <div className="bg-[#1d418f] text-white">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-3 px-5 text-[11px] font-semibold tracking-wide lg:px-8 lg:text-xs">
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex items-center gap-2 whitespace-nowrap hover:text-[#ffd6d6]"
          aria-label="Call TTOP Chicken"
        >
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="tabular">{PHONE}</span>
        </a>

        <span className="hidden text-white/70 sm:inline">
          Mon–Fri · 11:00 AM – 8:00 PM · Richmond, BC
        </span>

        <div
          role="group"
          aria-label="Language switcher"
          className="flex items-center overflow-hidden rounded-sm border border-white/30"
        >
          <button
            type="button"
            onClick={() => setLang("EN")}
            aria-pressed={lang === "EN"}
            className={`px-2 py-1 transition-colors ${
              lang === "EN"
                ? "bg-white text-[#1d418f]"
                : "text-white hover:bg-white/10"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("EN")}
            aria-pressed={lang === "ZH"}
            title="Chinese site coming soon"
            className={`px-2 py-1 font-tc-sans transition-colors ${
              lang === "ZH"
                ? "bg-white text-[#1d418f]"
                : "text-white/70 hover:bg-white/10"
            }`}
          >
            中文
          </button>
        </div>
      </div>
    </div>
  );
}