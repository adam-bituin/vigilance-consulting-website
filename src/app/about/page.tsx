import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { AbstractBackdrop } from "@/components/AbstractBackdrop";
import { PartnerLogo } from "@/components/PartnerLogo";
import { about } from "@/content/about";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vigilance Consulting S.P.C. is a Bahraini consulting firm established in 2014 — partner of The KPI Institute, delivering strategy, Balanced Scorecard, HR and process optimization in English and Arabic.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        titleAccent={about.hero.titleAccent}
        sub={about.hero.sub}
      />

      {/* Founder / origin story */}
      <section className="border-b border-line bg-paper">
        <div className="container-x py-20 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-10 -z-10 mx-auto h-28 w-3/4 rounded-[50%] bg-brand/10 blur-2xl"
                />
                <div className="animate-float motion-reduce:animate-none">
                  <TiltCard max={8}>
                    <div className="relative mx-auto h-[360px] w-[260px] overflow-hidden rounded-t-full bg-gradient-to-b from-brand-soft via-paper to-paper sm:h-[440px] sm:w-[320px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/founder.png"
                        alt="Kamal Yousif Al-Shihaby, founder of Vigilance Consulting"
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-paper via-paper/75 to-transparent" />
                    </div>
                  </TiltCard>
                </div>
                <div className="mt-6 text-center">
                  <div className="font-serif text-xl tracking-tightest text-ink">
                    {about.founder.name}
                  </div>
                  <div className="mt-1 text-sm text-subtle">
                    {about.founder.role}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="md:col-span-7">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
                {about.founder.eyebrow}
              </span>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tightest md:text-5xl">
                Meet our founder.
              </h2>
              {about.founder.body.map((para, i) => (
                <p
                  key={i}
                  className={`mt-6 max-w-xl text-ink/75 ${
                    i === 0 ? "text-lg" : "text-base text-ink/65"
                  }`}
                >
                  {para}
                </p>
              ))}
              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {about.founder.facts.map((fact) => (
                  <div
                    key={fact}
                    className="flex items-center gap-2 text-sm font-medium text-ink"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
                    {fact}
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* KPI Institute partnership */}
      <section className="relative isolate overflow-hidden border-b border-line bg-muted">
        <AbstractBackdrop
          src="/bg-testimonial.webp"
          opacity={0.2}
          parallax={50}
          className="right-auto left-0 w-3/5 md:w-1/2"
          imgClassName="object-cover object-center"
          maskClassName="[mask-image:radial-gradient(55%_60%_at_25%_45%,#000,transparent_74%)]"
        />
        <div className="container-x py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
                {about.partner.eyebrow}
              </span>
              <Reveal delay={0.08}>
                <PartnerLogo
                  src={about.partner.logoSrc}
                  alt={about.partner.logoAlt}
                  className="mt-6"
                />
              </Reveal>
            </div>
            <Reveal className="md:col-span-8">
              <h2 className="font-serif text-3xl leading-tight tracking-tightest md:text-5xl">
                {about.partner.title}
              </h2>
              {about.partner.body.map((para, i) => (
                <p
                  key={i}
                  className={`mt-6 max-w-2xl text-ink/75 ${
                    i === 0 ? "text-lg" : "text-base text-ink/65"
                  }`}
                >
                  {para}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Areas of expertise */}
      <section className="border-b border-line bg-paper">
        <div className="container-x py-20 md:py-28">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
              {about.expertise.eyebrow}
            </span>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight tracking-tightest md:text-4xl">
              {about.expertise.title}
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {about.expertise.areas.map((area, i) => (
              <li key={area.title}>
                <Reveal delay={i * 0.08}>
                  <TiltCard className="h-full rounded-lg border border-line bg-paper p-6 shadow-card transition-shadow duration-300 hover:shadow-lift">
                    <h3 className="font-serif text-2xl tracking-tightest text-ink">
                      {area.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/65 md:text-base">
                      {area.body}
                    </p>
                  </TiltCard>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.16}>
            <a
              href={site.coursesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-brand"
            >
              {about.expertise.ctaLabel}
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
