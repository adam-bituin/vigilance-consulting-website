import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";
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
    title: t("insights.title"),
    description: t("insights.description"),
    alternates: {
      canonical: locale === "en" ? "/insights" : `/${locale}/insights`,
      languages: { en: "/insights", ar: "/ar/insights" },
    },
  };
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("insights");
  const tCta = await getTranslations("cta");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        titleAccent={t("hero.titleAccent")}
        sub={t("hero.sub")}
      />

      <section className="relative isolate overflow-hidden border-b border-line bg-paper">
        <AbstractBackdrop
          src="/bg-testimonial.webp"
          opacity={0.22}
          parallax={50}
          imgClassName="object-cover object-center"
          maskClassName="[mask-image:radial-gradient(50%_55%_at_50%_38%,#000,transparent_72%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-8 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-soft blur-3xl motion-safe:animate-float"
        />
        <div className="container-x py-20 md:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-muted px-4 py-1.5 text-xs uppercase tracking-widest text-subtle shadow-card">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {t("comingSoon")}
            </div>
            <h2 className="mt-6 font-serif text-3xl leading-tight tracking-tightest md:text-5xl">
              {t("heading")}
            </h2>
            <p className="mt-6 text-lg text-ink/70">{t("body")}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-base font-medium text-paper shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand hover:shadow-lift"
              >
                {tCta("primary")}
                <span aria-hidden className="rtl:-scale-x-100">
                  →
                </span>
              </Link>
              <a
                href={site.coursesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-base font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted hover:shadow-card"
              >
                {tCta("secondary")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
