"use client";

import { useRef, useState } from "react";
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

  // Section-anchored parallax. `layoutEffect: false` defers measurement to a
  // post-paint effect, avoiding the "ref is defined but not hydrated" error
  // that `useScroll({ target })` throws under Next 16 / React 19 streaming.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });
  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);

  if (failed) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <motion.div
        style={reduce ? undefined : { y, willChange: "transform" }}
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
