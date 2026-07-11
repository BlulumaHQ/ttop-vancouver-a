import { createFileRoute, Link } from "@tanstack/react-router";
import { OrderButton, OutlineButton } from "@/components/site/OrderButton";
import { RuleRedBlue, Seal } from "@/components/site/CodeChip";
import { Section, SectionHead } from "@/components/site/Section";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About TTOP Chicken — Our Story | TTOP Chicken" },
      { name: "description", content: "A love letter to the people who raised us. The Lee brothers — Albert & Eric — bring three generations of Taiwanese family cooking to Richmond, BC through TTOP Chicken." },
      { property: "og:title", content: "About TTOP Chicken — Our Story" },
      { property: "og:description", content: "A first-generation Taiwanese immigrant journey, woven from passion, love, and the taste of home." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: "/images/food-portrait-01.jpg" },
      { name: "twitter:image", content: "/images/food-portrait-01.jpg" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  return (
    <>
      <section className="bg-[#faf6ef]">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-8 lg:py-28">
          <div className="flex items-center justify-center gap-3">
            <RuleRedBlue className="w-14" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ca3134]">Our Story · est. 2014</span>
            <RuleRedBlue className="w-14" />
          </div>
          <h1 className="mt-6 font-display text-5xl leading-[1.02] text-[#1d418f] md:text-6xl lg:text-7xl">
            A love letter to the<br />
            <em className="italic text-[#ca3134]">people who raised us.</em>
          </h1>
          <p className="mt-4 font-display italic text-lg tracking-wider text-[#1d418f]/70">
            A Taiwanese-Canadian family story.
          </p>
        </div>
      </section>

      {/* Founders story */}
      <Section tone="white">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[auto_1fr] lg:gap-12">
          <Seal className="h-24 w-24" />
          <div>
            <p className="font-display text-xl leading-relaxed text-[#17233f] md:text-2xl md:leading-relaxed">
              This is a first-generation Taiwanese immigrant journey, woven
              from passion, love, and the taste of home we carry in memory.
            </p>
            <p className="mt-6 text-base leading-relaxed text-[#17233f]/85">
              We are the Lee brothers, Albert and Eric. TTOP was born as our
              most sincere tribute to the family that raised us. Carrying
              three generations of family cooking tradition, TTOP
              reinterprets those nostalgic flavours hidden deep in memory
              through a modern lens.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#17233f]/85">
              To us, this is more than a restaurant — it is a love letter to
              our grandmother and our father; it is because of the careful
              teaching of these giants that we are who we are today.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#17233f]/85">
              We sincerely invite you to walk with us: honouring the past
              while rediscovering the flavours that shaped our childhood.
            </p>
            <div className="mt-6 text-xs font-bold uppercase tracking-widest text-[#ca3134]">
              — Albert & Eric Lee, est. 2014
            </div>
          </div>
        </div>
      </Section>

      {/* Editorial photo row */}
      <section className="bg-[#faf6ef]">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-3 px-5 py-10 lg:gap-6 lg:px-8">
          <img src="/images/food-portrait-01.jpg" alt="TTOP dish" className="block aspect-[3/4] w-full object-cover" width={500} height={666} loading="lazy" />
          <img src="/images/food-portrait-02.jpg" alt="TTOP dish" className="block aspect-[3/4] w-full object-cover" width={500} height={666} loading="lazy" />
          <img src="/images/food-portrait-03.jpg" alt="TTOP dish" className="block aspect-[3/4] w-full object-cover" width={500} height={666} loading="lazy" />
        </div>
      </section>

      {/* What we cook */}
      <Section tone="cream">
        <SectionHead eyebrow="What we cook" title="A unique dining experience" chip="A" />
        <div className="mx-auto max-w-3xl text-base leading-relaxed text-[#17233f]/85">
          <p>
            Taiwan Taipei Original Pot provides its Vancouver diners with a
            truly unique dining experience. Our chicken pots offer three
            different taste sensations all within one pot. Our original recipe
            is truly a delight for all of your senses.
          </p>
          <p className="mt-4">
            From the moment the lid is lifted on this popular dish, you will
            be greeted by the fragrant aroma of Hua Diao wine, providing a
            brief insight into the flavour contained within the dish. A
            glimpse inside the pot reveals a thick, rich sauce that is full
            of authentic Taiwanese seasonings that will take your taste buds
            on a journey to the beautiful Formosa.
          </p>
          <p className="mt-4">
            This tasty sauce enrobes generous servings of juicy pieces of
            chicken that have been cooked to the perfect combination of
            softness and tenderness. Join us at TTOP for a Taiwanese food
            adventure and let us show you what we like to eat and what
            authenticity means to us in the heart of Food Street in Richmond.
          </p>
        </div>
      </Section>

      {/* Closing band */}
      <Section tone="blue">
        <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
          <div>
            <h2 className="font-display text-3xl text-white md:text-4xl">Where next?</h2>
            <p className="mt-2 text-sm text-white/75">Three ways to keep exploring TTOP.</p>
          </div>
          <div className="grid gap-3 lg:col-span-2 lg:grid-cols-3">
            <Link to="/menu" className="border border-white/25 p-5 text-white hover:bg-white/10">
              <div className="text-xs font-bold uppercase tracking-widest text-white/70">01</div>
              <div className="mt-2 font-display text-xl">The Menu →</div>
            </Link>
            <Link to="/frozen-foods" className="border border-white/25 p-5 text-white hover:bg-white/10">
              <div className="text-xs font-bold uppercase tracking-widest text-white/70">02</div>
              <div className="mt-2 font-display text-xl">Frozen Foods →</div>
            </Link>
            <Link to="/school-lunch" className="border border-white/25 p-5 text-white hover:bg-white/10">
              <div className="text-xs font-bold uppercase tracking-widest text-white/70">03</div>
              <div className="mt-2 font-display text-xl">Schools & Daycares →</div>
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <OrderButton size="lg" />
          <OutlineButton href="/contact" className="border-white text-white hover:bg-white hover:text-[#1d418f]">Contact Us</OutlineButton>
        </div>
      </Section>
    </>
  );
}