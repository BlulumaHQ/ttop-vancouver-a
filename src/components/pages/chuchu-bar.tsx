import { useSiteLanguage, LocalizedText } from "@/lib/i18n";

import { OrderButton } from "@/components/site/OrderButton";
import { RuleRedBlue } from "@/components/site/CodeChip";
import { Section } from "@/components/site/Section";
import { PhotoGrid } from "@/components/site/MenuGrid";
import { DRINKS_F, VINEGAR_G } from "@/lib/menu-data";



export function ChuChuBarPage() {
  const { t, href } = useSiteLanguage();
  return (
    <>
      {/* Hero band — same treatment as the Menu page */}
      <section className="relative overflow-hidden bg-[#1d418f] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12 lg:px-8 lg:py-16">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-white/70">
              <RuleRedBlue className="w-12" /><LocalizedText value={" Drinks · ChuChu Bar "} /></div>
            <h1 className="font-display text-4xl leading-[1.02] md:text-5xl lg:text-6xl">
              <em className="italic text-[#ffb6b6]"><LocalizedText value={"ChuChu"} /></em><LocalizedText value={" Bar. "} /></h1>
            <p className="mt-4 max-w-xl text-white/85"><LocalizedText value={" Fresh-brewed teas, Taiwanese classics, and our signature natural vinegar cube drinks. "} /></p>
            <div className="mt-6 flex flex-wrap gap-3">
              <OrderButton size="lg" />
              <a
                href={href("#G")}
                className="inline-flex items-center rounded-sm border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-[#1d418f]"
              ><LocalizedText value={" Jump to drinks ↓ "} /></a>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/menu/f-drinks.webp"
              alt={t("TTOP ChuChu Bar signature milk tea")}
              className="block aspect-[4/3] w-full object-cover"
              loading="eager"
              width={1200}
              height={900}
            />
          </div>
        </div>
      </section>

      <Section tone="white">
        <div className="space-y-14">
          <PhotoGrid cat={VINEGAR_G} />
          <PhotoGrid cat={DRINKS_F} />

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#1d418f]/20 pt-8">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#17233f]/60"><LocalizedText value={" M Medium · L Large · Hot available on select teas "} /></span>
            <OrderButton size="lg" />
          </div>
        </div>
      </Section>
    </>
  );
}