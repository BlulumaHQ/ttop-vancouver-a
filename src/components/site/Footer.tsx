import { Link } from "@tanstack/react-router";
import {
  ADDRESS, EMAIL, FB_URL, HOURS, IG_URL, MAP_URL, PHONE, PHONE_TEL,
} from "@/lib/site";
import { OrderButton } from "./OrderButton";

export function Footer() {
  return (
    <footer className="bg-[#1d418f] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-black">TTOP</span>
            <span className="font-display italic text-base tracking-wider text-[#ffb6b6]">
              Chicken
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-white/70">
            Taiwan Taipei Original Pot — authentic Taiwanese bentos, chicken pot
            and street snacks in the heart of Food Street, Richmond.
          </p>
          <div className="mt-5">
            <OrderButton size="sm" />
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">Visit</h4>
          <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="block text-sm text-white/80 hover:text-white">
            {ADDRESS}
          </a>
          <p className="mt-2 text-sm text-white/70">{HOURS}</p>
          <a href={`tel:${PHONE_TEL}`} className="mt-2 block text-sm text-white/80 hover:text-white">{PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="block text-sm text-white/80 hover:text-white">{EMAIL}</a>
        </div>

        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">Explore</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/menu" className="hover:text-white">Menu</Link></li>
            <li><Link to="/frozen-foods" className="hover:text-white">Frozen Foods</Link></li>
            <li><Link to="/school-lunch" className="hover:text-white">School Hot Lunch</Link></li>
            <li><Link to="/montessori" className="hover:text-white">Montessori Daily Meals</Link></li>
            <li><Link to="/catering" className="hover:text-white">Catering & Group Orders</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">Follow</h4>
          <div className="flex gap-3">
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-white/30 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-[#1d418f]">Instagram</a>
            <a href={FB_URL} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-white/30 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-[#1d418f]">Facebook</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-white/70 lg:px-8">
          © 2026 TTOP Chicken. All rights reserved. | Web Design by{" "}
          <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Bluluma</a>{" "}
          | Powered by{" "}
          <a href="https://swiftlift.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">SwiftLift</a>
        </div>
      </div>
    </footer>
  );
}