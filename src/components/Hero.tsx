import Link from "next/link";
import { hero } from "@/content/stats";
import { site } from "@/content/site";
import { FounderPortrait } from "./FounderPortrait";
import { HeroBackdrop } from "./HeroBackdrop";
import { PartnerBadge } from "./PartnerBadge";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-ink">
      <HeroBackdrop />

      <div className="container-x relative flex flex-col items-center pt-28 pb-24 text-center md:pt-32 md:pb-28">
        <FounderPortrait />

        <div className="relative z-10 -mt-36 flex flex-col items-center md:-mt-44">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ink/65">
              <span className="h-px w-8 bg-brand" />
              {hero.eyebrow}
              <span className="h-px w-8 bg-brand" />
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.02] tracking-display text-ink md:text-6xl lg:text-7xl">
              {hero.headlinePrefix}{" "}
              <span className="text-brand">{hero.headlineAccent}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <PartnerBadge className="mt-6" />
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-6 max-w-2xl text-lg text-ink/65 md:text-xl">
              {hero.sub}
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-medium text-paper shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-lift"
              >
                {site.cta.primary}
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/training"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-base font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-paper"
              >
                {site.cta.secondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
