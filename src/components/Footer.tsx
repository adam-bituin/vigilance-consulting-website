import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { Logo } from "./Logo";

export async function Footer() {
  const year = new Date().getFullYear();
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tServices = await getTranslations("services");
  const tMeta = await getTranslations("metadata");

  return (
    <footer className="border-t border-line bg-muted">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-subtle">
            {tMeta("default.description")}
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-ink/60">
            {t("headingServices")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/services#${s.id}`}
                  className="link-underline text-ink/80 transition-colors hover:text-brand"
                >
                  {tServices(`items.${s.id}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-ink/60">
            {t("headingCompany")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="link-underline text-ink/80 transition-colors hover:text-brand"
                >
                  {tNav(n.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-ink/60">
            {t("headingContact")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-ink/80 transition-colors hover:text-brand"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                className="link-underline text-ink/80 transition-colors hover:text-brand"
                dir="ltr"
              >
                {site.phone}
              </a>
            </li>
            <li className="text-ink/70">{t("address")}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-6 text-xs text-subtle md:flex-row md:items-center">
          <p>{t("rights", { year, name: site.name })}</p>
          <p>{t("tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
