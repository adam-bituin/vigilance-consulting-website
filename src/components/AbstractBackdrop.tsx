"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type AbstractBackdropProps = {
  src: string;
  /** Positioning/size classes for the backdrop root (defaults to full bleed). */
  className?: string;
  /** Object-fit/position classes for the image. */
  imgClassName?: string;
  /** Image opacity, 0–1. Keep low so text stays legible. */
  opacity?: number;
  /** Total scroll-coupled drift in px (image overscans to hide the edges). */
  parallax?: number;
  /** Tailwind mask classes that fade the image into the white page. */
  maskClassName?: string;
};

export function AbstractBackdrop({
  src,
  className = "",
  imgClassName = "object-cover object-center",
  opacity = 0.5,
  parallax = 60,
  maskClassName = "",
}: AbstractBackdropProps) {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Section-anchored parallax driven off GLOBAL scroll. A target-ref
  // `useScroll({ target })` throws "ref is defined but not hydrated" under
  // Next 16 / React 19 streaming, so we measure the element's document
  // position and map the scroll span it travels through the viewport onto a
  // small drift. `measured` keeps SSR and first client render identical.
  const { scrollY } = useScroll();
  const [span, setSpan] = useState<[number, number]>([0, 1]);
  const [measured, setMeasured] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      setSpan([top - window.innerHeight, top + rect.height]);
      setMeasured(true);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const y = useTransform(scrollY, span, [-parallax, parallax]);

  if (failed) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <motion.div
        style={reduce || !measured ? undefined : { y, willChange: "transform" }}
        className="absolute -inset-y-24 inset-x-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          onError={() => setFailed(true)}
          style={{ opacity }}
          className={`h-full w-full ${imgClassName} ${maskClassName}`}
        />
      </motion.div>
    </div>
  );
}
