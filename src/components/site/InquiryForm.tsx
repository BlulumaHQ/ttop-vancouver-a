import { useSiteLanguage, LocalizedText } from "@/lib/i18n";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { inquiryMessages, inquirySchema, type InquiryType } from "@/lib/inquiry";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "number" | "date";
  required?: boolean;
  options?: string[];
  defaultValue?: string;
  full?: boolean;
};

export function InquiryForm({
  formType,
  fields,
  submitLabel = "Send Inquiry",
  successMessage = "Thanks — we'll be in touch shortly.",
  twoColumn = false,
}: {
  formType: InquiryType;
  fields: Field[];
  submitLabel?: string;
  successMessage?: string;
  twoColumn?: boolean;
}) {
  const { locale } = useSiteLanguage();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef(false);
  const attempt = useRef<{ fingerprint: string; id: string } | null>(null);
  const messages = inquiryMessages[locale];
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (pending.current || sent) return;
        const values = new FormData(e.currentTarget);
        const submitted = Object.fromEntries(fields.map((f) => [f.name, String(values.get(f.name) ?? "")]));
        const fingerprint = JSON.stringify(submitted);
        if (attempt.current?.fingerprint !== fingerprint) attempt.current = { fingerprint, id: crypto.randomUUID() };
        const input = { formType, locale, fields: submitted, submissionId: attempt.current?.id, website: String(values.get("website") ?? "") };
        const parsed = inquirySchema.safeParse(input);
        if (!parsed.success) { setError(messages.invalid); return; }
        pending.current = true;
        setLoading(true);
        setError("");
        try {
          const response = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
          const result = await response.json();
          if (response.ok && result.ok === true && result.code === "sent") setSent(true);
          else setError(response.status === 429 ? messages.limited : response.status === 400 || response.status === 413 ? messages.invalid : messages.error);
        } catch { setError(messages.error); }
        finally { pending.current = false; setLoading(false); }
      }}
      aria-busy={loading}
      className={twoColumn ? "grid gap-4 md:grid-cols-2" : "grid gap-4"}
    >
      <div className="hidden" aria-hidden="true">
        <label>Website<input name="website" autoComplete="off" tabIndex={-1} maxLength={200} /></label>
      </div>
      <LocalizedText value={fields.map((f) => (
        <label key={f.name} className={`block ${twoColumn && (f.full || f.type === "textarea") ? "md:col-span-2" : ""}`}>
          <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-[#1d418f]">
            <LocalizedText value={f.label} /><LocalizedText value={f.required && <span className="text-[#ca3134]"><LocalizedText value={" *"} /></span>} />
          </span>
          <LocalizedText value={f.type === "textarea" ? (
            <textarea
              name={f.name}
              required={f.required}
              rows={4}
              maxLength={5000}
              defaultValue={f.defaultValue}
              className="w-full rounded-sm border border-[#1d418f]/40 bg-white px-3 py-2.5 text-sm text-[#17233f] focus:border-[#1d418f] focus:outline-none focus:ring-1 focus:ring-[#1d418f]"
            />
          ) : f.type === "select" ? (
            <select
              name={f.name}
              required={f.required}
              className="w-full rounded-sm border border-[#1d418f]/40 bg-white px-3 py-2.5 text-sm text-[#17233f] focus:border-[#1d418f] focus:outline-none focus:ring-1 focus:ring-[#1d418f]"
              defaultValue={f.defaultValue ?? ""}
            >
              <LocalizedText value={!f.defaultValue && <option value="" disabled><LocalizedText value={"Select…"} /></option>} />
              <LocalizedText value={f.options?.map((o) => <option key={o} value={o}><LocalizedText value={o} /></option>)} />
            </select>
          ) : (
            <input
              type={f.type ?? "text"}
              maxLength={f.type === "tel" ? 40 : f.type === "email" ? 254 : f.name === "name" || f.name === "contact" ? 100 : f.name === "dietary" ? 1000 : 200}
              min={f.type === "number" ? 1 : undefined}
              max={f.type === "number" ? 999999 : undefined}
              step={f.type === "number" ? 1 : undefined}
              name={f.name}
              required={f.required}
              defaultValue={f.defaultValue}
              className="w-full rounded-sm border border-[#1d418f]/40 bg-white px-3 py-2.5 text-sm text-[#17233f] focus:border-[#1d418f] focus:outline-none focus:ring-1 focus:ring-[#1d418f]"
            />
          )} />
        </label>
      ))} />
      <div className={twoColumn ? "md:col-span-2" : ""}>
        <Button
          type="submit"
          disabled={sent || loading}
          variant="destructive"
          className="mt-2 h-auto whitespace-normal rounded-sm bg-brand-red px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-none hover:bg-brand-red-dark disabled:opacity-60"
        >
          {loading ? messages.loading : <LocalizedText value={sent ? "Sent ✓" : submitLabel} />}
        </Button>
        {error && <p role="alert" className="mt-4 text-sm text-brand-red">{error}</p>}
        <LocalizedText value={sent && (
          <div role="status" className="mt-4 rounded-sm border-l-4 border-brand-blue bg-cream p-4 text-sm text-foreground/85">
            <LocalizedText value={successMessage} />
          </div>
        )} />
      </div>
    </form>
  );
}