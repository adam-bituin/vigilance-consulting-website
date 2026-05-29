import type { Metadata } from "next";
import {
  Spectral,
  Inter,
  IBM_Plex_Sans_Arabic,
  Noto_Kufi_Arabic,
} from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/content/site";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const serif = Spectral({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const arabicSans = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const arabicSerif = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("default.title");
  const description = t("default.description");

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${title}`,
      template: `%s · ${site.name}`,
    },
    description,
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: { en: "/", ar: "/ar" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "ar" ? "ar_BH" : "en_US",
      title: `${site.name} — ${title}`,
      description,
      url: locale === routing.defaultLocale ? site.url : `${site.url}/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${title}`,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale as Locale);

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${serif.variable} ${sans.variable} ${arabicSans.variable} ${arabicSerif.variable}`}
    >
      <body className="min-h-screen bg-paper text-ink">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
