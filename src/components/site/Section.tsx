import { CodeChip, RuleRedBlue } from "./CodeChip";

export function Section({
  tone = "white",
  children,
  className = "",
  id,
}: {
  tone?: "white" | "cream" | "blue";
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const bg =
    tone === "cream"
      ? "bg-[#faf6ef]"
      : tone === "blue"
      ? "bg-[#1d418f] text-white"
      : "bg-white";
  return (
    <section id={id} className={`${bg} ${className}`}>
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  chineseTitle,
  chip,
  onDark = false,
}: {
  eyebrow?: string;
  title: string;
  chineseTitle?: string;
  chip?: string;
  onDark?: boolean;
}) {
  // chineseTitle is accepted for backward compatibility but no longer rendered —
  // the site is English-primary. A serif italic red accent below the eyebrow
  // preserves the red/blue visual variety.
  void chineseTitle;
  return (
    <div className="mb-10 max-w-3xl">
      <div className="mb-4 flex items-center gap-3">
        {chip && <CodeChip tone={onDark ? "white" : "blue"} size="md">{chip}</CodeChip>}
        {eyebrow && (
          <span className={`text-xs font-bold uppercase tracking-[0.25em] ${onDark ? "text-white/70" : "text-[#ca3134]"}`}>
            {eyebrow}
          </span>
        )}
      </div>
      <h2 className={`font-display text-4xl leading-[1.05] md:text-5xl ${onDark ? "text-white" : "text-[#1d418f]"}`}>
        {title}
      </h2>
      <RuleRedBlue className="mt-6 max-w-[220px]" />
    </div>
  );
}