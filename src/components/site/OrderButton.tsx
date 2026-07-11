import { ORDER_URL } from "@/lib/site";

export function OrderButton({
  className = "",
  size = "md",
  children = "Order Online",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };
  return (
    <a
      href={ORDER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-sm bg-[#ca3134] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#a5262a] ${sizes[size]} ${className}`}
    >
      <span aria-hidden="true">→</span>
      <span>{children}</span>
    </a>
  );
}

export function OutlineButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-sm border border-[#1d418f] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#1d418f] transition-colors hover:bg-[#1d418f] hover:text-white ${className}`}
    >
      {children}
    </a>
  );
}