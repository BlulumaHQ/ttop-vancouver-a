import { useEffect, useRef, useState } from "react";

const PAGES = [
  "/images/frozen-catalogue-01.jpg",
  "/images/frozen-catalogue-02.jpg",
  "/images/frozen-catalogue-03.jpg",
];

export function CatalogueViewer() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowLeft") setOpenIdx((i) => (i === null ? i : (i + PAGES.length - 1) % PAGES.length));
      if (e.key === "ArrowRight") setOpenIdx((i) => (i === null ? i : (i + 1) % PAGES.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx]);

  const step = (d: number) => {
    setZoom(false);
    setOpenIdx((i) => (i === null ? i : (i + d + PAGES.length) % PAGES.length));
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {PAGES.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => {
              setZoom(false);
              setOpenIdx(i);
            }}
            className="group block overflow-hidden border border-[#1d418f]/20 bg-white transition-shadow hover:shadow-[4px_4px_0_0_#1d418f]"
            aria-label={`View TTOP Formosa Chef-Pacs catalogue, page ${i + 1}`}
          >
            <img
              src={src}
              alt={`TTOP Formosa Chef-Pacs catalogue, page ${i + 1}`}
              width={500}
              height={700}
              loading="lazy"
              className="block w-full object-cover transition-transform group-hover:scale-[1.02]"
            />
            <span className="block py-2 text-center text-[11px] font-bold uppercase tracking-widest text-[#1d418f]">
              Page {i + 1}
            </span>
          </button>
        ))}
      </div>

      {openIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`TTOP Formosa Chef-Pacs catalogue, page ${openIdx + 1}`}
          className="fixed inset-0 z-[100] flex flex-col bg-black/90"
          onClick={() => setOpenIdx(null)}
        >
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 text-white sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-display text-base sm:text-lg">
              Formosa Chef-Pacs catalogue{" "}
              <span className="text-white/60">— page {openIdx + 1} / {PAGES.length}</span>
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
              step(dx < 0 ? 1 : -1);
            }}
          >
            <button
              type="button"
              aria-label="Previous page"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-sm border border-white/40 bg-black/40 px-3 py-2 text-sm text-white hover:bg-white hover:text-[#1d418f] sm:block"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next page"
              onClick={(e) => { e.stopPropagation(); step(1); }}
              className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-sm border border-white/40 bg-black/40 px-3 py-2 text-sm text-white hover:bg-white hover:text-[#1d418f] sm:block"
            >
              →
            </button>

            <div className="flex min-h-full items-start justify-center p-4">
              <img
                src={PAGES[openIdx]}
                alt={`TTOP Formosa Chef-Pacs catalogue, page ${openIdx + 1}`}
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

          <div
            className="flex items-center justify-center gap-2 border-t border-white/10 px-4 py-3"
            onClick={(e) => e.stopPropagation()}
          >
            {PAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setZoom(false); setOpenIdx(i); }}
                className={`min-w-[80px] rounded-sm px-4 py-2 text-xs font-bold uppercase tracking-widest ${
                  i === openIdx
                    ? "bg-white text-[#1d418f]"
                    : "border border-white/40 text-white hover:bg-white/10"
                }`}
              >
                Page {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}