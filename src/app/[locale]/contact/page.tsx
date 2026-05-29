import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";
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
    title: t("contact.title"),
    description: t("contact.description"),
    alternates: {
      canonical: locale === "en" ? "/contact" : `/${locale}/contact`,
      languages: { en: "/contact", ar: "/ar/contact" },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const tFooter = await getTranslations("footer");

  const expect = t.raw("expect") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        titleAccent={t("hero.titleAccent")}
        sub={t("hero.sub")}
      />

      <section className="relative isolate overflow-hidden border-b border-line bg-muted">
        <AbstractBackdrop
          src="/bg-cta.webp"
          opacity={0.16}
          parallax={50}
          className="start-auto end-0 w-3/5 md:w-1/2"
          imgClassName="object-cover object-right"
          maskClassName="[mask-image:linear-gradient(to_left,#000_5%,transparent_80%)]"
        />
        <div className="container-x py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <LeadForm />
            </Reveal>

            <aside className="md:col-span-5">
              <Reveal delay={0.12} className="sticky top-24 space-y-6">
                <div className="rounded-lg border border-line bg-paper p-6 shadow-card">
                  <h3 className="font-serif text-xl tracking-tightest text-ink">
                    {t("whatToExpect")}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-ink/70">
                    {expect.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="font-serif text-brand">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-line bg-paper p-6 shadow-card">
                  <h3 className="font-serif text-xl tracking-tightest text-ink">
                    {t("reachUs")}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>
                      <a
                        href={`mailto:${site.email}`}
                        className="link-underline text-ink/80 hover:text-brand"
                      >
                        {site.email}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                        className="link-underline text-ink/80 hover:text-brand"
                        dir="ltr"
                      >
                        {site.phone}
                      </a>
                    </li>
                    <li className="pt-1 text-ink/70">{tFooter("address")}</li>
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
