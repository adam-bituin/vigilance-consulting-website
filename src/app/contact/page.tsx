import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us the result you need. A senior practitioner will be in touch within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Tell us the result you need by"
        titleAccent="next quarter."
        sub="A three-step inquiry, then a real conversation with a senior practitioner — not a sales call."
      />

      <section className="border-b border-line bg-muted">
        <div className="container-x py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <LeadForm />
            </Reveal>

            <aside className="md:col-span-5">
              <Reveal delay={0.12} className="sticky top-24 space-y-6">
                <div className="rounded-lg border border-line bg-paper p-6 shadow-card">
                  <h3 className="font-serif text-xl tracking-tightest text-ink">
                    What to expect
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-ink/70">
                    <li className="flex gap-3">
                      <span className="font-serif text-brand">01</span>
                      <span>
                        We read every inquiry. No sales chatbot, no SDR queue.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-serif text-brand">02</span>
                      <span>
                        A senior practitioner responds within one business day.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-serif text-brand">03</span>
                      <span>
                        First call is a working session — we leave you with
                        something useful whether or not we engage.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-line bg-paper p-6 shadow-card">
                  <h3 className="font-serif text-xl tracking-tightest text-ink">
                    Prefer email or phone?
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>
                      <a
                        href={`mailto:${site.email}`}
                        className="link-underline text-ink/80 hover:text-brand"
                      >
                        {site.email}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                        className="link-underline text-ink/80 hover:text-brand"
                      >
                        {site.phone}
                      </a>
                    </li>
                    <li className="pt-1 text-ink/70">{site.address}</li>
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
