"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("localeSwitcher");

  const other = locale === "ar" ? "en" : "ar";
  const label = other === "ar" ? t("toArabic") : t("toEnglish");

  return (
    <Link
      href={pathname}
      locale={other}
      aria-label={t("label")}
      lang={other}
      className={`inline-flex items-center justify-center rounded-full border border-line bg-paper/70 px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:border-brand/40 hover:text-brand ${className}`}
    >
      {label}
    </Link>
  );
}
