import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { OrderButton } from "./OrderButton";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/frozen-foods", label: "Frozen Foods" },
  {
    label: "Schools & Daycares",
    children: [
      { to: "/school-lunch", label: "School Hot Lunch" },
      { to: "/montessori", label: "Montessori Daily Meals" },
    ],
  },
  { to: "/catering", label: "Catering" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
    setDdOpen(false);
  }, [pathname]);

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

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            "children" in item ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDdOpen(true)}
                onMouseLeave={() => setDdOpen(false)}
              >
                <button
                  className="px-3 py-2 text-sm font-semibold uppercase tracking-wide text-[#17233f] hover:text-[#1d418f]"
                  onClick={() => setDdOpen((v) => !v)}
                >
                  {item.label} ▾
                </button>
                {ddOpen && (
                  <div className="absolute right-0 top-full min-w-[240px] border border-[#1d418f]/15 bg-white shadow-lg">
                    {item.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        className="block px-4 py-3 text-sm text-[#17233f] hover:bg-[#faf6ef] hover:text-[#1d418f]"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-[#1d418f]" }}
                inactiveProps={{ className: "text-[#17233f]" }}
                className="px-3 py-2 text-sm font-semibold uppercase tracking-wide hover:text-[#1d418f]"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <OrderButton size="sm" className="!px-3 sm:!px-4">
            <span className="sm:hidden">Order</span>
            <span className="hidden sm:inline">Order Online</span>
          </OrderButton>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            className="ml-1 grid h-10 w-10 place-items-center rounded-sm border border-[#1d418f]/25 text-[#1d418f] transition-colors hover:bg-[#1d418f] hover:text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-xl leading-none">{open ? "✕" : "≡"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[#1d418f]/15 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl px-5 py-3">
            {NAV.map((item) =>
              "children" in item ? (
                <div key={item.label} className="py-2">
                  <div className="pb-1 text-xs font-bold uppercase tracking-widest text-[#1d418f]/60">
                    {item.label}
                  </div>
                  {item.children.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      className="block py-2 pl-3 text-sm font-semibold text-[#17233f]"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block py-2 text-sm font-semibold uppercase tracking-wide text-[#17233f]"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </nav>
      )}
    </header>
  );
}