export function CodeChip({
  children,
  tone = "blue",
  size = "sm",
}: {
  children: React.ReactNode;
  tone?: "blue" | "red" | "white";
  size?: "sm" | "md" | "lg";
}) {
  const tones = {
    blue: "bg-[#1d418f] text-white",
    red: "bg-[#ca3134] text-white",
    white: "bg-white text-[#1d418f] border border-[#1d418f]",
  };
  const sizes = {
    sm: "h-7 min-w-7 px-1.5 text-xs",
    md: "h-10 min-w-10 px-2 text-sm",
    lg: "h-14 min-w-14 px-3 text-lg",
  };
  return (
    <span
      className={`inline-flex items-center justify-center rounded-sm font-semibold tabular tracking-wide ${tones[tone]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
}

export function RuleRedBlue({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rule-red-blue h-[2px] w-full ${className}`}
      style={{
        background:
          "linear-gradient(90deg, #ca3134 0%, #ca3134 40%, #1d418f 40%, #1d418f 100%)",
      }}
    />
  );
}

export function Seal({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#ca3134] bg-[#ca3134]/5 font-tc-serif text-[#ca3134] ${className}`}
      aria-hidden="true"
    >
      <span className="text-[10px] leading-tight text-center">
        花<br />雕<br />雞
      </span>
    </div>
  );
}