import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";
import { AbstractBackdrop } from "./AbstractBackdrop";

export async function CTASection() {
  const t = await getTranslations("ctaSection");
  const tCta = await getTranslations("cta");
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <AbstractBackdrop
        src="/bg-cta.webp"
        opacity={0.6}
        parallax={70}
        imgClassName="object-cover object-right"
        maskClassName="[mask-image:linear-gradient(to_right,transparent_0%,transparent_30%,#000_85%)]"
      />
      <div className="container-x py-20 md:py-28">
        <Reveal>
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
                {t("label")}
              </span>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tightest text-ink md:text-6xl">
                {t("heading")}
              </h2>
            </div>
            <div className="md:col-span-4 md:text-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-base font-medium text-paper shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand hover:shadow-lift"
              >
                {tCta("primary")}
                <span aria-hidden className="rtl:-scale-x-100">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
