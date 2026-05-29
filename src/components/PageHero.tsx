import { Reveal } from "./Reveal";
import { AbstractBackdrop } from "./AbstractBackdrop";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  sub?: string;
};

export function PageHero({ eyebrow, title, titleAccent, sub }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line text-ink">
      <AbstractBackdrop
        src="/bg-accent.webp"
        opacity={0.45}
        parallax={70}
        className="start-auto end-0 w-3/5 md:w-1/2"
        imgClassName="object-cover object-center"
        maskClassName="[mask-image:linear-gradient(to_left,#000_5%,transparent_82%)]"
      />
      <div className="container-x relative py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ink/65">
              <span className="h-px w-8 bg-brand" />
              {eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-serif text-4xl leading-[1.05] tracking-display text-ink md:text-6xl lg:text-7xl">
              {title}
              {titleAccent && (
                <>
                  {" "}
                  <span className="text-brand">{titleAccent}</span>
                </>
              )}
            </h1>
          </Reveal>
          {sub && (
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-lg text-ink/65 md:text-xl">
                {sub}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
