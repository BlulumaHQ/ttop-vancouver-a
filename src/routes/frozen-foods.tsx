import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { OrderButton, OutlineButton } from "@/components/site/OrderButton";
import { CodeChip, RuleRedBlue } from "@/components/site/CodeChip";
import { Section, SectionHead } from "@/components/site/Section";
import { FROZEN_H, FROZEN_I } from "@/lib/menu-data";
import { ADDRESS } from "@/lib/site";

export const Route = createFileRoute("/frozen-foods")({
  component: FrozenFoodsPage,
  head: () => ({
    meta: [
      { title: "Frozen Cooked Foods | TTOP Chicken" },
      { name: "description", content: "TTOP at Home — restaurant dishes vacuum-packed and frozen the day they're cooked. Chicken pot, beef noodle, LOBA sauce and more, available in Richmond, BC." },
      { property: "og:title", content: "Frozen Cooked Foods | TTOP Chicken" },
      { property: "og:description", content: "Restaurant dishes, vacuum-packed and frozen the day they're cooked." },
      { property: "og:url", content: "/frozen-foods" },
      { property: "og:image", content: "/images/frozen-og-01.jpg" },
      { name: "twitter:image", content: "/images/frozen-og-01.jpg" },
    ],
    links: [{ rel: "canonical", href: "/frozen-foods" }],
  }),
});

const DESCRIPTIONS: Record<string, string> = {
  H1: "Tender, springy boneless chicken leg simmered in pure Hua Diao wine until every piece is coated in rich sauce. Use the leftover Hua Diao sauce to braise your favourite hot pot ingredients, vegetables and sliced meats.",
  H2: "A rich broth simmered from more than ten Chinese herbs and spices, highlighting the distinctive aroma of green Sichuan pepper. Option: extra portion of raw thick noodles +$3.",
  H3: "A slow-fire consommé of beef bones, vegetables, fruit and a touch of Chinese herbs — clean, lightly sweet and refreshing. Option: extra portion of raw thin noodles +$3.",
  H4: "Hand-cut pork jowl, pork belly and pork skin slow-braised with aromatics and seasonings. Rich texture and deep, glossy collagen — perfect over rice or noodles. Try it with white pepper and cilantro. (Not the same thing as minced pork ragu!)",
  H5: "Old-school braised pork belly: gelatinous, springy skin, melt-in-your-mouth fat and tender, deeply flavoured meat. An absolute rice thief.",
  H6: "Old-hen soup simmered from chicken bones and skin, full of collagen, then braised with bamboo shoots. A generous portion — add noodles to turn it into chicken noodle soup.",
  H7: "Bone-in pork chops hand-tenderized, marinated, fried, then braised in soy — locking in the juices while keeping the meat tender and deeply seasoned. A classic Taiwanese flavour.",
  H8: "Fragrant shiitake with pork shoulder ground to the golden meat-to-fat ratio in a balanced sweet-savoury sauce. Perfect over rice or noodles — top with scallions, bean sprouts or cucumber.",
  H9: "Keeps the punch of black pepper, rounded out with butter for a fuller, silkier sauce. Ideal for steak and meats, and a great helper for stir-fries.",
  H10: "Fresh pork with layered aromatics — fluffy, tender, juicy centres. Mini-sized for easy eating; drop them into any hot pot broth, or braise with napa cabbage for classic lion's head.",
  I1: "Thick-cut pork loin marinated in a sweet-savoury sauce with scallion, garlic and aromatics. Sear hot in a pan, or slice for stir-fries. Hidden move: make it into a sandwich.",
  I2: "Bone-in chops tenderized and evenly coated in our house marinade — sweet-savoury with a hint of black pepper. Best shallow-fried in a pan or air-fried at high heat.",
  I3: "Boneless chicken leg with rehydrated dried shiitake, ginger and light seasoning. Gently braised, the chicken stays silky and drinks in the mushroom aroma. Serve over rice or simmer into congee.",
};

function ProductCard({
  code, name, price, note, description, image, tone,
}: {
  code: string; name: string; price: string; note?: string;
  description: string; image?: string; tone: "blue" | "red";
}) {
  const ring = tone === "blue" ? "border-[#1d418f]/15" : "border-[#ca3134]/20";
  return (
    <article className={`group flex flex-col overflow-hidden border ${ring} bg-white transition-shadow hover:shadow-[6px_6px_0_0_#1d418f]`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#faf6ef]">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-xs uppercase tracking-widest text-[#1d418f]/40">
            Photo coming soon
          </div>
        )}
        <span className="absolute left-3 top-3">
          <CodeChip tone={tone}>{code}</CodeChip>
        </span>
        <span className="absolute right-3 top-3 rounded-sm bg-white/95 px-2.5 py-1 font-display text-lg font-bold tabular text-[#ca3134] shadow-sm">
          ${price}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg leading-tight text-[#1d418f]">{name}</h3>
        {note && (
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#17233f]/55">
            {note}
          </p>
        )}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#17233f]/80">
          {description}
        </p>
      </div>
    </article>
  );
}

const FAQS = [
  { q: "How should I thaw and heat these products?", a: "For best results, we strongly recommend fully thawing all products before heating or cooking. Suggested times on packaging are a reference only — every stove, oven and air fryer behaves a little differently." },
  { q: "Where can I buy in person?", a: `Every frozen item is also available in store at ${ADDRESS}. Come by during our hours and we'll pack it fresh for the trip home.` },
  { q: "Can I order a large quantity?", a: "Yes — for large orders please give us one week's notice via our Catering & Group Orders page so we can prep everything at peak freshness." },
];

function FrozenFoodsPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <section className="bg-[#faf6ef]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <RuleRedBlue className="w-14" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ca3134]">TTOP at Home</span>
            </div>
            <h1 className="font-display text-5xl leading-[1.02] text-[#1d418f] md:text-6xl lg:text-7xl">
              Frozen<br /><em className="italic text-[#ca3134]">Cooked</em> Foods
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[#17233f]/85">
              Restaurant dishes, vacuum-packed and frozen the day they're cooked. Heat, eat, done.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <OrderButton size="lg" />
              <OutlineButton href="/contact">Visit in Store</OutlineButton>
            </div>
            <p className="mt-4 text-xs text-[#17233f]/60">Also available in store — {ADDRESS}.</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 border border-[#1d418f]/30" aria-hidden="true" />
            <img src="/images/frozen-hero-01.jpg" alt="TTOP frozen products" width={1200} height={900} className="relative block aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      <Section tone="white">
        <SectionHead eyebrow="Frozen Cooked" title="Ready in minutes" chip="H" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FROZEN_H.items.map((it) => (
            <ProductCard
              key={it.code}
              code={it.code}
              name={it.name.replace(" (500g)", "").replace(" (400g)", "").replace(" (550g)", "").replace(" (250g)", "").replace(" (2 pcs)", "")}
              price={it.price}
              note={it.note ?? undefined}
              description={DESCRIPTIONS[it.code] ?? ""}
              image={it.image}
              tone="blue"
            />
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <SectionHead eyebrow="Frozen Raw" title="For your own kitchen" chip="I" />
        <div className="grid gap-6 md:grid-cols-3">
          {FROZEN_I.items.map((it) => (
            <ProductCard
              key={it.code}
              code={it.code}
              name={it.name.replace(" (6 pcs)", "").replace(" (2 pcs)", "").replace(" (500g)", "")}
              price={it.price}
              description={DESCRIPTIONS[it.code] ?? ""}
              image={it.image}
              tone="red"
            />
          ))}
        </div>

        {/* Catalogue aside */}
        <div className="mt-14 grid gap-6 border-t border-[#1d418f]/20 pt-10 lg:grid-cols-[1fr_2fr] lg:items-center">
          <img src="/images/frozen-catalogue-01.jpg" alt="TTOP frozen catalogue" className="block w-full max-w-xs border border-[#1d418f]/20" width={500} height={700} loading="lazy" />
          <div>
            <h3 className="font-display text-2xl text-[#1d418f]">The full frozen catalogue</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#17233f]/80">
              Prefer the printed lookbook? Every dish above appears in TTOP's
              own bilingual product catalogue with weights, portions and
              suggested serving ideas. Ask us for a copy in store, or just
              come talk to us — we love recommending pairings.
            </p>
          </div>
        </div>
      </Section>

      {/* Preparation note + How to order */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="border-l-4 border-[#ca3134] bg-[#faf6ef] p-8">
            <h3 className="font-display text-2xl text-[#1d418f]">Before you heat it</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#17233f]/85">
              For best results, we strongly recommend fully thawing all
              products before heating or cooking. Suggested times are a
              reference only — every stove, oven and air fryer behaves a
              little differently.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-[#1d418f]">How to order</h3>
            <ol className="mt-4 space-y-4 text-sm text-[#17233f]/85">
              <li className="flex gap-3"><CodeChip tone="blue">1</CodeChip><span>Order online via ChatChefs for pickup or delivery.</span></li>
              <li className="flex gap-3"><CodeChip tone="blue">2</CodeChip><span>Or visit us in store at {ADDRESS}.</span></li>
              <li className="flex gap-3"><CodeChip tone="blue">3</CodeChip><span>Large orders: please give us one week's notice → <Link to="/catering" className="text-[#ca3134] underline">Catering & group orders</Link>.</span></li>
            </ol>
            <div className="mt-6"><OrderButton size="lg" /></div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="cream">
        <SectionHead eyebrow="Good to know" title="Frozen FAQ" />
        <div className="max-w-3xl divide-y divide-[#1d418f]/15 border-y border-[#1d418f]/15">
          {FAQS.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-lg text-[#1d418f]">{f.q}</span>
                <span className="text-2xl leading-none text-[#ca3134]">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <p className="pb-5 text-sm leading-relaxed text-[#17233f]/85">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}