import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { OrderButton, OutlineButton } from "@/components/site/OrderButton";
import { CodeChip, RuleRedBlue, Seal } from "@/components/site/CodeChip";
import { Section, SectionHead } from "@/components/site/Section";
import { ADDRESS, GOOGLE_REVIEWS, HOURS, PHONE, PHONE_TEL, MAP_URL } from "@/lib/site";
import threeFlavorsAsset from "@/assets/ttop-3-flavors.png.asset.json";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    meta: [
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/images/og-image.png" },
      { name: "twitter:image", content: "/images/og-image.png" },
    ],
  }),
});

const HERO_SLIDES = [
  {
    eyebrow: "Taiwan Taipei Original Pot",
    titleTop: "Old-world",
    titleTopItalic: true,
    titleRest: (
      <>
        {" "}flavour.<br />Maximum<br />authenticity.
      </>
    ),
    body: "Our signature Chicken Pot is simmered in Hua Diao wine sauce with fresh vegetables, mushrooms and hand-picked add-ons — a bubbling centrepiece that turns any table into a Taiwanese feast.",
    image: "/images/hero-chicken-pot-spread.webp",
    imageAlt: "TTOP Hua Diao Chicken Pot with fresh add-ons",
    primaryLabel: "Order Online",
    secondaryHref: "/menu",
    secondaryLabel: "View Menu",
    frame: "blue" as const,
  },
  {
    eyebrow: "The Classic Taiwanese Bento",
    titleTop: "Crispy",
    titleTopItalic: true,
    titleRest: (
      <>
        {" "}chicken.<br />Three sides.<br />One bento.
      </>
    ),
    body: "Golden deep-fried chicken leg over jasmine rice with marinated egg, seasonal greens and Taiwanese noodles — the bento that tastes like Taipei lunch hour.",
    image: "/images/hero-fried-chicken-bento.webp",
    imageAlt: "Deep-fried chicken leg bento with three Taiwanese sides",
    primaryLabel: "Order a Bento",
    secondaryHref: "/menu",
    secondaryLabel: "See the Menu",
    frame: "red" as const,
  },
];

function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(id);
  }, []);
  const slide = HERO_SLIDES[i];
  return (
    <section className="relative overflow-hidden bg-[#faf6ef]">
      <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-5 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute left-2 top-24 hidden lg:block" aria-hidden="true">
          <div className="font-display text-[11px] font-black leading-[1.1] tracking-[0.5em] text-[#1d418f]/25 [writing-mode:vertical-rl]">
            HUA · DIAO · CHICKEN
          </div>
        </div>
        <div className="relative flex flex-col justify-center lg:pl-14">
          <div className="mb-6 flex items-center gap-3">
            <RuleRedBlue className="w-16" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ca3134]">
              {slide.eyebrow}
            </span>
          </div>
          <h1 className="font-display text-[44px] font-black leading-[1.02] text-[#1d418f] md:text-[64px] lg:text-[76px]">
            {slide.titleTopItalic ? (
              <em className="font-normal italic text-[#ca3134]">{slide.titleTop}</em>
            ) : (
              slide.titleTop
            )}
            {slide.titleRest}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#17233f]/80 md:text-lg">
            {slide.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <OrderButton size="lg">{slide.primaryLabel}</OrderButton>
            <OutlineButton href={slide.secondaryHref}>{slide.secondaryLabel}</OutlineButton>
          </div>
          {/* Slide dots */}
          <div className="mt-10 flex items-center gap-3">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-[3px] transition-all ${
                  idx === i ? "w-10 bg-[#ca3134]" : "w-6 bg-[#1d418f]/30 hover:bg-[#1d418f]/60"
                }`}
              />
            ))}
            <span className="ml-2 font-display text-xs font-bold tracking-widest text-[#1d418f]/60 tabular">
              {String(i + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
            </span>
          </div>
        </div>
        <div className="relative min-h-[360px] lg:min-h-0">
          <div
            className={`absolute -inset-3 border ${
              slide.frame === "red" ? "border-[#ca3134]/60" : "border-[#1d418f]/30"
            }`}
            aria-hidden="true"
          />
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.imageAlt}
            width={1200}
            height={1200}
            className="relative block h-full min-h-[360px] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

const PATHWAYS = [
  {
    code: "01",
    title: "Dine In & Take Out",
    accent: "Chicken Pot · Bentos",
    body: "Signature chicken pot, bentos, rice bowls and Taiwanese street snacks.",
    to: "/menu",
    cta: "View the Menu",
  },
  {
    code: "02",
    title: "Frozen Cooked Foods",
    accent: "TTOP at Home",
    body: "Restaurant dishes, vacuum-packed and frozen. Heat, eat, done.",
    to: "/frozen-foods",
    cta: "Shop Frozen Foods",
  },
  {
    code: "03",
    title: "Schools, Daycares & Groups",
    accent: "Programs & Catering",
    body: "Hot lunch programs for schools and Montessori daycares, plus group ordering.",
    to: "/school-lunch",
    cta: "See Programs",
  },
] as const;

const REVIEWS = [
  { name: "Munchica", text: "Great value for what you get. Food tasted just like the bentos you buy in Taiwan. Loved how they included three veggie based side dishes that tasted very fresh in addition to your protein meat option. A well balanced meal for eating out." },
  { name: "Lancy", text: "Service very good and food good. My son drops his spoon and they came right away with a new spoon without us even having to ask. Polite servers. Food was excellent, ordered the chicken hot pot and added extra ingredients. Also the taro fries are super addictive." },
  { name: "Du", text: "Great food and good service is fairly consistent. Be sure to try the chicken pot and clams in herbal broth. Other good items include taro matchsticks and prawn toast." },
  { name: "David", text: "From the time you walk through the door you're greeted and asked if they could help you in English or Mandarin. Food was great, service was incredible. Polite, friendly, helpful — they hit every mark. Great place, thank you." },
];

function Home() {
  return (
    <>
      <HeroSlider />

      {/* PATHWAYS */}
      <Section tone="white">
        <SectionHead eyebrow="Three ways to enjoy" title="How to TTOP" />
        <div className="grid gap-6 md:grid-cols-3">
          {PATHWAYS.map((p) => (
            <Link
              key={p.code}
              to={p.to}
              className="group flex flex-col justify-between border border-[#1d418f]/15 bg-white p-7 transition-all hover:border-[#1d418f] hover:shadow-[6px_6px_0_0_#1d418f]"
            >
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <CodeChip tone="blue" size="md">{p.code}</CodeChip>
                  <span className="font-display italic text-xs font-semibold uppercase tracking-wider text-[#ca3134]">
                    {p.accent}
                  </span>
                </div>
                <h3 className="font-display text-2xl leading-tight text-[#1d418f]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#17233f]/75">{p.body}</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ca3134] transition-transform group-hover:translate-x-1">
                {p.cta} →
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-xs text-[#17233f]/60">
          Also: <Link to="/montessori" className="underline hover:text-[#1d418f]">Montessori daily meals</Link>{" "}·{" "}
          <Link to="/catering" className="underline hover:text-[#1d418f]">Catering & group orders</Link>
        </div>
      </Section>

      {/* ABOUT TEASER */}
      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
          <div className="grid grid-cols-3 gap-2">
            <img src="/images/food-portrait-01.jpg" alt="TTOP dish" className="aspect-[3/4] w-full object-cover" width={400} height={533} loading="lazy" />
            <img src="/images/food-portrait-02.jpg" alt="TTOP dish" className="mt-8 aspect-[3/4] w-full object-cover" width={400} height={533} loading="lazy" />
            <img src="/images/food-portrait-03.jpg" alt="TTOP dish" className="aspect-[3/4] w-full object-cover" width={400} height={533} loading="lazy" />
          </div>
          <div>
            <SectionHead eyebrow="A truly unique dining experience" title="Three tastes," chip="A" />
            <p className="text-base leading-relaxed text-[#17233f]/85">
              Our chicken pots offer three different taste sensations all within
              one pot. From the moment the lid is lifted, you are greeted by the
              fragrant aroma of Hua Diao wine — a brief insight into the flavour
              inside. A glimpse reveals a thick, rich sauce full of authentic
              Taiwanese seasonings that enrobes generous servings of juicy
              chicken, cooked to the perfect combination of softness and
              tenderness.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#17233f]/85">
              Join us for a Taiwanese food adventure and let us show you what
              authenticity means to us in the heart of Food Street in Richmond.
            </p>
            <div className="mt-6">
              <OutlineButton href="/about">Our Story</OutlineButton>
            </div>
          </div>
        </div>
      </Section>

      {/* FROM OUR KITCHEN */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-3 border border-[#ca3134]/40" aria-hidden="true" />
            <img
              src="/images/chicken-pot-flame.webp"
              alt="TTOP chicken pot close-up"
              width={1200}
              height={900}
              loading="lazy"
              className="relative block aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHead eyebrow="From our kitchen to yours" title="TTOP Chicken Pot" chip="H1" />
            <p className="text-base leading-relaxed text-[#17233f]/85">
              We transform the essence of traditional Taiwanese cuisine into
              every pot of our aromatic Chicken Pot. Top-quality, fresh chicken
              is gently marinated in our exclusive Hua Diao wine sauce to
              preserve its natural tenderness, then masterfully cooked into an
              unforgettable layering of flavours — a rich broth intermingled
              with fresh vegetables, every sip bursting with the fragrance of
              Hua Diao.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#17233f]/85">
              This traditional Taiwanese delicacy is now available for easy
              enjoyment at home. Our Frozen Cooked Foods — TTOP Chicken Pot
              (Frozen) — perfectly captures the classic taste. Simply heat it
              up, and recreate this nostalgic classic right at your table.
            </p>
            <div className="mt-6">
              <OutlineButton href="/frozen-foods">Shop Frozen Foods</OutlineButton>
            </div>
          </div>
        </div>
      </Section>

      {/* REVIEWS */}
      <Section tone="cream">
        <SectionHead eyebrow="What diners say" title="Real reviews" />
        <div className="grid gap-6 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="relative bg-white p-8 pl-14 shadow-sm">
              <span aria-hidden="true" className="absolute left-4 top-2 font-display text-6xl leading-none text-[#1d418f]">“</span>
              <blockquote className="text-sm leading-relaxed text-[#17233f]/85">
                {r.text}
              </blockquote>
              <figcaption className="mt-4 text-xs font-bold uppercase tracking-widest text-[#ca3134]">
                — {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8">
          <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold uppercase tracking-wider text-[#1d418f] underline hover:text-[#ca3134]">
            Read more reviews on Google →
          </a>
        </div>
      </Section>

      {/* LOYALTY STRIP */}
      <Section tone="blue">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <Seal className="h-14 w-14" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">TTOP Loyalty</span>
            </div>
            <h2 className="font-display text-3xl leading-tight text-white md:text-4xl">
              Earn 1 star for every <em className="italic text-[#ffb6b6]">$20</em> you spend. Stars never expire.
            </h2>
            <p className="mt-3 text-sm text-white/80">
              Redeem stars in store for free drinks, rice bowls, bentos, and
              discounts of up to $100 off. One redemption per order — ask our
              team for details.
            </p>
          </div>
          <OrderButton size="lg" />
        </div>
      </Section>

      {/* LOCATION STRIP */}
      <Section tone="white">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHead eyebrow="Visit us" title="Food Street, Richmond" />
            <dl className="space-y-3 text-sm text-[#17233f]/85">
              <div><dt className="text-xs font-bold uppercase tracking-widest text-[#ca3134]">Address</dt>
                <dd><a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">{ADDRESS}</a></dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-widest text-[#ca3134]">Hours</dt><dd>{HOURS}</dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-widest text-[#ca3134]">Phone</dt><dd><a className="hover:underline" href={`tel:${PHONE_TEL}`}>{PHONE}</a></dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <OrderButton />
              <OutlineButton href="/contact">Contact Us</OutlineButton>
            </div>
          </div>
          <div className="border border-[#1d418f]/20">
            <iframe
              title="TTOP Chicken map"
              src="https://www.google.com/maps?q=13986+Cambie+Rd+Unit+223+Richmond+BC&output=embed"
              className="block h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
