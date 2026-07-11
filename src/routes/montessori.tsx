import { createFileRoute, Link } from "@tanstack/react-router";
import { CodeChip, RuleRedBlue } from "@/components/site/CodeChip";
import { Section, SectionHead } from "@/components/site/Section";
import { InquiryForm } from "@/components/site/InquiryForm";
import { PHONE, PHONE_TEL, EMAIL } from "@/lib/site";

export const Route = createFileRoute("/montessori")({
  component: MontessoriPage,
  head: () => ({
    meta: [
      { title: "Montessori Daily Meals | TTOP Chicken" },
      { name: "description", content: "Daily meal service for Montessori and daycares in Greater Vancouver. Balanced nutrition, bite-sized portions, quiet delivery — designed to fit a prepared environment." },
      { property: "og:title", content: "Montessori Daily Meals | TTOP Chicken" },
      { property: "og:description", content: "Daily meal service that makes the lunch table an extension of the classroom environment." },
      { property: "og:url", content: "/montessori" },
    ],
    links: [{ rel: "canonical", href: "/montessori" }],
  }),
});

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

function MontessoriPage() {
  return (
    <>
      <section className="bg-[#faf6ef]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <RuleRedBlue className="w-14" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ca3134]">Montessori & Daycare</span>
            </div>
            <h1 className="font-display text-[40px] font-black leading-[1.03] text-[#1d418f] md:text-[56px] lg:text-[68px]">
              Daily meal service that makes the lunch table an <em className="italic text-[#ca3134]">extension</em> of the classroom.
            </h1>
            <p className="mt-3 font-display italic text-base tracking-wider text-[#1d418f]/70">
              Montessori daily meal service
            </p>
            <p className="mt-6 max-w-xl text-lg text-[#17233f]/85">
              The classroom is a prepared environment. Why should the lunch table be any different?
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#inquiry" className="inline-flex items-center rounded-sm bg-[#ca3134] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#a5262a]">Book a Consultation</a>
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center rounded-sm border border-[#1d418f] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#1d418f] hover:bg-[#1d418f] hover:text-white">Call {PHONE}</a>
            </div>
          </div>
          <div className="border border-[#1d418f]/20 bg-white p-8">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ca3134]">Our goal</span>
            <p className="mt-4 font-display text-3xl leading-tight text-[#1d418f]">
              Lighten the load on your staff, and make lunchtime something students <em className="italic text-[#ca3134]">enjoy</em>.
            </p>
          </div>
        </div>
      </section>

      <Section tone="white">
        <SectionHead eyebrow="Four pillars" title="How we support the environment" />
        <div className="grid gap-6 md:grid-cols-2">
          {PILLARS.map(([t, d], i) => (
            <div key={t} className="flex gap-5 border-l-2 border-[#ca3134] bg-[#faf6ef] p-6">
              <CodeChip tone="blue" size="lg">{String(i + 1).padStart(2, "0")}</CodeChip>
              <div>
                <h3 className="font-display text-xl text-[#1d418f]">{t}</h3>
                <p className="mt-2 text-sm text-[#17233f]/80">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead eyebrow="Our menu supports" title="A prepared table" />
            <ul className="space-y-3 text-sm text-[#17233f]/85">
              {SUPPORTS.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#ca3134]" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="relative flex flex-col justify-center border border-[#1d418f]/20 bg-white p-8">
            <span aria-hidden="true" className="absolute left-4 top-1 font-display text-7xl leading-none text-[#1d418f]">“</span>
            <blockquote className="pl-6 pt-6 font-display text-2xl leading-snug text-[#1d418f]">
              The kids finished every last bite — truly not a single mouthful left. Now they ask every day: <em className="italic text-[#ca3134]">“When is the lunch delivery uncle coming back?”</em>
            </blockquote>
            <figcaption className="mt-6 pl-6 text-xs font-bold uppercase tracking-widest text-[#ca3134]">— Cambie Montessori</figcaption>
          </figure>
        </div>
      </Section>

      <Section tone="white">
        <SectionHead eyebrow="How partnership works" title="Three phases, one team" />
        <div className="grid gap-6 md:grid-cols-3">
          {PHASES.map((p) => (
            <div key={p.n} className="border border-[#1d418f]/20 bg-white p-6">
              <CodeChip tone="blue" size="lg">{p.n}</CodeChip>
              <h3 className="mt-4 font-display text-2xl text-[#1d418f]">{p.t}</h3>
              <p className="mt-1 font-display italic text-xs uppercase tracking-widest text-[#ca3134]">{p.accent}</p>
              <p className="mt-4 text-sm text-[#17233f]/80">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="blue">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-3xl leading-snug text-white md:text-4xl">
            We invite you to build a lunch culture rooted in <em className="italic text-[#ffb6b6]">grace and courtesy</em>, together with TTOP.
          </p>
        </div>
      </Section>

      <Section tone="white" id="inquiry">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <SectionHead eyebrow="Book a consultation" title="Start a conversation" />
            <p className="text-sm leading-relaxed text-[#17233f]/85">
              Tell us about your centre and we'll follow up with a menu plan
              tailored to your children's ages and your daily rhythm. Reach us
              directly at{" "}
              <a href={`tel:${PHONE_TEL}`} className="text-[#ca3134] underline">{PHONE}</a>{" "}
              or{" "}
              <a href={`mailto:${EMAIL}`} className="text-[#ca3134] underline">{EMAIL}</a>.
            </p>
            <div className="mt-8 rounded-sm border border-[#1d418f]/20 bg-[#faf6ef] p-6 text-sm text-[#17233f]/85">
              <div className="text-xs font-bold uppercase tracking-widest text-[#1d418f]">Elementary school?</div>
              <p className="mt-2">See our <Link to="/school-lunch" className="text-[#ca3134] underline">School Hot Lunch Program</Link>.</p>
            </div>
          </div>
          <div className="border border-[#1d418f]/20 bg-white p-6 md:p-8">
            <InquiryForm
              fields={[
                { name: "centre", label: "Centre name", required: true },
                { name: "contact", label: "Contact name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "phone", label: "Phone", type: "tel" },
                { name: "children", label: "Number of children", type: "number" },
                { name: "ages", label: "Age range" },
                { name: "message", label: "Message", type: "textarea" },
              ]}
              submitLabel="Request a Proposal"
            />
          </div>
        </div>
      </Section>
    </>
  );
}