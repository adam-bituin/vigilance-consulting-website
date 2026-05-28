"use client";

import { useState } from "react";

type PartnerLogoProps = {
  src: string;
  alt: string;
  className?: string;
};

export function PartnerLogo({ src, alt, className = "" }: PartnerLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`font-serif text-xl tracking-tightest text-ink ${className}`}
      >
        {alt}
      </span>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`h-12 w-auto object-contain md:h-16 ${className}`}
    />
  );
}
