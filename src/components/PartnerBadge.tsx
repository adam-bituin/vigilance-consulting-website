"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { site } from "@/content/site";

function SealIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2.5l2.3 1.6 2.8-.2 1 2.6 2.3 1.6-.8 2.7.8 2.7-2.3 1.6-1 2.6-2.8-.2L12 21.5l-2.3-1.6-2.8.2-1-2.6L3.6 16l.8-2.7L3.6 10.6 5.9 9l1-2.6 2.8.2L12 2.5z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function PartnerBadge({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const t = useTranslations("partner");

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border border-line bg-paper/70 py-1.5 ps-2.5 pe-4 shadow-card backdrop-blur ${className}`}
    >
      {failed ? (
        <SealIcon className="h-5 w-5 shrink-0 text-brand" />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={site.partner.logoSrc}
          alt=""
          aria-hidden
          onError={() => setFailed(true)}
          className="h-6 w-auto shrink-0 object-contain"
        />
      )}
      <span className="text-sm text-ink/70">
        {t("label")} <span className="font-medium text-ink">{t("name")}</span>
      </span>
    </span>
  );
}
