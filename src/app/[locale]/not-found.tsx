"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-32 text-center">
      <span className="font-serif text-7xl text-brand/30">404</span>
      <h1 className="mt-4 font-serif text-3xl tracking-tightest text-ink md:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-md text-ink/65">{t("body")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-brand"
      >
        {t("home")}
      </Link>
    </section>
  );
}
