const PARTNERS = [
  { name: "DoorDash", src: "/images/delivery/doordash.png", href: "https://www.doordash.com" },
  { name: "Uber Eats", src: "/images/delivery/ubereats.png", href: "https://www.ubereats.com" },
  { name: "Fantuan", src: "/images/delivery/fantuan.jpg", href: "https://fantuanorder.com" },
];

export function DeliveryStrip({
  tone = "cream",
}: {
  tone?: "cream" | "white" | "blue";
}) {
  const bg =
    tone === "blue"
      ? "bg-[#1d418f] text-white"
      : tone === "white"
        ? "bg-white text-[#17233f]"
        : "bg-[#faf6ef] text-[#17233f]";
  const labelColor = tone === "blue" ? "text-white/70" : "text-[#1d418f]/70";
  return (
    <section className={`${bg} border-y border-[#1d418f]/15`}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 py-8 sm:flex-row sm:justify-between lg:px-8">
        <p
          className={`text-[11px] font-bold uppercase tracking-[0.28em] ${labelColor}`}
        >
          Also on your favourite apps
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {PARTNERS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order TTOP Chicken on ${p.name}`}
              className="group grid h-12 w-32 place-items-center rounded-full bg-white px-4 shadow-[0_1px_0_rgba(0,0,0,0.04),0_4px_12px_rgba(29,65,143,0.08)] ring-1 ring-[#1d418f]/10 transition-all hover:-translate-y-0.5 hover:shadow-[0_2px_0_rgba(0,0,0,0.05),0_8px_18px_rgba(29,65,143,0.15)] sm:h-14 sm:w-36"
            >
              <img
                src={p.src}
                alt={`${p.name} logo`}
                className="max-h-7 w-auto max-w-full object-contain sm:max-h-8"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}