import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { certifications } from "@/content/certifications";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Training & Certification",
  description:
    "Globally accredited KPI Institute certification programs — delivered in Bahrain and across the GCC, in English and Arabic, as public courses or in-house.",
};

const highlights = [
  {
    title: "Official KPI Institute partner",
    body: "We deliver The KPI Institute's globally recognized certifications under a formal partnership — the same curriculum and credential, delivered locally.",
  },
  {
    title: "English & Arabic",
    body: "Every program is available in both languages, led by qualified facilitators with hands-on experience across the region.",
  },
  {
    title: "Public or in-house",
    body: "Join a scheduled public cohort, or run a private in-house program tailored to your team and sector.",
  },
];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Certifications & Training"
        title="Globally accredited training,"
        titleAccent="delivered locally."
        sub="As the official partner of The KPI Institute (Australia), Vigilance Consulting delivers certified programs across strategy, KPIs, OKRs, ROI, and leadership — in English and Arabic, for public and private sector teams in Bahrain and the GCC."
      />

      <section aria-label="Why train with us" className="border-b border-line">
        <div className="container-x py-16 md:py-20">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
              Why train with us
            </span>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
            {highlights.map((h, i) => (
              <li key={h.title}>
                <Reveal delay={i * 0.06}>
                  <div className="h-full rounded-lg border border-line bg-paper p-6 shadow-card md:p-7">
                    <h2 className="font-serif text-2xl tracking-tightest text-ink">
                      {h.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink/65 md:text-base">
                      {h.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-label="Certification programs"
        className="border-b border-line"
      >
        <div className="container-x py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
              Programs
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tightest md:text-5xl">
              Certification programs we deliver.
            </h2>
            <p className="mt-6 text-lg text-ink/70">
              Each program ends in a globally recognized KPI Institute
              credential. Browse the catalog below, then check the live calendar
              for upcoming dates and registration.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((name, i) => (
              <li key={name}>
                <Reveal delay={(i % 3) * 0.06}>
                  <div className="flex h-full items-start gap-3 rounded-lg border border-line bg-paper p-5 shadow-card transition-shadow duration-300 hover:shadow-lift">
                    <span
                      aria-hidden
                      className="mt-0.5 font-serif text-sm text-brand"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-ink">{name}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-start gap-4 rounded-xl border border-line bg-muted p-7 sm:flex-row sm:items-center sm:justify-between md:p-8">
              <div>
                <h3 className="font-serif text-2xl tracking-tightest text-ink">
                  See upcoming course dates
                </h3>
                <p className="mt-2 max-w-xl text-sm text-ink/65 md:text-base">
                  Schedules, formats, and registration are managed on The KPI
                  Institute&apos;s partner portal — it opens in a new tab so you
                  won&apos;t lose your place here.
                </p>
              </div>
              <a
                href={site.coursesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-medium text-paper shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-lift"
              >
                View the course calendar
                <span aria-hidden>↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
