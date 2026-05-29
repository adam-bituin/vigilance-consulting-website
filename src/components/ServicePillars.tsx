import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services, type ServiceOffering } from "@/content/services";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { AbstractBackdrop } from "./AbstractBackdrop";

const iconPaths: Record<string, ReactNode> = {
  strategy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  management: (
    <>
      <circle cx="9" cy="9" r="3.2" />
      <path d="M3.8 19a5.2 5.2 0 0 1 10.4 0" />
      <path d="M15.6 6.2a3 3 0 0 1 0 5.6" />
      <path d="M16.2 14.1A5.2 5.2 0 0 1 20.2 19" />
    </>
  ),
  data: (
    <>
      <path d="M3 20h18" />
      <path d="M6 20v-5" />
      <path d="M12 20v-9" />
      <path d="M18 20v-13" />
    </>
  ),
  leadership: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M16 8 13 13 8 16 11 11Z" />
    </>
  ),
};

function PracticeIcon({ id }: { id: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
    >
      {iconPaths[id]}
    </svg>
  );
}

export async function ServicePillars() {
  const t = await getTranslations("servicePillars");
  const tServices = await getTranslations("services");

  return (
    <section
      id="services"
      aria-label={t("aria")}
      className="relative isolate overflow-hidden border-b border-line"
    >
      <AbstractBackdrop
        src="/bg-accent.webp"
        opacity={0.3}
        parallax={90}
        className="start-auto end-0 w-2/3 md:w-1/2"
        imgClassName="object-cover object-right"
        maskClassName="[mask-image:linear-gradient(to_left,#000_10%,transparent_85%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute end-[6%] top-1/3 h-[55vh] w-[55vh] -translate-y-1/3 rounded-full bg-brand-soft opacity-25 blur-[130px]" />
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(10,10,10,0.04)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(75%_60%_at_62%_42%,#000,transparent_80%)]" />
      </div>

      <div className="container-x py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
            <Reveal>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
                {t("label")}
              </span>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tightest md:text-5xl">
                {t("heading")}
              </h2>
              <p className="mt-6 max-w-md text-ink/70">{t("intro")}</p>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <ul className="grid gap-5 md:gap-6">
              {services.map((s, i) => {
                const offerings = tServices.raw(
                  `items.${s.id}.offerings`,
                ) as ServiceOffering[];
                return (
                  <li key={s.id}>
                    <Reveal delay={i * 0.08}>
                      <TiltCard className="group relative overflow-hidden rounded-xl border border-line bg-paper/85 shadow-card backdrop-blur-sm transition-shadow duration-300 hover:shadow-lift">
                        <Link
                          href={`/services#${s.id}`}
                          className="flex flex-col gap-4 p-6 md:p-7"
                        >
                          <span
                            aria-hidden
                            className="pointer-events-none absolute -right-3 -top-6 select-none font-serif text-7xl leading-none text-ink/[0.05] transition-all duration-500 group-hover:-translate-y-1 group-hover:text-brand/10 md:text-8xl"
                          >
                            {s.number}
                          </span>

                          <span className="text-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                            <PracticeIcon id={s.id} />
                          </span>

                          <div>
                            <h3 className="font-serif text-2xl tracking-tightest text-ink md:text-3xl">
                              {tServices(`items.${s.id}.title`)}
                            </h3>
                            <p className="mt-2 max-w-md text-sm text-ink/65 md:text-base">
                              {tServices(`items.${s.id}.summary`)}
                            </p>
                          </div>

                          <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:grid-rows-[0fr] md:group-focus-within:grid-rows-[1fr] md:group-hover:grid-rows-[1fr] motion-reduce:md:!grid-rows-[1fr]">
                            <div className="overflow-hidden">
                              <ul className="flex flex-wrap gap-x-2 gap-y-1.5 pt-1 text-xs text-ink/70 md:pt-3">
                                {offerings.map((o) => (
                                  <li
                                    key={o.name}
                                    className="rounded-full border border-line bg-muted/70 px-2.5 py-1"
                                  >
                                    {o.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                            {t("explore")}
                            <span
                              aria-hidden
                              className="transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                            >
                              →
                            </span>
                          </span>
                        </Link>
                      </TiltCard>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
