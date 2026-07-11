import { createFileRoute, Link } from "@tanstack/react-router";
import { OrderButton } from "@/components/site/OrderButton";
import { CodeChip, RuleRedBlue, Seal } from "@/components/site/CodeChip";
import { Section } from "@/components/site/Section";
import { MENU, FROZEN_H, FROZEN_I, type MenuCategory, type MenuItem } from "@/lib/menu-data";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
  head: () => ({
    meta: [
      { title: "Menu | TTOP Chicken" },
      { name: "description", content: "TTOP Chicken menu — signature Hua Diao chicken pot, Taiwanese bentos, rice bowls, street snacks and frozen cooked foods. Dine in, take out, or order online in Richmond, BC." },
      { property: "og:title", content: "Menu | TTOP Chicken" },
      { property: "og:description", content: "Signature Hua Diao chicken pot, bentos, rice bowls and Taiwanese street snacks." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
});

function ItemRow({ item }: { item: MenuItem }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-3 border-b border-dashed border-[#1d418f]/15 py-3 last:border-b-0">
      {item.code ? (
        <CodeChip tone="blue" size="sm">{item.code}</CodeChip>
      ) : (
        <span className="inline-block h-7 w-7" aria-hidden="true" />
      )}
      <div>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-[15px] font-semibold text-[#17233f]">
            {item.spicy && <span className="mr-1 text-[#ca3134]" title="Spicy">🌶</span>}
            {item.veg && <span className="mr-1 rounded-sm bg-[#1d418f]/10 px-1 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1d418f]">V</span>}
            {item.name}
          </span>
          <span className="font-tc-sans text-sm text-[#17233f]/70">{item.zh}</span>
        </div>
        {item.note && (
          <div className="mt-0.5 text-xs italic text-[#17233f]/60">{item.note}</div>
        )}
      </div>
      <span className="tabular text-right text-[15px] font-bold text-[#ca3134]">${item.price}</span>
    </div>
  );
}

function Category({ cat, anchor }: { cat: MenuCategory; anchor: string }) {
  return (
    <section id={anchor} className="scroll-mt-24">
      <div className="mb-5 flex items-end gap-4">
        <CodeChip tone="blue" size="lg">{cat.letter}</CodeChip>
        <div className="flex-1">
          <h2 className="font-display text-3xl leading-none text-[#1d418f] md:text-4xl">
            {cat.title}{" "}
            <span className="font-tc-serif text-2xl text-[#ca3134] md:text-3xl">{cat.zh}</span>
          </h2>
          {cat.subtitle && (
            <p className="mt-1 text-xs italic text-[#17233f]/60">{cat.subtitle}</p>
          )}
        </div>
      </div>
      <RuleRedBlue className="mb-4" />
      <div>
        {cat.items.map((it, i) => (
          <ItemRow key={`${cat.letter}-${i}`} item={it} />
        ))}
      </div>
      {cat.notes && (
        <ul className="mt-4 space-y-2 border-l-2 border-[#1d418f]/30 pl-4 text-xs leading-relaxed text-[#17233f]/70">
          {cat.notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

function MenuPage() {
  const anchors = [
    ...MENU.filter((m) => m.letter !== "A+").map((m) => m.letter),
    "H",
    "I",
  ];
  return (
    <>
      {/* Hero band */}
      <section className="bg-[#1d418f] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-white/70">
            <RuleRedBlue className="w-12" /> Menu · 菜單
          </div>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] md:text-6xl lg:text-7xl">
            Hot Pot · <em className="italic text-[#ffb6b6]">Bento</em> ·<br />
            Street Food · Frozen Food
          </h1>
          <p className="mt-5 max-w-2xl text-white/85">
            Dine in, take out, or order online for pickup and delivery.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <OrderButton size="lg" />
            <a href="#A" className="inline-flex items-center rounded-sm border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-[#1d418f]">Jump to menu ↓</a>
          </div>
        </div>
      </section>

      {/* Sticky category nav */}
      <div className="sticky top-[76px] z-40 hidden border-b border-[#1d418f]/15 bg-white/95 backdrop-blur md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-5 py-3 lg:px-8">
          <span className="mr-2 text-xs font-bold uppercase tracking-widest text-[#17233f]/60">Jump to</span>
          {anchors.map((a) => (
            <a
              key={a}
              href={`#${a}`}
              className="grid h-9 w-9 place-items-center border border-[#1d418f]/20 text-sm font-bold text-[#1d418f] hover:bg-[#1d418f] hover:text-white"
            >
              {a}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile category chip scroller */}
      <div className="border-b border-[#1d418f]/15 bg-white md:hidden">
        <div className="flex gap-2 overflow-x-auto px-5 py-3">
          {anchors.map((a) => (
            <a
              key={a}
              href={`#${a}`}
              className="grid h-9 w-9 shrink-0 place-items-center border border-[#1d418f]/20 text-sm font-bold text-[#1d418f]"
            >
              {a}
            </a>
          ))}
        </div>
      </div>

      <Section tone="white">
        <div className="space-y-16">
          {MENU.map((cat) => (
            <Category key={cat.letter} cat={cat} anchor={cat.letter.replace("+", "")} />
          ))}

          {/* Frozen compact */}
          <div id="H" className="scroll-mt-24 bg-[#faf6ef] p-6 md:p-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-end gap-4">
                <CodeChip tone="blue" size="lg">H</CodeChip>
                <div>
                  <h2 className="font-display text-3xl leading-none text-[#1d418f] md:text-4xl">
                    Frozen Cooked Foods <span className="font-tc-serif text-2xl text-[#ca3134] md:text-3xl">冷凍預製菜</span>
                  </h2>
                </div>
              </div>
              <Seal className="hidden h-14 w-14 sm:inline-flex" />
            </div>
            <RuleRedBlue className="mb-4" />
            {FROZEN_H.items.map((it, i) => <ItemRow key={i} item={it} />)}
            <div id="I" className="mt-10 scroll-mt-24">
              <div className="mb-4 flex items-end gap-4">
                <CodeChip tone="blue" size="lg">I</CodeChip>
                <h3 className="font-display text-2xl leading-none text-[#1d418f] md:text-3xl">
                  Frozen Raw Products <span className="font-tc-serif text-xl text-[#ca3134]">冷凍食品</span>
                </h3>
              </div>
              <RuleRedBlue className="mb-4" />
              {FROZEN_I.items.map((it, i) => <ItemRow key={i} item={it} />)}
            </div>
            <div className="mt-6">
              <Link to="/frozen-foods" className="text-sm font-semibold uppercase tracking-wider text-[#ca3134] underline">
                See details, sizes & heating tips →
              </Link>
            </div>
          </div>

          <p className="border-t border-[#1d418f]/20 pt-6 text-center text-sm italic text-[#17233f]/75">
            <Link to="/catering" className="hover:text-[#1d418f]">
              For large orders, please inform us one week in advance. Thank you! 歡迎各大公司團體訂購，大量訂單建議提前一週通知
            </Link>
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#1d418f]/20 pt-8">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#17233f]/60">
              🌶 Spicy · V Vegetarian
            </span>
            <OrderButton size="lg" />
          </div>
        </div>
      </Section>

      {/* Loyalty strip */}
      <Section tone="blue">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">TTOP Loyalty</span>
            <h2 className="mt-3 font-display text-3xl leading-tight text-white md:text-4xl">
              Earn 1 star for every $20. Stars never expire.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/80">
              Redeem stars in store for free drinks, rice bowls, bentos, and
              discounts of up to $100 off. One redemption per order — ask our
              team for details.
            </p>
          </div>
          <OrderButton size="lg" />
        </div>
      </Section>
    </>
  );
}