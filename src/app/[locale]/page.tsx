import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { ServicePillars } from "@/components/ServicePillars";
import { Testimonial } from "@/components/SocialProof";
import { Certifications } from "@/components/Certifications";
import { CTASection } from "@/components/CTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ServicePillars />
      <Testimonial />
      <Certifications />
      <CTASection />
    </>
  );
}
