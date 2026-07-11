import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ADDRESS, EMAIL, FB_URL, HOURS, IG_URL, MAP_URL, PHONE, PHONE_TEL,
} from "@/lib/site";
import { OrderButton } from "./OrderButton";
import { DeliveryStrip } from "./DeliveryStrip";

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

      {/* Compact top: brand + call-to-order on mobile */}
      <div className="mx-auto max-w-7xl px-5 pb-2 pt-10 lg:px-8 lg:pt-14">
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <Link to="/" aria-label="TTOP Chicken — home" className="inline-flex items-center gap-3">
            <img
              src="/images/ttop-mascot.png"
              alt=""
              aria-hidden="true"
              className="h-11 w-auto"
            />
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

      {/* Mobile: accordions. Desktop: 3-col grid */}
      <div className="mx-auto max-w-7xl px-5 py-6 md:grid md:grid-cols-3 md:gap-10 md:py-10 lg:px-8">
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

        <MobileAccordion title="Explore">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/80 md:grid-cols-1">
            <li><Link to="/menu" className="hover:text-white">Menu</Link></li>
            <li><Link to="/frozen-foods" className="hover:text-white">Frozen Foods</Link></li>
            <li><Link to="/school-lunch" className="hover:text-white">School Lunch</Link></li>
            <li><Link to="/montessori" className="hover:text-white">Montessori</Link></li>
            <li><Link to="/catering" className="hover:text-white">Catering</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </MobileAccordion>

        <MobileAccordion title="Follow">
          <div className="flex gap-3">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/30 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-[#1d418f]"
            >
              Instagram
            </a>
            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/30 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-[#1d418f]"
            >
              Facebook
            </a>
          </div>
        </MobileAccordion>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-5 py-4 text-center text-[11px] text-white/70 lg:px-8">
          © 2026 TTOP Chicken. All rights reserved. · Web by{" "}
          <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Bluluma</a>{" "}
          · Powered by{" "}
          <a href="https://swiftlift.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">SwiftLift</a>
        </div>
      </div>
    </footer>
  );
}