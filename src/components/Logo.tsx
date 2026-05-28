type LogoProps = {
  className?: string;
  layout?: "horizontal" | "stacked";
};

export function Logo({ className, layout = "horizontal" }: LogoProps) {
  if (layout === "stacked") {
    return (
      <span className={`inline-flex flex-col items-center gap-1 ${className ?? ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-mark.svg"
          alt=""
          aria-hidden="true"
          width={36}
          height={36}
          className="h-9 w-9"
        />
        <span className="flex flex-col items-center text-[9px] font-semibold uppercase leading-[1.2] tracking-[0.16em] text-ink">
          <span>Vigilance</span>
          <span>Consulting</span>
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-mark.svg"
        alt=""
        aria-hidden="true"
        width={32}
        height={32}
        className="h-8 w-8"
      />
      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-ink">
        Vigilance Consulting
      </span>
    </span>
  );
}
