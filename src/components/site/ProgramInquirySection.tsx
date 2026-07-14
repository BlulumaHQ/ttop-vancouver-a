import { Section, SectionHead } from "./Section";
import { InquiryForm } from "./InquiryForm";
import { PHONE, PHONE_TEL, EMAIL } from "@/lib/site";

type ProgramType = "school" | "montessori";

const PROGRAM_OPTIONS = [
  "School Hot Lunch Program",
  "Montessori Daily Meals",
  "Other / Not sure yet",
];

export function ProgramInquirySection({ defaultProgram }: { defaultProgram: ProgramType }) {
  const defaultValue =
    defaultProgram === "school" ? "School Hot Lunch Program" : "Montessori Daily Meals";

  return (
    <Section tone="white" id="inquiry">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <SectionHead
            eyebrow="Contact us"
            title="Discuss a Meal Program for Your School or Centre"
          />
          <p className="text-sm leading-relaxed text-[#17233f]/85">
            Tell us about your school or centre and we'll get back to you to
            plan the details.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1d418f]">Phone</span>{" "}
              <a href={`tel:${PHONE_TEL}`} className="ml-2 text-[#17233f]/85 hover:text-[#ca3134]">
                {PHONE}
              </a>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1d418f]">Email</span>{" "}
              <a href={`mailto:${EMAIL}`} className="ml-2 text-[#17233f]/85 hover:text-[#ca3134]">
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
        <div className="border border-[#1d418f]/20 bg-white p-6 md:p-8">
          <InquiryForm
            fields={[
              { name: "contact", label: "Contact Name", required: true },
              { name: "school", label: "School / Centre Name", required: true },
              { name: "email", label: "Email Address", type: "email", required: true },
              { name: "phone", label: "Phone Number", type: "tel" },
              {
                name: "program",
                label: "Program Type",
                type: "select",
                required: true,
                options: PROGRAM_OPTIONS,
                defaultValue,
              },
              {
                name: "frequency",
                label: "Preferred Service Frequency",
                type: "select",
                required: true,
                options: ["Daily", "Weekly", "Monthly", "Seasonal"],
              },
              {
                name: "count",
                label: "Approx. Number of Students / Children",
                type: "number",
              },
              { name: "message", label: "Message", type: "textarea" },
            ]}
            submitLabel="Send Program Inquiry"
          />
        </div>
      </div>
    </Section>
  );
}