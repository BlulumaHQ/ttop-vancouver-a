import { createFileRoute, Link } from "@tanstack/react-router";
import { OrderButton } from "@/components/site/OrderButton";
import { CodeChip, RuleRedBlue } from "@/components/site/CodeChip";
import { Section, SectionHead } from "@/components/site/Section";
import { PrintedMenuViewer } from "@/components/site/PrintedMenuViewer";
import { MENU, FROZEN_H, FROZEN_I, type MenuCategory, type MenuItem } from "@/lib/menu-data";

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

/* ---------- Presentational bits ---------- */

function accentClasses(cat: MenuCategory) {
  const isRed = cat.accent === "red";
  return {
    chip: isRed ? ("red" as const) : ("blue" as const),
    heading: isRed ? "text-[#ca3134]" : "text-[#1d418f]",
    band: isRed ? "bg-[#ca3134]" : "bg-[#1d418f]",
    price: isRed ? "text-[#ca3134]" : "text-[#1d418f]",
  };
}

function PhotoPlaceholder({ code }: { code: string }) {
  return (
    <div
      className="grid aspect-square w-full place-items-center bg-[#faf6ef]"
      aria-hidden="true"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent 0 12px, rgba(29,65,143,0.05) 12px 24px)",
      }}
    >
      <span className="font-display text-3xl font-black tracking-wider text-[#1d418f]/25">
        {code || "TTOP"}
      </span>
    </div>
  );
}

function PhotoCard({ item, cat }: { item: MenuItem; cat: MenuCategory }) {
  const cls = accentClasses(cat);
  return (
    <article className="group relative flex flex-col overflow-hidden border border-[#1d418f]/12 bg-white transition-shadow hover:shadow-[4px_4px_0_0_#1d418f]">
      <div className="relative">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            width={480}
            height={480}
            className="block aspect-square w-full object-cover"
          />
        ) : (
          <PhotoPlaceholder code={item.code} />
        )}
        {item.code && (
          <div className="absolute left-2 top-2">
            <CodeChip tone={cls.chip} size="sm">
              {item.code}
            </CodeChip>
          </div>
        )}
        <div className="absolute right-2 top-2 flex gap-1">
          {item.spicy && (
            <span
              className="inline-flex h-6 items-center rounded-sm bg-white/90 px-1.5 text-[10px] font-bold uppercase tracking-wider text-[#ca3134] shadow-sm"
              title="Spicy"
            >
              🌶 Spicy
            </span>
          )}
          {item.veg && (
            <span
              className="inline-flex h-6 items-center rounded-sm bg-white/90 px-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1d418f] shadow-sm"
              title="Vegetarian"
            >
              V
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="font-display text-[15px] font-semibold leading-snug text-[#17233f]">
          {item.name}
        </h3>
        {item.tagline && (
          <p className="text-[11px] italic text-[#17233f]/60">{item.tagline}</p>
        )}
        {item.note && (
          <p className="text-[11px] text-[#17233f]/60">{item.note}</p>
        )}
        <div className={`mt-auto pt-2 font-display tabular text-lg font-bold ${cls.price}`}>
          ${item.price}
        </div>
      </div>
    </article>
  );
}

function CompactRow({ item, cat }: { item: MenuItem; cat: MenuCategory }) {
  const cls = accentClasses(cat);
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-3 border-b border-dashed border-[#1d418f]/12 py-2.5 last:border-b-0">
      {item.code ? (
        <CodeChip tone={cls.chip} size="sm">
          {item.code}
        </CodeChip>
      ) : (
        <span className="inline-block h-1 w-1 rounded-full bg-[#1d418f]/30" />
      )}
      <div className="min-w-0">
        <div className="text-[14px] font-semibold text-[#17233f]">
          {item.spicy && <span className="mr-1 text-[#ca3134]">🌶</span>}
          {item.veg && (
            <span className="mr-1 rounded-sm bg-[#1d418f]/10 px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#1d418f]">
              V
            </span>
          )}
          {item.name}
        </div>
        {(item.tagline || item.note) && (
          <div className="text-[11px] italic text-[#17233f]/60">
            {item.tagline}
            {item.tagline && item.note ? " · " : ""}
            {item.note}
          </div>
        )}
      </div>
      <span className={`tabular text-right text-[14px] font-bold ${cls.price}`}>
        ${item.price}
      </span>
    </div>
  );
}

function CategoryHeader({ cat }: { cat: MenuCategory }) {
  const cls = accentClasses(cat);
  return (
    <div className="mb-6 flex items-end gap-4">
      <CodeChip tone={cls.chip} size="lg">
        {cat.letter}
      </CodeChip>
      <div className="flex-1">
        <h2 className={`font-display text-2xl leading-none md:text-3xl ${cls.heading}`}>
          {cat.title}
        </h2>
        {cat.subtitle && (
          <p className="mt-1 text-xs italic text-[#17233f]/60">{cat.subtitle}</p>
        )}
        {cat.blurb && (
          <p className="mt-2 max-w-2xl text-sm text-[#17233f]/75">{cat.blurb}</p>
        )}
      </div>
    </div>
  );
}

/* Photo grid — compact, 2 cols on mobile, up to 5 on desktop */
function PhotoGrid({ cat }: { cat: MenuCategory }) {
  return (
    <section id={cat.letter.replace("+", "")} className="scroll-mt-24">
      <CategoryHeader cat={cat} />
      <RuleRedBlue className="mb-5" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {cat.items.map((it) => (
          <PhotoCard key={`${cat.letter}-${it.code}-${it.name}-${it.tagline ?? ""}`} item={it} cat={cat} />
        ))}
      </div>
      {cat.notes && (
        <ul className="mt-5 space-y-1.5 border-l-2 border-[#1d418f]/25 pl-4 text-xs leading-relaxed text-[#17233f]/70">
          {cat.notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* Add-on toppings — grouped columns, no photos */
function AddOnGroups({ cat }: { cat: MenuCategory }) {
  if (!cat.groups) return null;
  return (
    <section id={cat.letter.replace("+", "")} className="scroll-mt-24 bg-[#faf6ef] p-6 md:p-10">
      <CategoryHeader cat={cat} />
      <RuleRedBlue className="mb-6" />
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {cat.groups.map((g) => (
          <div key={g.label}>
            <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-wider text-[#ca3134]">
              {g.label}
            </h3>
            <div>
              {g.items.map((it, i) => (
                <CompactRow key={`${g.label}-${i}`} item={it} cat={cat} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Compact list — used for D / E where photos are missing */
function CompactList({ cat }: { cat: MenuCategory }) {
  return (
    <section id={cat.letter.replace("+", "")} className="scroll-mt-24">
      <CategoryHeader cat={cat} />
      <RuleRedBlue className="mb-5" />
      <div className="grid gap-x-8 gap-y-1 md:grid-cols-2">
        {cat.items.map((it, i) => (
          <CompactRow key={`${cat.letter}-${i}`} item={it} cat={cat} />
        ))}
      </div>
      {cat.notes && (
        <ul className="mt-5 space-y-1.5 border-l-2 border-[#1d418f]/25 pl-4 text-xs leading-relaxed text-[#17233f]/70">
          {cat.notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

function MenuPage() {
  const anchors: { code: string; label: string }[] = [
    { code: "A", label: "Pot" },
    { code: "A", label: "Add-ons" }, // A+ shares anchor visual with A section? we use separate anchor:
  ];
  // Rebuild anchors properly:
  const NAV: { code: string; label: string }[] = [
    { code: "A", label: "Pot" },
    { code: "AAdd", label: "Add-ons" },
    { code: "B", label: "Bento" },
    { code: "C", label: "Rice Bowls" },
    { code: "D", label: "À La Carte" },
    { code: "E", label: "Side Dish" },
    { code: "F", label: "Drinks" },
    { code: "H", label: "Frozen Cooked" },
    { code: "I", label: "Frozen Raw" },
  ];

  const findCat = (letter: string) => MENU.find((m) => m.letter === letter)!;
  void anchors; // silence unused

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
          <PhotoGrid cat={findCat("B")} />
          <PhotoGrid cat={findCat("C")} />
          <CompactList cat={findCat("D")} />
          <CompactList cat={findCat("E")} />
          <PhotoGrid cat={findCat("F")} />

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
