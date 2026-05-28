import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { AbstractBackdrop } from "@/components/AbstractBackdrop";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Field notes from the work — scorecards, leadership, ROI methodology, and what we're learning from current engagements.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Field notes from"
        titleAccent="the work."
        sub="Short, honest pieces on what works in execution, leadership, and measurement — drawn from the engagements we're inside right now."
      />

      <section className="relative isolate overflow-hidden border-b border-line bg-paper">
        <AbstractBackdrop
          src="/bg-testimonial.webp"
          opacity={0.22}
          parallax={50}
          imgClassName="object-cover object-center"
          maskClassName="[mask-image:radial-gradient(50%_55%_at_50%_38%,#000,transparent_72%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-8 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-soft blur-3xl motion-safe:animate-float"
        />
        <div className="container-x py-20 md:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-muted px-4 py-1.5 text-xs uppercase tracking-widest text-subtle shadow-card">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Coming soon
            </div>
            <h2 className="mt-6 font-serif text-3xl leading-tight tracking-tightest md:text-5xl">
              The first essays are being written.
            </h2>
            <p className="mt-6 text-lg text-ink/70">
              Insights launch alongside our first published case studies. If
              you&apos;d like to be notified when they go live, get in touch.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-base font-medium text-paper shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand hover:shadow-lift"
              >
                {site.cta.primary}
                <span aria-hidden>→</span>
              </Link>
              <a
                href={site.coursesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-base font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted hover:shadow-card"
              >
                {site.cta.secondary}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
