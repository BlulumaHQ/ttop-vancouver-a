import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ADDRESS, EMAIL, FB_URL, HOURS, IG_URL, MAP_URL, PHONE, PHONE_TEL,
} from "@/lib/site";
import { OrderButton } from "./OrderButton";
import { DeliveryStrip } from "./DeliveryStrip";
import { ORDER_URL } from "@/lib/site";

const LINK_GROUPS = [
  {
    title: "Eat",
    links: [
      { to: "/menu", label: "Full Menu" },
      { to: "/chuchu-bar", label: "ChuChu Bar" },
      { href: ORDER_URL, label: "Order Online" },
    ],
  },
  {
    title: "At Home",
    links: [
      { to: "/frozen-foods", label: "Formosa Chef-Pacs" },
      { to: "/frozen-foods", hash: "prep-pacs", label: "Formosa Prep-Pacs" },
    ],
  },
  {
    title: "Programs",
    links: [
      { to: "/school-lunch", label: "School Hot Lunch" },
      { to: "/montessori", label: "Montessori Meals" },
      { to: "/catering", label: "Catering & Groups" },
    ],
  },
] as const;

function MobileAccordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/15 md:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3 text-left md:hidden"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-white">
          {title}
        </span>
        <span className="text-lg leading-none text-[#ffb6b6]">
          {open ? "−" : "+"}
        </span>
      </button>
      <h4 className="mb-3 hidden text-xs font-bold uppercase tracking-widest text-white md:block">
        {title}
      </h4>
      <div className={`${open ? "block" : "hidden"} pb-4 md:block md:pb-0`}>
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#1d418f] text-white">
      <DeliveryStrip tone="blue" />

      {/* --- MOBILE (compact stacked + accordions) --- */}
      <div className="md:hidden">
        <div className="mx-auto max-w-7xl px-5 pb-2 pt-10">
          <div className="flex flex-col items-start gap-5">
            <Link to="/" aria-label="TTOP Chicken — home" className="inline-flex items-center gap-3">
              <img src="/images/ttop-mascot.png" alt="" aria-hidden="true" className="h-11 w-auto" />
              <span className="font-display text-2xl font-black tracking-tight">
                TTOP <span className="italic font-medium text-[#ffb6b6]">Chicken</span>
              </span>
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white hover:text-[#1d418f]"
              >
                📞 {PHONE}
              </a>
              <OrderButton size="sm" />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-5 py-6">
          <MobileAccordion title="Visit">
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-white/80 hover:text-white"
          >
            {ADDRESS}
          </a>
          <p className="mt-2 text-sm text-white/70">{HOURS}</p>
          <a href={`mailto:${EMAIL}`} className="mt-2 block text-sm text-white/80 hover:text-white">
            {EMAIL}
          </a>
          </MobileAccordion>
          {LINK_GROUPS.map((g) => (
            <MobileAccordion key={g.title} title={g.title}>
              <ul className="space-y-2 text-sm text-white/80">
                {g.links.map((l) => (
                  <li key={l.label}>
                    {"href" in l ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">{l.label}</a>
                    ) : (
                      <Link to={l.to} hash={"hash" in l ? l.hash : undefined} className="hover:text-white">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </MobileAccordion>
          ))}
          <MobileAccordion title="More">
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </MobileAccordion>
          <MobileAccordion title="Follow">
          <div className="flex gap-3">
              <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-white/30 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-[#1d418f]">Instagram</a>
              <a href={FB_URL} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-white/30 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-[#1d418f]">Facebook</a>
          </div>
          </MobileAccordion>
        </div>
      </div>

      {/* --- DESKTOP (editorial 4-column) --- */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
          <div className="grid grid-cols-12 gap-10">
            {/* Brand column */}
            <div className="col-span-12 lg:col-span-4">
              <Link to="/" aria-label="TTOP Chicken — home" className="inline-flex items-center gap-3">
                <img src="/images/ttop-mascot.png" alt="" aria-hidden="true" className="h-14 w-auto" />
                <span className="font-display text-3xl font-black tracking-tight">
                  TTOP <span className="italic font-medium text-[#ffb6b6]">Chicken</span>
                </span>
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
                Old-world Taiwanese cooking, brought to Food Street in Richmond. Chicken pots, bentos, and Formosa Chef-Pacs to take home.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#1d418f]">
                  <span aria-hidden="true">📞</span> {PHONE}
                </a>
                <OrderButton size="sm" />
              </div>
            </div>

            {/* Visit column */}
            <div className="col-span-6 lg:col-span-3">
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#ffb6b6]">Visit</h4>
              <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="block text-sm leading-relaxed text-white/85 hover:text-white">
                {ADDRESS}
              </a>
              <p className="mt-3 text-sm text-white/70">{HOURS}</p>
              <a href={`mailto:${EMAIL}`} className="mt-3 block text-sm text-white/85 hover:text-white">
                {EMAIL}
              </a>
            </div>

            {/* Explore column */}
            <div className="col-span-6 lg:col-span-3">
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#ffb6b6]">Explore</h4>
              <ul className="space-y-2 text-sm text-white/85">
                <li><Link to="/menu" className="hover:text-white">Menu</Link></li>
                <li><Link to="/chuchu-bar" className="hover:text-white">ChuChu Bar</Link></li>
                <li><Link to="/frozen-foods" className="hover:text-white">Formosa Chef-Pacs</Link></li>
                <li><Link to="/school-lunch" className="hover:text-white">School Hot Lunch</Link></li>
                <li><Link to="/montessori" className="hover:text-white">Montessori Meals</Link></li>
                <li><Link to="/catering" className="hover:text-white">Catering</Link></li>
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            {/* Follow column */}
            <div className="col-span-12 lg:col-span-2">
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#ffb6b6]">Follow</h4>
              <div className="flex flex-col gap-2">
                <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/85 hover:text-white">
                  <span aria-hidden="true">◈</span> Instagram
                </a>
                <a href={FB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/85 hover:text-white">
                  <span aria-hidden="true">◈</span> Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="mt-14 h-px w-full bg-white/15" />
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-[11px] text-white/70 md:flex-row lg:px-8">
          <p>© 2026 TTOP Chicken. All rights reserved.</p>
          <p>
            Web by{" "}
            <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Bluluma</a>{" "}
            · Powered by{" "}
            <a href="https://swiftlift.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">SwiftLift</a>
          </p>
        </div>
      </div>
    </footer>
  );
}