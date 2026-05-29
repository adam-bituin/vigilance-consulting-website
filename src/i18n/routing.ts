import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  // English stays unprefixed (/services); Arabic is prefixed (/ar/services).
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
