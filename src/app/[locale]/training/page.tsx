import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { AbstractBackdrop } from "@/components/AbstractBackdrop";
import { site } from "@/content/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("training.title"),
    description: t("training.description"),
    alternates: {
      canonical: locale === "en" ? "/training" : `/${locale}/training`,
      languages: { en: "/training", ar: "/ar/training" },
    },
  };
}

export default async function TrainingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("training");
  const tCert = await getTranslations("certifications");

  const highlights = t.raw("highlights") as { title: string; body: string }[];
  const certifications = tCert.raw("items") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        titleAccent={t("hero.titleAccent")}
        sub={t("hero.sub")}
      />

      <section
        aria-label={t("whyAria")}
        className="relative isolate overflow-hidden border-b border-line"
      >
        <AbstractBackdrop
          src="/bg-testimonial.webp"
          opacity={0.2}
          parallax={50}
          className="start-auto end-0 w-3/5 md:w-1/2"
          imgClassName="object-cover object-center"
          maskClassName="[mask-image:radial-gradient(55%_60%_at_72%_42%,#000,transparent_74%)]"
        />
        <div className="container-x py-16 md:py-20">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
              {t("whyLabel")}
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

      <section aria-label={t("programsAria")} className="border-b border-line">
        <div className="container-x py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
              {t("programsLabel")}
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tightest md:text-5xl">
              {t("programsHeading")}
            </h2>
            <p className="mt-6 text-lg text-ink/70">{t("programsSub")}</p>
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
                  {t("calendarHeading")}
                </h3>
                <p className="mt-2 max-w-xl text-sm text-ink/65 md:text-base">
                  {t("calendarSub")}
                </p>
              </div>
              <a
                href={site.coursesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-medium text-paper shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-lift"
              >
                {t("calendarCta")}
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
