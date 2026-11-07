import { useSiteLanguage, LocalizedText } from "@/lib/i18n";

const PARTNERS = [
  {
    name: "DoorDash",
    src: "/images/delivery/doordash.png",
    href: "https://www.doordash.com/store/ttop-%E8%8A%B1%E9%9B%95%E9%9B%9E-richmond-27547541/30803547/",
  },
  {
    name: "Uber Eats",
    src: "/images/delivery/ubereats.png",
    href: "https://www.ubereats.com/ca/store/ttop-%E8%8A%B1%E9%9B%95%E9%9B%9E-taiwan-taipei-original-pot/IPPBfU8PVayIuoqrmo3oBA?diningMode=DELIVERY&surfaceName=",
  },
  {
    name: "Fantuan",
    src: "/images/delivery/fantuan.png",
    href: "https://www.fantuanorder.com/zh-CN/store/ttop-taiwan-taipei-original-pot/ca-1216448102",
  },
];

export function DeliveryStrip({
  tone = "cream",
}: {
  tone?: "cream" | "white" | "blue";
}) {
  const { t, href } = useSiteLanguage();
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
        ><LocalizedText value={" Also on your favourite apps "} /></p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <LocalizedText value={PARTNERS.map((p) => (
            <a
              key={p.name}
              href={href(p.href)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(`Order TTOP Chicken on ${p.name}`)}
              className="grid h-12 w-12 place-items-center transition-transform duration-200 hover:-translate-y-0.5 sm:h-14 sm:w-14"
            >
              <img
                src={p.src}
                alt={t(`${p.name} logo`)}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </a>
          ))} />
        </div>
      </div>
    </section>
  );
}