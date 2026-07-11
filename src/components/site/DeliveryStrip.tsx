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
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10">
          {PARTNERS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order TTOP Chicken on ${p.name}`}
              className="grid h-10 place-items-center opacity-90 transition-opacity hover:opacity-100"
            >
              <img
                src={p.src}
                alt={`${p.name} logo`}
                className="h-10 w-auto object-contain"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}