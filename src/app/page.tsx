import { Hero } from "@/components/Hero";
import { ServicePillars } from "@/components/ServicePillars";
import { Certifications } from "@/components/Certifications";
import { CTASection } from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicePillars />
      <Certifications />
      <CTASection />
    </>
  );
}
