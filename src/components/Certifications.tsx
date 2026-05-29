"use client";

import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";

function SealIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2.5l2.3 1.6 2.8-.2 1 2.6 2.3 1.6-.8 2.7.8 2.7-2.3 1.6-1 2.6-2.8-.2L12 21.5l-2.3-1.6-2.8.2-1-2.6L3.6 16l.8-2.7L3.6 10.6 5.9 9l1-2.6 2.8.2L12 2.5z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function Pill({ name }: { name: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-paper/80 px-5 py-3 shadow-card backdrop-blur transition-colors duration-300 hover:border-brand/40">
      <SealIcon className="h-4 w-4 shrink-0 text-brand" />
      <span className="whitespace-nowrap text-sm text-ink/80">{name}</span>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max shrink-0 hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[...items, ...items].map((name, i) => (
          <div key={i} className="me-3 md:me-4" aria-hidden={i >= items.length}>
            <Pill name={name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Certifications() {
  const reduce = useReducedMotion();
  const t = useTranslations("certifications");
  const certifications = t.raw("items") as string[];

  const rowA = certifications.filter((_, i) => i % 2 === 0);
  const rowB = certifications.filter((_, i) => i % 2 === 1);

  return (
    <section
      aria-label={t("aria")}
      className="relative isolate overflow-hidden border-b border-line"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-soft opacity-25 blur-[130px]" />
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(10,10,10,0.04)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(75%_60%_at_50%_42%,#000,transparent_80%)]" />
      </div>

      <div className="py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
              {t("eyebrow")}
            </span>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tightest md:text-5xl">
              {t("heading")}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ink/70">{t("sub")}</p>
          </Reveal>
        </div>

        {reduce ? (
          <div className="container-x mt-12">
            <ul className="flex flex-wrap justify-center gap-3">
              {certifications.map((name) => (
                <li key={name}>
                  <Pill name={name} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-14 flex flex-col gap-4 md:mt-16">
            <MarqueeRow items={rowA} />
            <MarqueeRow items={rowB} reverse />
          </div>
        )}
      </div>
    </section>
  );
}
