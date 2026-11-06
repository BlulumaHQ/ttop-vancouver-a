import { useSiteLanguage, LocalizedText } from "@/lib/i18n";

import { CodeChip, RuleRedBlue } from "@/components/site/CodeChip";
import { Section, SectionHead } from "@/components/site/Section";
import { ProgramInquirySection } from "@/components/site/ProgramInquirySection";
import { PHONE, PHONE_TEL } from "@/lib/site";



const PILLARS = [
  ["Nutrition at the core", "Every monthly menu is carefully balanced across protein, seasonal vegetables and carbohydrates."],
  ["Independence first", "Child-appropriate portions and bite-sized design encourage self-feeding and build confidence."],
  ["Quiet delivery standard", "Our silent-school model ensures delivery and setup never disturb the focus of the morning work period."],
  ["Sensory exploration", "Regularly rotating menus rich in texture and aroma invite young palates to explore."],
];

const SUPPORTS = [
  "Sensory exploration through varied textures, flavours and aromas",
  "Varied exposure in a safe, ordered environment",
  "Age-tailored portions and sizes that encourage independent eating",
  "Building early, positive relationships with food",
  "Promoting grace and courtesy at mealtime in a calm, orderly environment",
];

const PHASES = [
  { n: "1", t: "Precise Planning", accent: "Before day one", d: "Custom consultation, safety protocols, budget matching and menus built for young children." },
  { n: "2", t: "Operational Excellence", accent: "Every school day", d: "Temperature-controlled freshness, class-sorted delivery system, 3-minute cleanup, silent-school delivery." },
  { n: "3", t: "Easy Recovery", accent: "After lunch", d: "Sustainable packaging, zero food waste, respectful of the prepared environment." },
];

const MEAL_PLANS = [
  { month: "June 2026", href: "/downloads/montessori-meal-plan-2026-06.pdf" },
  { month: "July 2026", href: "/downloads/montessori-meal-plan-2026-07.pdf" },
  { month: "August 2026", href: "/downloads/montessori-meal-plan-2026-08.pdf" },
];

const REFERENCE_PHOTOS = [
  ["classic-steamed-chicken-mushroom-rice-bowl", "Classic Steamed Chicken & Mushroom Rice Bowl"],
  ["popcorn-chicken-egg-sub", "Popcorn Chicken & Egg Sub"],
  ["lions-head-meatball-casserole-rice-bowl", "Lion's Head Meatball Casserole Rice Bowl"],
  ["soy-glazed-chicken-cutlet-rice-bowl", "Soy Glazed Chicken Cutlet Rice Bowl"],
].map(([f, name]) => ({ src: `/images/hot-lunch/${f}.webp`, name }));


export function MontessoriPage() {
  const { t, href } = useSiteLanguage();
  return (
    <>
      <section className="bg-[#faf6ef]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <RuleRedBlue className="w-14" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ca3134]"><LocalizedText value={"Montessori & Daycare"} /></span>
            </div>
            <h1 className="font-display text-[40px] font-black leading-[1.03] text-[#1d418f] md:text-[56px] lg:text-[68px]"><LocalizedText value={" Daily meal service that makes the lunch table an "} /><em className="italic text-[#ca3134]"><LocalizedText value={"extension"} /></em><LocalizedText value={" of the classroom. "} /></h1>
            <p className="mt-3 font-display italic text-base tracking-wider text-[#1d418f]/70"><LocalizedText value={" Montessori daily meal service "} /></p>
            <p className="mt-6 max-w-xl text-lg text-[#17233f]/85"><LocalizedText value={" The classroom is a prepared environment. Why should the lunch table be any different? "} /></p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={href("#inquiry")} className="inline-flex items-center rounded-sm bg-[#ca3134] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#a5262a]"><LocalizedText value={"Book a Consultation"} /></a>
              <a href={href(`tel:${PHONE_TEL}`)} className="inline-flex items-center rounded-sm border border-[#1d418f] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#1d418f] hover:bg-[#1d418f] hover:text-white"><LocalizedText value={"Call "} /><LocalizedText value={PHONE} /></a>
            </div>
          </div>
          <div className="border border-[#1d418f]/20 bg-white p-8">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ca3134]"><LocalizedText value={"Our goal"} /></span>
            <p className="mt-4 font-display text-3xl leading-tight text-[#1d418f]"><LocalizedText value={" Lighten the load on your staff, and make lunchtime something students "} /><em className="italic text-[#ca3134]"><LocalizedText value={"enjoy"} /></em><LocalizedText value={". "} /></p>
          </div>
        </div>
      </section>

      <Section tone="white">
        <SectionHead eyebrow="Four pillars" title={t("How we support the environment")} />
        <div className="grid gap-6 md:grid-cols-2">
          <LocalizedText value={PILLARS.map(([t, d], i) => (
            <div key={t} className="flex gap-5 border-l-2 border-[#ca3134] bg-[#faf6ef] p-6">
              <CodeChip tone="blue" size="lg"><LocalizedText value={String(i + 1).padStart(2, "0")} /></CodeChip>
              <div>
                <h3 className="font-display text-xl text-[#1d418f]"><LocalizedText value={t} /></h3>
                <p className="mt-2 text-sm text-[#17233f]/80"><LocalizedText value={d} /></p>
              </div>
            </div>
          ))} />
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead eyebrow="Our menu supports" title={t("A prepared table")} />
            <ul className="space-y-3 text-sm text-[#17233f]/85">
              <LocalizedText value={SUPPORTS.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#ca3134]" />
                  <span><LocalizedText value={s} /></span>
                </li>
              ))} />
            </ul>
          </div>
          <figure className="relative flex flex-col justify-center border border-[#1d418f]/20 bg-white p-8">
            <span aria-hidden="true" className="absolute left-4 top-1 font-display text-7xl leading-none text-[#1d418f]"><LocalizedText value={"“"} /></span>
            <blockquote className="pl-6 pt-6 font-display text-2xl leading-snug text-[#1d418f]"><LocalizedText value={" The kids finished every last bite — truly not a single mouthful left. Now they ask every day: "} /><em className="italic text-[#ca3134]"><LocalizedText value={"“When is the lunch delivery uncle coming back?”"} /></em>
            </blockquote>
            <figcaption className="mt-6 pl-6 text-xs font-bold uppercase tracking-widest text-[#ca3134]"><LocalizedText value={"— Cambie Montessori"} /></figcaption>
          </figure>
        </div>
      </Section>

      <Section tone="white">
        <SectionHead eyebrow="How partnership works" title={t("Three phases, one team")} />
        <div className="grid gap-6 md:grid-cols-3">
          <LocalizedText value={PHASES.map((p) => (
            <div key={p.n} className="border border-[#1d418f]/20 bg-white p-6">
              <CodeChip tone="blue" size="lg"><LocalizedText value={p.n} /></CodeChip>
              <h3 className="mt-4 font-display text-2xl text-[#1d418f]"><LocalizedText value={p.t} /></h3>
              <p className="mt-1 font-display italic text-xs uppercase tracking-widest text-[#ca3134]"><LocalizedText value={p.accent} /></p>
              <p className="mt-4 text-sm text-[#17233f]/80"><LocalizedText value={p.d} /></p>
            </div>
          ))} />
        </div>
      </Section>

      {/* Sample meal plans */}
      <Section tone="cream">
        <SectionHead eyebrow="Real menus" title={t("Sample Monthly Meal Plans")} />
        <p className="-mt-6 mb-8 max-w-2xl text-sm text-[#17233f]/75"><LocalizedText value={" See examples of how our Montessori and daycare meal programs are planned throughout the month. Menus may vary based on scheduling, availability and individual program requirements. "} /></p>
        <div className="grid gap-4 md:grid-cols-3">
          <LocalizedText value={MEAL_PLANS.map((m, i) => (
            <div key={m.href} className="flex flex-col border border-[#1d418f]/15 bg-white p-6 transition-shadow hover:shadow-[4px_4px_0_0_#1d418f]">
              <span className={`text-xs font-bold uppercase tracking-[0.28em] ${i % 2 ? "text-[#1d418f]" : "text-[#ca3134]"}`}><LocalizedText value={"Monthly meal plan"} /></span>
              <h3 className="mt-2 font-display text-3xl text-[#1d418f]"><LocalizedText value={m.month} /></h3>
              <p className="mt-2 text-sm text-[#17233f]/70"><LocalizedText value={"PDF sample"} /></p>
              <a href={href(m.href)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center rounded-sm bg-[#ca3134] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#a5262a]"><LocalizedText value={" View Meal Plan "} /></a>
            </div>
          ))} />
        </div>
      </Section>

      {/* Reference photos + menu philosophy */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2 className="font-display text-4xl leading-[1.05] text-[#1d418f] md:text-5xl"><LocalizedText value={" Thoughtfully Made for Young Palates "} /></h2>
            <RuleRedBlue className="mt-6 max-w-[220px]" />
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[#17233f]/85 md:text-lg"><LocalizedText value={" With over 60 menu items designed specifically for children, we take flavor, texture, protein, and vegetables seriously, not just nutrition. Every dish is built around how young palates actually experience food: balanced seasoning, approachable textures, and combinations that invite curiosity instead of resistance. Our goal isn't just a meal kids will eat. It's food that helps them explore, develop a taste for real ingredients, and build eating habits that last well beyond the lunch table. "} /></p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <LocalizedText value={REFERENCE_PHOTOS.map((p) => (
              <figure key={p.src} className="overflow-hidden border border-[#1d418f]/12 bg-white">
                <img src={p.src} alt={t(`${p.name} at TTOP Chicken`)} loading="lazy" decoding="async" width={675} height={900} className="block aspect-[3/4] w-full object-cover" />
              </figure>
            ))} />
          </div>
        </div>
      </Section>


      <Section tone="blue">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-3xl leading-snug text-white md:text-4xl"><LocalizedText value={" We invite you to build a lunch culture rooted in "} /><em className="italic text-[#ffb6b6]"><LocalizedText value={"grace and courtesy"} /></em><LocalizedText value={", together with TTOP. "} /></p>
        </div>
      </Section>

      <ProgramInquirySection defaultProgram="montessori" />
    </>
  );
}