import { Reveal } from "./Reveal";
import { testimonial, clients } from "@/content/testimonials";

export function Testimonial() {
  return (
    <section aria-label="Client testimonial" className="border-b border-line">
      <div className="container-x py-20 md:py-28">
        <Reveal>
          <figure className="mx-auto max-w-3xl text-center">
            <span
              aria-hidden
              className="block font-serif text-6xl leading-none text-brand/30 md:text-7xl"
            >
              &ldquo;
            </span>
            <blockquote className="-mt-4 font-serif text-2xl leading-snug tracking-tightest text-ink md:text-3xl lg:text-4xl">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-8 flex flex-col items-center gap-1">
              <span className="text-sm font-medium text-ink">
                {testimonial.name}
              </span>
              <span className="text-sm text-ink/60">
                {testimonial.role}, {testimonial.org}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

export function ClientLogos() {
  return (
    <section aria-label="Selected clients" className="border-b border-line">
      <div className="container-x py-16 md:py-20">
        <Reveal className="text-center">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink/50">
            Trusted by teams across the public and private sector
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="mt-10 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-8 sm:grid-cols-4 md:gap-x-12">
            {clients.map((name) => (
              <li key={name} className="flex h-12 items-center">
                <span className="font-serif text-xl tracking-tightest text-ink/40 transition-colors duration-300 hover:text-ink/70 md:text-2xl">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
