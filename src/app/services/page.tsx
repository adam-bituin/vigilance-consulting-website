import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strategy & Performance, Management & Development, Data & ROI, and Leadership — four practices that work together as one system.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Four practices, built to work as"
        titleAccent="one system."
        sub="Strategy decks don't move numbers. We build the scorecards, train the managers, and certify the methods that keep results compounding after we leave."
      />

      <section aria-label="Services overview" className="border-b border-line">
        <div className="container-x py-16 md:py-20">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
              The practices
            </span>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:gap-5">
            {services.map((s, i) => (
              <li key={s.id}>
                <Reveal delay={i * 0.06}>
                  <a
                    href={`#${s.id}`}
                    className="group flex h-full flex-col rounded-lg border border-line bg-paper p-6 shadow-card transition-shadow duration-300 hover:shadow-lift md:p-7"
                  >
                    <span className="font-serif text-sm text-brand">
                      {s.number}
                    </span>
                    <h2 className="mt-2 font-serif text-2xl tracking-tightest text-ink md:text-3xl">
                      {s.title}
                    </h2>
                    <p className="mt-3 text-sm text-ink/65 md:text-base">
                      {s.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                      Read more
                      <span
                        aria-hidden
                        className="transition-transform duration-200 group-hover:translate-y-0.5"
                      >
                        ↓
                      </span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {services.map((s) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-heading`}
          className="scroll-mt-24 border-b border-line"
        >
          <div className="container-x py-20 md:py-28">
            <Reveal className="max-w-3xl">
              <span className="font-serif text-lg text-brand">{s.number}</span>
              <h2
                id={`${s.id}-heading`}
                className="mt-2 font-serif text-3xl leading-tight tracking-tightest md:text-5xl"
              >
                {s.title}
              </h2>
              <p className="mt-6 text-lg text-ink/75">{s.summary}</p>
              <p className="mt-4 text-base text-ink/65">{s.details}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {s.offerings.map((o) => (
                  <li key={o.name}>
                    <div className="h-full rounded-md border border-line bg-paper p-4 shadow-card transition-shadow duration-300 hover:shadow-lift">
                      <div className="text-sm font-medium text-ink">
                        {o.name}
                      </div>
                      <div className="mt-1.5 text-xs leading-relaxed text-ink/65">
                        {o.blurb}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ))}

      <CTASection />
    </>
  );
}
