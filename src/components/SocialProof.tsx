import { getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";
import { AbstractBackdrop } from "./AbstractBackdrop";

export async function Testimonial() {
  const t = await getTranslations("socialProof");

  return (
    <section
      aria-label={t("testimonialAria")}
      className="relative isolate overflow-hidden border-b border-line"
    >
      <AbstractBackdrop
        src="/bg-testimonial.webp"
        opacity={0.32}
        parallax={50}
        imgClassName="object-cover object-center"
        maskClassName="[mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent_72%)]"
      />
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
              {t("quote")}
            </blockquote>
            <figcaption className="mt-8 flex flex-col items-center gap-1">
              <span className="text-sm font-medium text-ink">{t("name")}</span>
              <span className="text-sm text-ink/60">
                {t("role")}, {t("org")}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

export async function ClientLogos() {
  const t = await getTranslations("socialProof");
  const clients = t.raw("clients") as string[];

  return (
    <section aria-label={t("clientsAria")} className="border-b border-line">
      <div className="container-x py-16 md:py-20">
        <Reveal className="text-center">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink/50">
            {t("trustedBy")}
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
