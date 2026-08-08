import type { ReactNode } from "react";
import { CodeChip, RuleRedBlue } from "./CodeChip";
import type { MenuCategory, MenuItem } from "@/lib/menu-data";

export function accentClasses(cat: MenuCategory) {
  const isRed = cat.accent === "red";
  return {
    chip: isRed ? ("red" as const) : ("blue" as const),
    heading: isRed ? "text-[#ca3134]" : "text-[#1d418f]",
    band: isRed ? "bg-[#ca3134]" : "bg-[#1d418f]",
    price: isRed ? "text-[#ca3134]" : "text-[#1d418f]",
  };
}

export function PhotoPlaceholder({ code }: { code: string }) {
  return (
    <div
      className="grid aspect-square w-full place-items-center bg-[#faf6ef]"
      aria-hidden="true"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent 0 12px, rgba(29,65,143,0.05) 12px 24px)",
      }}
    >
      <span className="font-display text-3xl font-black tracking-wider text-[#1d418f]/25">
        {code || "TTOP"}
      </span>
    </div>
  );
}

export function PhotoCard({
  item,
  cat,
  footer,
}: {
  item: MenuItem;
  cat: MenuCategory;
  footer?: ReactNode;
}) {
  const cls = accentClasses(cat);
  return (
    <article className="group relative flex flex-col overflow-hidden border border-[#1d418f]/12 bg-white transition-shadow hover:shadow-[4px_4px_0_0_#1d418f]">
      <div className="relative">
        {item.image ? (
          <img
            src={item.image}
            alt={`${item.name} at TTOP Chicken`}
            loading="lazy"
            decoding="async"
            width={480}
            height={480}
            className="block aspect-square w-full object-cover"
          />
        ) : (
          <PhotoPlaceholder code={item.code} />
        )}
        {item.code && (
          <div className="absolute left-2 top-2">
            <CodeChip tone={cls.chip} size="sm">
              {item.code}
            </CodeChip>
          </div>
        )}
        <div className="absolute right-2 top-2 flex gap-1">
          {item.spicy && (
            <span
              className="inline-flex h-6 items-center rounded-sm bg-white/90 px-1.5 text-[10px] font-bold uppercase tracking-wider text-[#ca3134] shadow-sm"
              title="Spicy"
            >
              🌶 Spicy
            </span>
          )}
          {item.veg && (
            <span
              className="inline-flex h-6 items-center rounded-sm bg-white/90 px-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1d418f] shadow-sm"
              title="Vegetarian"
            >
              V
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="font-display text-[15px] font-semibold leading-snug text-[#17233f]">
          {item.name}
        </h3>
        {item.tagline && (
          <p className="text-[11px] italic text-[#17233f]/60">{item.tagline}</p>
        )}
        {item.note && <p className="text-[11px] text-[#17233f]/60">{item.note}</p>}
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <span className={`font-display tabular text-lg font-bold ${cls.price}`}>
            ${item.price}
          </span>
          {footer}
        </div>
      </div>
    </article>
  );
}

export function CompactRow({
  item,
  cat,
  trailing,
}: {
  item: MenuItem;
  cat: MenuCategory;
  trailing?: ReactNode;
}) {
  const cls = accentClasses(cat);
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-3 border-b border-dashed border-[#1d418f]/12 py-2.5 last:border-b-0">
      {item.code ? (
        <CodeChip tone={cls.chip} size="sm">
          {item.code}
        </CodeChip>
      ) : (
        <span className="inline-block h-1 w-1 rounded-full bg-[#1d418f]/30" />
      )}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 text-[14px] font-semibold text-[#17233f]">
          <span>
          {item.spicy && <span className="mr-1 text-[#ca3134]">🌶</span>}
          {item.veg && (
            <span className="mr-1 rounded-sm bg-[#1d418f]/10 px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#1d418f]">
              V
            </span>
          )}
          {item.name}
          </span>
          {trailing}
        </div>
        {(item.tagline || item.note) && (
          <div className="text-[11px] italic text-[#17233f]/60">
            {item.tagline}
            {item.tagline && item.note ? " · " : ""}
            {item.note}
          </div>
        )}
      </div>
      <span className={`tabular text-right text-[14px] font-bold ${cls.price}`}>
        ${item.price}
      </span>
    </div>
  );
}

export function CategoryHeader({ cat }: { cat: MenuCategory }) {
  const cls = accentClasses(cat);
  return (
    <div className="mb-6 flex items-end gap-4">
      <CodeChip tone={cls.chip} size="lg">
        {cat.letter}
      </CodeChip>
      <div className="flex-1">
        <h2 className={`font-display text-2xl leading-none md:text-3xl ${cls.heading}`}>
          {cat.title}
        </h2>
        {cat.subtitle && (
          <p className="mt-1 text-xs italic text-[#17233f]/60">{cat.subtitle}</p>
        )}
        {cat.blurb && (
          <p className="mt-2 max-w-2xl text-sm text-[#17233f]/75">{cat.blurb}</p>
        )}
      </div>
    </div>
  );
}

export function CategoryNotes({ notes }: { notes?: string[] }) {
  if (!notes?.length) return null;
  return (
    <ul className="mt-5 space-y-1.5 border-l-2 border-[#1d418f]/25 pl-4 text-xs leading-relaxed text-[#17233f]/70">
      {notes.map((n, i) => (
        <li key={i}>{n}</li>
      ))}
    </ul>
  );
}

/* Photo grid — compact, 2 cols on mobile, up to 5 on desktop */
export function PhotoGrid({
  cat,
  renderFooter,
}: {
  cat: MenuCategory;
  renderFooter?: (item: MenuItem) => ReactNode;
}) {
  return (
    <section id={cat.letter.replace("+", "")} className="scroll-mt-24">
      <CategoryHeader cat={cat} />
      <RuleRedBlue className="mb-5" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {cat.items.map((it) => (
          <PhotoCard
            key={`${cat.letter}-${it.code}-${it.name}-${it.tagline ?? ""}`}
            item={it}
            cat={cat}
            footer={renderFooter?.(it)}
          />
        ))}
      </div>
      <CategoryNotes notes={cat.notes} />
    </section>
  );
}

/* Compact list — used where photos are missing */
export function CompactList({
  cat,
  renderTrailing,
}: {
  cat: MenuCategory;
  renderTrailing?: (item: MenuItem) => ReactNode;
}) {
  return (
    <section id={cat.letter.replace("+", "")} className="scroll-mt-24">
      <CategoryHeader cat={cat} />
      <RuleRedBlue className="mb-5" />
      <div className="grid gap-x-8 gap-y-1 md:grid-cols-2">
        {cat.items.map((it, i) => (
          <CompactRow
            key={`${cat.letter}-${i}`}
            item={it}
            cat={cat}
            trailing={renderTrailing?.(it)}
          />
        ))}
      </div>
      <CategoryNotes notes={cat.notes} />
    </section>
  );
}

/* Add-on toppings — grouped columns, no photos */
export function AddOnGroups({ cat }: { cat: MenuCategory }) {
  if (!cat.groups) return null;
  return (
    <section
      id={cat.letter.replace("+", "")}
      className="scroll-mt-24 bg-[#faf6ef] p-6 md:p-10"
    >
      <CategoryHeader cat={cat} />
      <RuleRedBlue className="mb-6" />
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {cat.groups.map((g) => (
          <div key={g.label}>
            <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-wider text-[#ca3134]">
              {g.label}
            </h3>
            <div>
              {g.items.map((it, i) => (
                <CompactRow key={`${g.label}-${i}`} item={it} cat={cat} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
