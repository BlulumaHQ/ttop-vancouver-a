import { useState } from "react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "number";
  required?: boolean;
  options?: string[];
};

export function InquiryForm({
  fields,
  submitLabel = "Send Inquiry",
  successMessage = "Thanks — we'll be in touch shortly.",
}: {
  fields: Field[];
  submitLabel?: string;
  successMessage?: string;
}) {
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-4"
    >
      {fields.map((f) => (
        <label key={f.name} className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-[#1d418f]">
            {f.label}{f.required && <span className="text-[#ca3134]"> *</span>}
          </span>
          {f.type === "textarea" ? (
            <textarea
              name={f.name}
              required={f.required}
              rows={4}
              className="w-full rounded-sm border border-[#1d418f]/40 bg-white px-3 py-2.5 text-sm text-[#17233f] focus:border-[#1d418f] focus:outline-none focus:ring-1 focus:ring-[#1d418f]"
            />
          ) : f.type === "select" ? (
            <select
              name={f.name}
              required={f.required}
              className="w-full rounded-sm border border-[#1d418f]/40 bg-white px-3 py-2.5 text-sm text-[#17233f] focus:border-[#1d418f] focus:outline-none focus:ring-1 focus:ring-[#1d418f]"
              defaultValue=""
            >
              <option value="" disabled>Select…</option>
              {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input
              type={f.type ?? "text"}
              name={f.name}
              required={f.required}
              className="w-full rounded-sm border border-[#1d418f]/40 bg-white px-3 py-2.5 text-sm text-[#17233f] focus:border-[#1d418f] focus:outline-none focus:ring-1 focus:ring-[#1d418f]"
            />
          )}
        </label>
      ))}
      <button
        type="submit"
        disabled={sent}
        className="mt-2 inline-flex justify-center rounded-sm bg-[#ca3134] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#a5262a] disabled:opacity-60"
      >
        {sent ? "Sent ✓" : submitLabel}
      </button>
      {sent && (
        <div className="rounded-sm border-l-4 border-[#1d418f] bg-[#faf6ef] p-4 text-sm text-[#17233f]/85">
          {successMessage} <span className="italic text-[#17233f]/60">(Front-end demo — no message was actually sent.)</span>
        </div>
      )}
    </form>
  );
}