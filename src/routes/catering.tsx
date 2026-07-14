import { createFileRoute, Link } from "@tanstack/react-router";
import { OrderButton } from "@/components/site/OrderButton";
import { CodeChip, RuleRedBlue } from "@/components/site/CodeChip";
import { Section, SectionHead } from "@/components/site/Section";
import { InquiryForm } from "@/components/site/InquiryForm";
import { PHONE, PHONE_TEL, EMAIL } from "@/lib/site";

export const Route = createFileRoute("/catering")({
  component: CateringPage,
  head: () => ({
    meta: [
      { title: "Catering & Group Orders | TTOP Chicken" },
      { name: "description", content: "Bentos, chicken pots and Taiwanese street snacks for your team or event. Companies and groups welcome — please give us one week's notice for large orders." },
      { property: "og:title", content: "Catering & Group Orders | TTOP Chicken" },
      { property: "og:description", content: "Bentos, chicken pots and Taiwanese street snacks for your team or event." },
      { property: "og:url", content: "/catering" },
    ],
    links: [{ rel: "canonical", href: "/catering" }],
  }),
});

function CateringPage() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-8 lg:py-28">
          <div className="flex items-center justify-center gap-3">
            <RuleRedBlue className="w-14" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ca3134]">Catering & Groups</span>
            <RuleRedBlue className="w-14" />
          </div>
          <h1 className="mt-6 font-display text-5xl leading-[1.02] text-[#1d418f] md:text-6xl lg:text-7xl">
            Catering &<br />
            <em className="italic text-[#ca3134]">Group Orders</em>
          </h1>
          <p className="mt-4 font-display italic text-lg tracking-wider text-[#1d418f]/70">
            One week's notice for large parties.
          </p>
          <p className="mt-8 text-lg text-[#17233f]/85">
            Bentos, chicken pots and Taiwanese street snacks for your team or
            event. Companies and groups welcome — for large orders, please
            give us one week's notice.
          </p>
        </div>
      </section>

      <Section tone="cream">
        <SectionHead eyebrow="Two ways to order" title="How it works" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border border-[#1d418f]/20 bg-white p-8">
            <CodeChip tone="blue" size="lg">01</CodeChip>
            <h3 className="mt-4 font-display text-2xl text-[#1d418f]">Smaller group orders</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#17233f]/85">
              For a small team or a lunch drop, order straight through Order
              Online — the same ChatChefs system we use every day, with pickup
              and delivery. Browse the{" "}
              <Link to="/menu" className="text-[#ca3134] underline">full menu</Link>{" "}first if you want to plan.
            </p>
            <div className="mt-6"><OrderButton /></div>
          </div>
          <div className="border border-[#1d418f]/20 bg-white p-8">
            <CodeChip tone="blue" size="lg">02</CodeChip>
            <h3 className="mt-4 font-display text-2xl text-[#1d418f]">Large or custom orders</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#17233f]/85">
              For a bigger group or an event, please contact us at least one
              week ahead and we'll plan it with you — quantities, timing,
              packaging and pickup.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#inquiry" className="inline-flex items-center rounded-sm bg-[#ca3134] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#a5262a]">Send an Inquiry</a>
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center rounded-sm border border-[#1d418f] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-[#1d418f] hover:bg-[#1d418f] hover:text-white">Call {PHONE}</a>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white" id="inquiry">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div>
            <SectionHead eyebrow="Send an inquiry" title="Catering Inquiry" />
            <p className="text-sm leading-relaxed text-[#17233f]/85">
              Submit your details and TTOP will respond to confirm available
              dishes, quantities, pickup or delivery, and pricing.
            </p>
            <p className="mt-4 rounded-sm border-l-4 border-[#ca3134] bg-[#faf6ef] p-4 text-sm text-[#17233f]/85">
              For large orders, please give us <strong>one week's notice</strong>.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <div><span className="text-xs font-bold uppercase tracking-widest text-[#1d418f]">Phone</span> <a href={`tel:${PHONE_TEL}`} className="ml-2 text-[#17233f]/85 hover:text-[#ca3134]">{PHONE}</a></div>
              <div><span className="text-xs font-bold uppercase tracking-widest text-[#1d418f]">Email</span> <a href={`mailto:${EMAIL}`} className="ml-2 text-[#17233f]/85 hover:text-[#ca3134]">{EMAIL}</a></div>
            </div>
          </div>
          <div className="border border-[#1d418f]/20 bg-white p-6 md:p-8">
            <InquiryForm
              twoColumn
              fields={[
                { name: "name", label: "Full Name", required: true },
                { name: "organization", label: "Organization or Company" },
                { name: "email", label: "Email Address", type: "email", required: true },
                { name: "phone", label: "Phone Number", type: "tel", required: true },
                { name: "eventDate", label: "Event Date", type: "date", required: true },
                { name: "guests", label: "Estimated Number of Guests", type: "number", required: true },
                { name: "fulfillment", label: "Preferred Pickup or Delivery", type: "select", options: ["Pickup", "Delivery"] },
                { name: "mealType", label: "Type of Meal or Event" },
                { name: "dietary", label: "Dietary Requirements", full: true },
                { name: "details", label: "Additional Details", type: "textarea", required: true },
              ]}
              submitLabel="Send Catering Inquiry"
            />
          </div>
        </div>
      </Section>
    </>
  );
}