import { createFileRoute, Link } from "@tanstack/react-router";
import { OrderButton } from "@/components/site/OrderButton";
import { CodeChip, RuleRedBlue } from "@/components/site/CodeChip";
import { Section, SectionHead } from "@/components/site/Section";
import { PrintedMenuViewer } from "@/components/site/PrintedMenuViewer";
import { BentoAddOns } from "@/components/site/BentoAddOns";
import {
  AddOnGroups,
  CompactList,
  PhotoGrid,
} from "@/components/site/MenuGrid";
import { MENU, FROZEN_H, FROZEN_I } from "@/lib/menu-data";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
  head: () => ({
    meta: [
      { title: "Menu | TTOP Chicken" },
      { name: "description", content: "TTOP Chicken menu — signature Hua Diao chicken pot, Taiwanese bentos, rice bowls, street food and frozen cooked foods. Photo menu for browsing; order online for pickup or delivery in Richmond, BC." },
      { property: "og:title", content: "Menu | TTOP Chicken" },
      { property: "og:description", content: "Photo menu — chicken pot, bentos, rice bowls, street food and frozen cooked foods." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
});

function MenuPage() {
  const NAV: { code: string; label: string }[] = [
    { code: "A", label: "Pot" },
    { code: "AAdd", label: "Add-ons" },
    { code: "B", label: "Bento" },
    { code: "C", label: "Rice Bowls" },
    { code: "D", label: "À La Carte" },
    { code: "E", label: "Side Dish" },
    { code: "H", label: "Chef-Pac" },
    { code: "I", label: "Prep-Pac" },
  ];

  const findCat = (letter: string) => MENU.find((m) => m.letter === letter)!;

  return (
    <>
      {/* Hero band — photo-forward */}
      <section className="relative overflow-hidden bg-[#1d418f] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12 lg:px-8 lg:py-16">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-white/70">
              <RuleRedBlue className="w-12" /> Menu · Browse
            </div>
            <h1 className="font-display text-4xl leading-[1.02] md:text-5xl lg:text-6xl">
              <em className="italic text-[#ffb6b6]">What's cooking</em> at TTOP.
            </h1>
            <p className="mt-4 max-w-xl text-white/85">
              Photo menu for browsing. When you're ready to eat — dine in, take
              out, or order online for pickup and delivery.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <OrderButton size="lg" />
              <a
                href="#A"
                className="inline-flex items-center rounded-sm border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-[#1d418f]"
              >
                Jump to menu ↓
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/menu-hero-spread.webp"
              alt="TTOP Chicken bento spread — fried chicken, pork chop, LOBA rice, sides"
              className="block aspect-[4/3] w-full object-cover"
              loading="eager"
              width={1200}
              height={900}
            />
          </div>
        </div>
      </section>

      {/* Sticky category nav */}
      <div className="sticky top-[76px] z-40 border-b border-[#1d418f]/15 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 lg:px-8">
          <span className="hidden shrink-0 self-center pr-1 text-xs font-bold uppercase tracking-widest text-[#17233f]/60 md:inline">
            Jump to
          </span>
          {NAV.map((n) => (
            <a
              key={n.code + n.label}
              href={`#${n.code}`}
              className="inline-flex shrink-0 items-center gap-1.5 border border-[#1d418f]/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#1d418f] hover:bg-[#1d418f] hover:text-white"
            >
              <span className="font-display text-sm font-black">
                {n.code.replace("AAdd", "A+")}
              </span>
              <span className="hidden sm:inline">{n.label}</span>
            </a>
          ))}
        </div>
      </div>

      <Section tone="white">
        <div className="space-y-14">
          <PhotoGrid cat={findCat("A")} />
          <div id="AAdd">
            <AddOnGroups cat={findCat("A+")} />
          </div>
          <PhotoGrid
            cat={findCat("B")}
            renderFooter={(it) =>
              it.code === "B17" || Number(it.code.slice(1)) >= 3 ? (
                <BentoAddOns />
              ) : null
            }
          />
          <PhotoGrid cat={findCat("C")} />
          <CompactList cat={findCat("D")} />
          <CompactList cat={findCat("E")} />

          {/* ChuChu Bar promo band (drinks moved to their own page) */}
          <section className="border border-[#1d418f]/20 bg-[#faf6ef] p-6 md:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-3">
                  <RuleRedBlue className="w-12" />
                  <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#ca3134]">
                    Drinks
                  </span>
                </div>
                <h2 className="font-display text-3xl leading-tight text-[#1d418f] md:text-4xl">
                  ChuChu Bar
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#17233f]/80">
                  Signature milk teas, Taiwanese classics and our natural
                  vinegar cube drinks.
                </p>
              </div>
              <Link
                to="/chuchu-bar"
                className="inline-flex shrink-0 items-center justify-center rounded-sm bg-[#ca3134] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#a5262a]"
              >
                View ChuChu Bar
              </Link>
            </div>
          </section>

          {/* Frozen cooked + raw */}
          <div className="bg-[#faf6ef] p-6 md:p-10">
            <PhotoGrid cat={FROZEN_H} />
            <div className="mt-14">
              <PhotoGrid cat={FROZEN_I} />
            </div>
            <div className="mt-6">
              <Link
                to="/frozen-foods"
                className="text-sm font-semibold uppercase tracking-wider text-[#ca3134] underline hover:text-[#a5262a]"
              >
                See details, sizes & heating tips →
              </Link>
            </div>
          </div>

          <div className="border-t border-[#1d418f]/20 pt-6 text-center text-sm italic text-[#17233f]/75">
            <Link to="/catering" className="hover:text-[#1d418f]">
              Ordering for a company or group? For large orders, please give us
              one week's notice. →
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#1d418f]/20 pt-8">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#17233f]/60">
              🌶 Spicy · V Vegetarian · DF Deep-Fried · OG Old-School
            </span>
            <OrderButton size="lg" />
          </div>
        </div>
      </Section>

      {/* Printed menu */}
      <Section tone="cream">
        <SectionHead
          eyebrow="Printed menus"
          title="View Our Printed Menu 實體菜單"
        />
        <p className="-mt-6 mb-8 max-w-2xl text-sm text-[#17233f]/75">
          The same menus we hand you at the restaurant.
        </p>
        <PrintedMenuViewer />
      </Section>

      {/* Loyalty program */}
      <LoyaltySection />
    </>
  );
}

/* ---------- Loyalty ---------- */

const REWARDS: { stars: number; reward: string; code?: string }[] = [
  { stars: 1, reward: "1 canned beverage" },
  { stars: 3, reward: "1 house blend drink (M)" },
  { stars: 4, reward: "1 ChuChuBar drink (L)" },
  { stars: 6, reward: "1 rice bowl", code: "C1–C2" },
  { stars: 8, reward: "1 deluxe rice bowl", code: "C3–C5" },
  { stars: 10, reward: "1 bento", code: "B3–B16" },
  { stars: 20, reward: "$25 off the entire sale" },
  { stars: 30, reward: "$50 off the entire sale" },
  { stars: 40, reward: "$75 off the entire sale" },
  { stars: 50, reward: "$100 off the entire sale" },
];

function LoyaltySection() {
  return (
    <Section tone="white">
      <SectionHead eyebrow="Rewards" title="TTOP Loyalty Program" />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
        {/* How it works */}
        <div className="border border-[#1d418f]/20 bg-[#1d418f] p-6 text-white md:p-8">
          <h3 className="font-display text-2xl text-white md:text-3xl">
            How it Works
          </h3>
          <RuleRedBlue className="mt-4 max-w-[140px]" />
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-white/90">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffb6b6]" />
              <span>Earn <strong>1 star</strong> for each <strong>$20</strong> purchase.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffb6b6]" />
              <span>Stars <strong>do not expire</strong>.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffb6b6]" />
              <span>Only <strong>one redemption per order</strong>.</span>
            </li>
          </ul>
          <p className="mt-6 text-xs italic text-white/70">
            Redeem in store — ask our team for details.
          </p>
        </div>

        {/* Rewards grid */}
        <div>
          <h3 className="font-display text-2xl text-[#1d418f] md:text-3xl">
            Rewards
          </h3>
          <RuleRedBlue className="mt-4 max-w-[140px]" />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {REWARDS.map((r) => (
              <li
                key={r.stars}
                className="flex items-center gap-3 border border-[#1d418f]/20 bg-white p-3"
              >
                <span className="inline-flex min-w-[52px] shrink-0 items-baseline justify-center rounded-sm bg-[#ca3134]/10 px-2 py-1 font-display text-lg font-black text-[#ca3134]">
                  {r.stars}★
                </span>
                <span className="flex flex-wrap items-center gap-1.5 text-sm text-[#17233f]">
                  <span>{r.reward}</span>
                  {r.code && (
                    <CodeChip tone="blue" size="sm">{r.code}</CodeChip>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
