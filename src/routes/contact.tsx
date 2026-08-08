import { createFileRoute, Link } from "@tanstack/react-router";
import { OrderButton } from "@/components/site/OrderButton";
import { RuleRedBlue } from "@/components/site/CodeChip";
import { Section, SectionHead } from "@/components/site/Section";
import { InquiryForm } from "@/components/site/InquiryForm";
import { ADDRESS, EMAIL, FB_URL, HOURS, IG_URL, MAP_URL, PHONE, PHONE_TEL } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact | TTOP Chicken" },
      { name: "description", content: "Get in touch with TTOP Chicken — Taiwanese bentos and chicken pot in Richmond, BC. Visit us at 223-13986 Cambie Road, or call 604-285-8867." },
      { property: "og:title", content: "Contact | TTOP Chicken" },
      { property: "og:description", content: "Visit us at 223-13986 Cambie Road, Richmond, BC — Monday to Friday, 11 AM to 8 PM." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-8 lg:py-24">
          <div className="flex items-center justify-center gap-3">
            <RuleRedBlue className="w-14" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ca3134]">Get in touch</span>
            <RuleRedBlue className="w-14" />
          </div>
          <h1 className="mt-6 font-display text-5xl leading-[1.02] text-[#1d418f] md:text-6xl">
            Come say <em className="italic text-[#ca3134]">hello</em>.
          </h1>
          <p className="mt-6 text-base text-[#17233f]/80">
            Thank you for visiting TTOP — use the form below to get in touch. We
            welcome your questions and suggestions and will get back to you as
            soon as we can.
          </p>
        </div>
      </section>

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead eyebrow="Visit" title="Cambie Road, Richmond" />
            <dl className="space-y-4 text-sm text-[#17233f]/85">
              <div><dt className="text-xs font-bold uppercase tracking-widest text-[#ca3134]">Address</dt>
                <dd><a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">{ADDRESS}</a></dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-widest text-[#ca3134]">Hours</dt><dd>{HOURS}</dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-widest text-[#ca3134]">Phone</dt><dd><a className="hover:underline" href={`tel:${PHONE_TEL}`}>{PHONE}</a></dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-widest text-[#ca3134]">Email</dt><dd><a className="hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-widest text-[#ca3134]">Social</dt>
                <dd className="flex gap-3">
                  <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
                  <span>·</span>
                  <a href={FB_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
                </dd></div>
            </dl>
            <div className="mt-8 border border-[#1d418f]/20">
              <iframe
                title="TTOP Chicken map"
                src="https://www.google.com/maps?q=13986+Cambie+Rd+Unit+223+Richmond+BC&output=embed"
                className="block h-[340px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="border border-[#1d418f]/20 bg-white p-6 md:p-8">
            <h2 className="font-display text-2xl text-[#1d418f]">Send us a message</h2>
            <p className="mt-1 text-xs text-[#17233f]/60">We usually reply within a business day.</p>
            <div className="mt-6">
              <InquiryForm
                fields={[
                  { name: "name", label: "Name", required: true },
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "phone", label: "Phone", type: "tel" },
                  { name: "message", label: "Message", type: "textarea", required: true },
                ]}
                submitLabel="Send Message"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="border border-[#1d418f]/20 p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-[#ca3134]">Order Online</div>
            <p className="mt-2 text-sm text-[#17233f]/80">Pickup and delivery via ChatChefs.</p>
            <div className="mt-4"><OrderButton size="sm" /></div>
          </div>
          <Link to="/school-lunch" className="block border border-[#1d418f]/20 p-6 hover:bg-[#faf6ef]">
            <div className="text-xs font-bold uppercase tracking-widest text-[#ca3134]">Schools & Daycares</div>
            <p className="mt-2 text-sm text-[#17233f]/80">Hot lunch programs for elementary & Montessori.</p>
            <div className="mt-4 text-sm font-bold uppercase tracking-wider text-[#1d418f]">Explore programs →</div>
          </Link>
          <Link to="/catering" className="block border border-[#1d418f]/20 p-6 hover:bg-[#faf6ef]">
            <div className="text-xs font-bold uppercase tracking-widest text-[#ca3134]">Catering</div>
            <p className="mt-2 text-sm text-[#17233f]/80">Group and corporate orders — one week's notice.</p>
            <div className="mt-4 text-sm font-bold uppercase tracking-wider text-[#1d418f]">Send inquiry →</div>
          </Link>
        </div>
      </Section>
    </>
  );
}