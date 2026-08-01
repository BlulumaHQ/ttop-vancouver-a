import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CodeChip, RuleRedBlue } from "@/components/site/CodeChip";
import { Section, SectionHead } from "@/components/site/Section";
import { ProgramInquirySection } from "@/components/site/ProgramInquirySection";
import { PHONE, PHONE_TEL } from "@/lib/site";

export const Route = createFileRoute("/school-lunch")({
  component: SchoolLunchPage,
  head: () => ({
    meta: [
      { title: "School Hot Lunch Program | TTOP Chicken" },
      { name: "description", content: "Nutritious hot lunch for elementary schools across Greater Vancouver. Class-sorted delivery, on-time guaranteed, peanut-free and nut-free menu. Book a consultation with TTOP Chicken." },
      { property: "og:title", content: "School Hot Lunch Program | TTOP Chicken" },
      { property: "og:description", content: "300 students. 30 minutes. Zero disruption. Yes, it's possible." },
      { property: "og:url", content: "/school-lunch" },
    ],
    links: [{ rel: "canonical", href: "/school-lunch" }],
  }),
});

const TRUST = [
  { t: "Food safety first", d: "Licensed operation and food-safety certified staff." },
  { t: "Reliable & consistent", d: "On-time delivery so lunch never runs late." },
  { t: "Low disruption", d: "Meals arrive sorted by class in insulated thermal bags." },
  { t: "Parent satisfaction", d: "Portions calibrated by age, peanut-free & nut-free menu." },
  { t: "Budget fit", d: "Flexible daily, weekly, monthly or seasonal ordering." },
  { t: "Students love it", d: "Rotating menus rich in colour, texture and aroma." },
];

const PHASES = [
  { n: "1", t: "Precise Planning", accent: "Before day one", d: "Custom consultation, safety protocols, and a menu shaped to your school's budget and preferences." },
  { n: "2", t: "Operational Excellence", accent: "Every school day", d: "Temperature-controlled freshness, class-sorted delivery, meals labelled with class number and student name." },
  { n: "3", t: "Easy Recovery", accent: "After lunch", d: "Sustainable paper meal boxes designed for teachers and students — cleanup in about 3 minutes." },
];

const SCHOOLS = [
  "Anderson Elementary", "Cambie Montessori", "Diefenbaker Elementary", "Dixon Elementary",
  "Ferris Elementary", "Laurier Elementary", "Maple Lane Elementary", "Maple Grove Elementary",
  "Inspirations Montessori School (IMS)", "Lesco Montessori",
  "McKechnie Elementary", "Mitchell Elementary", "Newbridge Academy",
  "Quilchena Elementary", "Spul'u'Kwuks Elementary",
  "St. Anthony Elementary", "St. Helen's Elementary", "Weir Elementary", "Westside Montessori",
];

const TESTIMONIALS = [
  { s: "Ferris Elementary", q: "This hot lunch was a great success. The insulated bags sorted by class were a great idea — it made distribution easy and fast, and the students really enjoyed the meal." },
  { s: "Dixon Elementary", q: "The feedback has been excellent — delivery was right on time and bagged by class, which made distribution so much easier for us." },
  { s: "Spul'u'Kwuks Elementary", q: "The lunch service was a big success! We received lots of positive feedback from parents and students." },
  { s: "Quilchena Elementary", q: "Delivery and organization were flawless — not a single parent has raised a food-quality concern." },
  { s: "Diefenbaker Elementary", q: "The first lunch service went very smoothly — every detail was arranged in an orderly way." },
  { s: "Anderson Elementary", q: "Thank you for the wonderful meals and drinks — the kids really loved them." },
];

const FAQS = [
  { q: "How do you handle allergens?", a: "Our school menu is peanut-free and nut-free, with a strict allergen-control process in our kitchen. Portions are calibrated by age." },
  { q: "How flexible is ordering?", a: "Weekly, monthly or seasonal — we work with your team on the cadence. Daily, weekly and monthly options are all supported." },
  { q: "How does delivery work?", a: "Meals arrive in three-layer insulated thermal bags, sorted by class and clearly labelled with class number, student name and meal selection. On-time delivery guaranteed. Delivery is free." },
  { q: "What about cleanup?", a: "Eco-friendly paper boxes designed for teachers and students — cleanup takes about 3 minutes." },
  { q: "Is there menu variety?", a: "Yes. Menus rotate regularly, and in every four-week cycle students see at least 20 different colours of natural whole foods (our Rainbow Index)." },
];

function SchoolLunchPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <RuleRedBlue className="w-14" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ca3134]">School Programs · since 2024</span>
            </div>
            <h1 className="font-display text-[42px] font-black leading-[1.02] text-[#1d418f] md:text-6xl lg:text-7xl">
              Nutritious hot lunch for elementary <em className="italic text-[#ca3134]">schools</em>.
            </h1>
            <p className="mt-3 font-display italic text-base tracking-wider text-[#1d418f]/70">
              Elementary hot lunch program
            </p>
            <p className="mt-6 max-w-xl text-lg text-[#17233f]/85">
              Weekly, monthly or seasonal ordering · Free delivery · Peanut-free & nut-free menu.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#inquiry" className="inline-flex items-center rounded-sm bg-[#ca3134] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#a5262a]">Book a Consultation</a>
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center rounded-sm border border-[#1d418f] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#1d418f] hover:bg-[#1d418f] hover:text-white">Call {PHONE}</a>
            </div>
          </div>
          <div className="border border-[#1d418f]/25 bg-[#faf6ef] p-8">
            <div className="font-display text-5xl leading-tight text-[#1d418f] md:text-6xl">
              300 <span className="italic font-display text-3xl text-[#ca3134]">students</span>.
            </div>
            <div className="mt-2 font-display text-5xl leading-tight text-[#1d418f] md:text-6xl">
              30 minutes.
            </div>
            <div className="mt-2 font-display text-5xl leading-tight text-[#ca3134] md:text-6xl italic">
              Zero disruption.
            </div>
            <p className="mt-6 text-sm text-[#17233f]/80">
              Yes, it's possible. Since 2024, TTOP has partnered with schools
              across Greater Vancouver, serving balanced, kid-friendly meals
              that solve lunchtime for educators — and that students love.
            </p>
          </div>
        </div>
      </section>

      {/* Zero friction */}
      <Section tone="cream">
        <SectionHead eyebrow="How we deliver" title="The zero-friction school lunch" />
        <div className="grid gap-6 md:grid-cols-2">
          {[
            ["Classroom-direct delivery","Meals arrive in three-layer insulated thermal bags, sorted by class, so school workflow is never disrupted."],
            ["Precise labelling","Every meal is clearly labelled with class number, student name and meal selection — pickup is exact, every time."],
            ["On-time, reliable promise","Guaranteed on-time delivery so lunch never runs late and the learning rhythm flows."],
            ["Fast, eco-friendly cleanup","Sustainable paper meal boxes designed for teachers and students — cleanup in about 3 minutes."],
          ].map(([t, d], i) => (
            <div key={t} className="flex gap-4 border border-[#1d418f]/15 bg-white p-6">
              <CodeChip tone="blue" size="md">{String(i + 1).padStart(2, "0")}</CodeChip>
              <div>
                <h3 className="font-display text-xl text-[#1d418f]">{t}</h3>
                <p className="mt-2 text-sm text-[#17233f]/80">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Priorities */}
      <Section tone="white">
        <SectionHead eyebrow="We know your priorities" title="What matters to your school" />
        <div className="grid gap-4 md:grid-cols-3">
          {TRUST.map((t) => (
            <div key={t.t} className="border-l-2 border-[#ca3134] bg-[#faf6ef] p-5">
              <h3 className="font-display text-lg text-[#1d418f]">{t.t}</h3>
              <p className="mt-1 text-sm text-[#17233f]/80">{t.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 border border-[#1d418f]/20 bg-[#1d418f] p-8 text-white md:p-10">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="font-display text-4xl md:text-5xl">Rainbow Index</span>
            <span className="font-display italic text-sm uppercase tracking-widest text-white/70">
              a colour-based nutrition metric
            </span>
          </div>
          <p className="mt-3 max-w-3xl text-white/85">
            In every four-week cycle, students are exposed to at least{" "}
            <span className="font-display text-2xl italic text-[#ffb6b6]">20</span>{" "}
            different colours of natural whole foods.
          </p>
        </div>
      </Section>

      {/* Partner schools */}
      <Section tone="cream">
        <SectionHead eyebrow="Trusted by schools across Greater Vancouver since 2024" title="Our school partners" />
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {SCHOOLS.map((s) => (
            <span key={s} className="border-b-2 border-[#1d418f]/25 pb-1 font-display text-lg text-[#17233f]">
              {s}
            </span>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section tone="white">
        <SectionHead eyebrow="Notes from partner schools" title="What educators tell us" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.s} className="relative border border-[#1d418f]/20 bg-white p-6 pt-10">
              <span aria-hidden="true" className="absolute left-3 top-0 font-display text-6xl leading-none text-[#1d418f]">“</span>
              <blockquote className="text-sm leading-relaxed text-[#17233f]/85">{t.q}</blockquote>
              <figcaption className="mt-4 text-xs font-bold uppercase tracking-widest text-[#ca3134]">— {t.s}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Phases */}
      <Section tone="cream">
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

      {/* Founders promise */}
      <Section tone="blue">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">Founders' promise</span>
          <p className="mt-6 font-display text-2xl leading-snug text-white md:text-3xl">
            “As first-generation immigrants, we put our reputation into every
            meal. If our service ever falls short of your school's standards,
            call us directly — we will personally make it right.”
          </p>
          <div className="mt-6 text-xs font-bold uppercase tracking-widest text-white/70">— Albert & Eric Lee</div>
          <a href={`tel:${PHONE_TEL}`} className="mt-4 inline-block text-white/90 underline">{PHONE}</a>
        </div>
      </Section>

      <ProgramInquirySection defaultProgram="school" />

      {/* FAQ */}
      <Section tone="cream">
        <SectionHead eyebrow="FAQ" title="What administrators ask" />
        <div className="max-w-3xl divide-y divide-[#1d418f]/15 border-y border-[#1d418f]/15">
          {FAQS.map((f, i) => (
            <div key={i}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                <span className="font-display text-lg text-[#1d418f]">{f.q}</span>
                <span className="text-2xl leading-none text-[#ca3134]">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <p className="pb-5 text-sm leading-relaxed text-[#17233f]/85">{f.a}</p>}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}