import { useEffect, useId, useRef, useState } from "react";
import { BENTO_ADDONS } from "@/lib/menu-data";

export function BentoAddOns() {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const place = () => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const width = Math.min(320, window.innerWidth - 24);
    const height = Math.min(340, window.innerHeight - 24);
    let left = r.left + r.width / 2 - width / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - width - 12));
    let top = r.bottom + 8;
    if (top + height > window.innerHeight - 12) top = Math.max(12, r.top - height - 8);
    setPos({ top, left });
  };

  const show = () => {
    place();
    setOpen(true);
  };
  const hide = () => {
    if (!pinned) setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPinned(false);
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setPinned(false);
      setOpen(false);
    };
    const onScroll = () => place();
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={() => {
          if (open && pinned) {
            setPinned(false);
            setOpen(false);
          } else {
            setPinned(true);
            show();
          }
        }}
        className="inline-flex shrink-0 items-center rounded-sm border border-[#1d418f]/25 bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1d418f] transition-colors hover:bg-[#1d418f] hover:text-white"
      >
        + Add-ons
      </button>

      {open && pos && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-label="Bento add-ons"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={hide}
          style={{
            top: pos.top,
            left: pos.left,
            width: "min(320px, calc(100vw - 24px))",
          }}
          className="fixed z-[80] max-h-[340px] overflow-auto rounded-md border border-[#1d418f]/20 bg-white p-4 text-left shadow-[6px_6px_0_0_rgba(29,65,143,0.15)]"
        >
          {BENTO_ADDONS.map((b) => (
            <div key={b.label} className="mb-3 last:mb-0">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#ca3134]">
                {b.label}
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-[#17233f]/80">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}