import { useEffect, useRef, useState } from "react";
import { CodeChip } from "./CodeChip";

type PrintedMenu = {
  id: string;
  title: string;
  chinese: string;
  accent: "red" | "blue";
  front: string;
  frontLabel: string;
  back: string;
  backLabel: string;
};

const MENUS: PrintedMenu[] = [
  {
    id: "food",
    title: "Food Menu",
    chinese: "餐點菜單",
    accent: "red",
    front: "/images/menu-red-front.jpg",
    frontLabel: "Signature Pot",
    back: "/images/menu-red-back.jpg",
    backLabel: "Bento & Rice Bowls",
  },
  {
    id: "drinks",
    title: "Drinks & Frozen Menu",
    chinese: "飲品與冷凍菜單",
    accent: "blue",
    front: "/images/menu-blue-front.jpg",
    frontLabel: "À La Carte & Side Dish",
    back: "/images/menu-blue-back.jpg",
    backLabel: "Drinks & Frozen",
  },
];

export function PrintedMenuViewer() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [side, setSide] = useState<"front" | "back">("front");
  const [zoom, setZoom] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowLeft") setSide("front");
      if (e.key === "ArrowRight") setSide("back");
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx]);

  const open = (i: number) => {
    setSide("front");
    setZoom(false);
    setOpenIdx(i);
  };

  const current = openIdx !== null ? MENUS[openIdx] : null;
  const img = current ? (side === "front" ? current.front : current.back) : "";
  const imgLabel = current ? (side === "front" ? current.frontLabel : current.backLabel) : "";

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {MENUS.map((m, i) => (
          <button
            key={m.id}
            type="button"
            onClick={() => open(i)}
            className="group flex flex-col overflow-hidden border border-[#1d418f]/20 bg-white text-left transition-shadow hover:shadow-[4px_4px_0_0_#1d418f]"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#faf6ef]">
              <img
                src={m.front}
                alt={`${m.title} — front cover`}
                loading="lazy"
                className="block h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
              />
              <div className="absolute left-2 top-2">
                <CodeChip tone={m.accent} size="sm">
                  {m.accent === "red" ? "R" : "B"}
                </CodeChip>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <h3 className={`font-display text-xl leading-tight ${m.accent === "red" ? "text-[#ca3134]" : "text-[#1d418f]"}`}>
                  {m.title}
                </h3>
                <p className="mt-0.5 text-xs italic text-[#17233f]/60">{m.chinese}</p>
              </div>
              <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-[#ca3134]">
                View →
              </span>
            </div>
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} — ${imgLabel}`}
          className="fixed inset-0 z-[100] flex flex-col bg-black/90"
          onClick={() => setOpenIdx(null)}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 text-white sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <div className="font-display text-base sm:text-lg">
                {current.title} <span className="text-white/60 italic">{current.chinese}</span>
              </div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-white/60">
                {imgLabel}
              </div>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpenIdx(null)}
              className="grid h-10 w-10 place-items-center rounded-sm border border-white/40 text-xl text-white hover:bg-white hover:text-[#1d418f]"
            >
              ✕
            </button>
          </div>

          {/* Image area */}
          <div
            className="relative flex-1 overflow-auto"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              touchStart.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStart.current == null) return;
              const dx = e.changedTouches[0].clientX - touchStart.current;
              touchStart.current = null;
              if (Math.abs(dx) < 40) return;
              setSide(dx < 0 ? "back" : "front");
              setZoom(false);
            }}
          >
            {/* Prev/Next arrows */}
            <button
              type="button"
              aria-label="Front"
              onClick={(e) => { e.stopPropagation(); setSide("front"); setZoom(false); }}
              className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-sm border border-white/40 bg-black/40 px-3 py-2 text-sm text-white hover:bg-white hover:text-[#1d418f] sm:block"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Back"
              onClick={(e) => { e.stopPropagation(); setSide("back"); setZoom(false); }}
              className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-sm border border-white/40 bg-black/40 px-3 py-2 text-sm text-white hover:bg-white hover:text-[#1d418f] sm:block"
            >
              →
            </button>

            <div className="flex min-h-full items-start justify-center p-4">
              <img
                src={img}
                alt={`${current.title} — ${imgLabel}`}
                onClick={() => setZoom((z) => !z)}
                className={`select-none transition-transform duration-200 ${
                  zoom
                    ? "max-w-none cursor-zoom-out scale-[1.6] origin-top"
                    : "max-h-[85vh] w-auto max-w-full cursor-zoom-in"
                }`}
                draggable={false}
              />
            </div>
          </div>

          {/* Bottom Front/Back toggle */}
          <div
            className="flex items-center justify-center gap-2 border-t border-white/10 px-4 py-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => { setSide("front"); setZoom(false); }}
              className={`min-w-[90px] rounded-sm px-4 py-2 text-xs font-bold uppercase tracking-widest ${
                side === "front"
                  ? "bg-white text-[#1d418f]"
                  : "border border-white/40 text-white hover:bg-white/10"
              }`}
            >
              Front
            </button>
            <button
              type="button"
              onClick={() => { setSide("back"); setZoom(false); }}
              className={`min-w-[90px] rounded-sm px-4 py-2 text-xs font-bold uppercase tracking-widest ${
                side === "back"
                  ? "bg-white text-[#1d418f]"
                  : "border border-white/40 text-white hover:bg-white/10"
              }`}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </>
  );
}