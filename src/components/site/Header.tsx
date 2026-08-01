import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { OrderButton } from "./OrderButton";

type Item = { to: string; hash?: string; label: string };
type Group = { id: string; label: string; items: Item[] };

const GROUPS: Group[] = [
  {
    id: "menu",
    label: "Menu",
    items: [
      { to: "/menu", label: "Full Menu" },
      { to: "/chuchu-bar", label: "ChuChu Bar" },
    ],
  },
  {
    id: "shop",
    label: "Shop",
    items: [
      { to: "/frozen-foods", label: "Formosa Chef-Pacs" },
      { to: "/frozen-foods", hash: "prep-pacs", label: "Formosa Prep-Pacs" },
    ],
  },
  {
    id: "programs",
    label: "Programs",
    items: [
      { to: "/school-lunch", label: "School Hot Lunch" },
      { to: "/montessori", label: "Montessori Meals" },
      { to: "/catering", label: "Catering & Groups" },
    ],
  },
];

const PLAIN: Item[] = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function DesktopGroup({
  group,
  openId,
  setOpenId,
  pathname,
}: {
  group: Group;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  pathname: string;
}) {
  const open = openId === group.id;
  const active = group.items.some((i) => i.to === pathname);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenId(null), 120);
  };
  useEffect(() => () => cancelClose(), []);

  const focusItem = (idx: number) => {
    const nodes = wrapRef.current?.querySelectorAll<HTMLAnchorElement>("a[data-dd-item]");
    if (!nodes || nodes.length === 0) return;
    const i = (idx + nodes.length) % nodes.length;
    nodes[i]?.focus();
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpenId(group.id);
      }}
      onMouseLeave={scheduleClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpenId(null);
          btnRef.current?.focus();
        }
      }}
    >
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={`dd-${group.id}`}
        onClick={() => setOpenId(open ? null : group.id)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpenId(group.id);
            setTimeout(() => focusItem(0), 0);
          }
        }}
        className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:text-[#1d418f] ${
          active ? "text-[#1d418f]" : "text-[#17233f]"
        }`}
      >
        <span className="relative whitespace-nowrap">
          {group.label}
          {active && (
            <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#ca3134]" />
          )}
        </span>
        <Chevron open={open} />
      </button>

      {/* hover-tolerance bridge */}
      {open && <div className="absolute left-0 top-full h-3 w-full" />}

      {open && (
        <ul
          id={`dd-${group.id}`}
          className="absolute left-0 top-[calc(100%+8px)] z-50 min-w-[240px] rounded-sm border border-[#1d418f]/15 bg-white py-2 shadow-[0_12px_30px_-12px_rgba(29,65,143,0.35)]"
        >
          {group.items.map((c, idx) => (
            <li key={c.label}>
              <Link
                data-dd-item
                to={c.to}
                hash={c.hash}
                aria-current={
                  pathname === c.to && !c.hash ? "page" : undefined
                }
                onClick={() => setOpenId(null)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    focusItem(idx + 1);
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    focusItem(idx - 1);
                  }
                }}
                className="block whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-[#17233f] hover:bg-[#faf6ef] hover:text-[#1d418f]"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MobileAccordion({
  group,
  open,
  onToggle,
}: {
  group: Group;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#1d418f]/10">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`m-${group.id}`}
        onClick={onToggle}
        className="flex min-h-[52px] w-full items-center justify-between py-3 text-left"
      >
        <span className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-[#17233f]">
          {group.label}
        </span>
        <span className="text-[#1d418f]">
          <Chevron open={open} />
        </span>
      </button>
      {open && (
        <ul id={`m-${group.id}`} className="pb-2">
          {group.items.map((c) => (
            <li key={c.label}>
              <Link
                to={c.to}
                hash={c.hash}
                className="flex min-h-[44px] items-center pl-4 text-sm font-semibold text-[#1d418f]"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [acc, setAcc] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
    setOpenId(null);
    setAcc(null);
  }, [pathname]);

  // click outside closes desktop dropdown
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!openId) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenId(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openId]);

  // body scroll lock + focus trap for mobile panel
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (f.length === 0) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = useCallback((to: string) => pathname === to, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1d418f]/15 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between gap-4 px-5 lg:h-[96px] lg:px-8">
        <Link to="/" aria-label="TTOP Chicken — home" className="flex items-center gap-2">
          <img
            src="/images/ttop-logo-full.png"
            alt="TTOP Chicken"
            className="h-14 w-auto sm:h-16 lg:h-[68px]"
            width={500}
            height={500}
          />
        </Link>

        <nav ref={navRef} className="hidden items-center gap-1 min-[1100px]:flex">
          {GROUPS.map((g) => (
            <DesktopGroup
              key={g.id}
              group={g}
              openId={openId}
              setOpenId={setOpenId}
              pathname={pathname}
            />
          ))}
          {PLAIN.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`relative whitespace-nowrap px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:text-[#1d418f] ${
                isActive(item.to) ? "text-[#1d418f]" : "text-[#17233f]"
              }`}
            >
              <span className="relative">
                {item.label}
                {isActive(item.to) && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#ca3134]" />
                )}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <OrderButton size="sm" className="!px-3 sm:!px-4">
            <span className="sm:hidden">Order</span>
            <span className="hidden sm:inline">Order Online</span>
          </OrderButton>
          <button
            ref={burgerRef}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="ml-1 grid h-10 w-10 place-items-center rounded-sm border border-[#1d418f]/25 text-[#1d418f] transition-colors hover:bg-[#1d418f] hover:text-white min-[1100px]:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-xl leading-none">{open ? "✕" : "≡"}</span>
          </button>
        </div>
      </div>

      {open && mounted && createPortal(
        <div
          ref={panelRef}
          className="fixed inset-0 z-[100] flex flex-col bg-white min-[1100px]:hidden"
        >
          <div className="flex h-[88px] shrink-0 items-center justify-between border-b border-[#1d418f]/15 px-5">
            <Link to="/" aria-label="TTOP Chicken — home" onClick={() => setOpen(false)}>
              <img src="/images/ttop-logo-full.png" alt="TTOP Chicken" className="h-14 w-auto" />
            </Link>
            <button
              aria-label="Close menu"
              onClick={() => {
                setOpen(false);
                burgerRef.current?.focus();
              }}
              className="grid h-11 w-11 place-items-center rounded-sm border border-[#1d418f]/25 text-xl leading-none text-[#1d418f]"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-2">
            {GROUPS.map((g) => (
              <MobileAccordion
                key={g.id}
                group={g}
                open={acc === g.id}
                onToggle={() => setAcc(acc === g.id ? null : g.id)}
              />
            ))}
            {PLAIN.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex min-h-[52px] items-center border-b border-[#1d418f]/10 text-sm font-bold uppercase tracking-wide text-[#17233f]"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-[#1d418f]/15 px-5 py-4">
            <OrderButton size="lg" className="w-full justify-center" />
          </div>
        </div>,
        document.body,
      )}
    </header>
  );
}
