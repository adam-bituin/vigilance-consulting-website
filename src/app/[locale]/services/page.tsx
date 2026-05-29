import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { AbstractBackdrop } from "@/components/AbstractBackdrop";
import { services, type ServiceOffering } from "@/content/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("services.title"),
    description: t("services.description"),
    alternates: {
      canonical: locale === "en" ? "/services" : `/${locale}/services`,
      languages: { en: "/services", ar: "/ar/services" },
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicesPage");
  const tServices = await getTranslations("services");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        titleAccent={t("hero.titleAccent")}
        sub={t("hero.sub")}
      />

      <section
        aria-label={t("overviewAria")}
        className="relative isolate overflow-hidden border-b border-line"
      >
        <AbstractBackdrop
          src="/bg-testimonial.webp"
          opacity={0.2}
          parallax={50}
          imgClassName="object-cover object-center"
          maskClassName="[mask-image:radial-gradient(55%_50%_at_50%_22%,#000,transparent_72%)]"
        />
        <div className="container-x py-16 md:py-20">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
              {t("practicesLabel")}
            </span>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:gap-5">
            {services.map((s, i) => (
              <li key={s.id}>
                <Reveal delay={i * 0.06}>
                  <a
                    href={`#${s.id}`}
                    className="group flex h-full flex-col rounded-lg border border-line bg-paper p-6 shadow-card transition-shadow duration-300 hover:shadow-lift md:p-7"
                  >
                    <span className="font-serif text-sm text-brand">
                      {s.number}
                    </span>
                    <h2 className="mt-2 font-serif text-2xl tracking-tightest text-ink md:text-3xl">
                      {tServices(`items.${s.id}.title`)}
                    </h2>
                    <p className="mt-3 text-sm text-ink/65 md:text-base">
                      {tServices(`items.${s.id}.summary`)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                      {t("readMore")}
                      <span
                        aria-hidden
                        className="transition-transform duration-200 group-hover:translate-y-0.5"
                      >
                        ↓
                      </span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {services.map((s) => {
        const offerings = tServices.raw(
          `items.${s.id}.offerings`,
        ) as ServiceOffering[];
        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-heading`}
            className="scroll-mt-24 border-b border-line"
          >
            <div className="container-x py-20 md:py-28">
              <Reveal className="max-w-3xl">
                <span className="font-serif text-lg text-brand">{s.number}</span>
                <h2
                  id={`${s.id}-heading`}
                  className="mt-2 font-serif text-3xl leading-tight tracking-tightest md:text-5xl"
                >
                  {tServices(`items.${s.id}.title`)}
                </h2>
                <p className="mt-6 text-lg text-ink/75">
                  {tServices(`items.${s.id}.summary`)}
                </p>
                <p className="mt-4 text-base text-ink/65">
                  {tServices(`items.${s.id}.details`)}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {offerings.map((o) => (
                    <li key={o.name}>
                      <div className="h-full rounded-md border border-line bg-paper p-4 shadow-card transition-shadow duration-300 hover:shadow-lift">
                        <div className="text-sm font-medium text-ink">
                          {o.name}
                        </div>
                        <div className="mt-1.5 text-xs leading-relaxed text-ink/65">
                          {o.blurb}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        );
      })}

      <CTASection />
    </>
  );
}
