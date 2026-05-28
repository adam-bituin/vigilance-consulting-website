"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function HeroBackdrop() {
  const reduce = useReducedMotion();
  // Counter-parallax: drifts down slower than the portrait rises, for depth.
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 520], [0, 40]);

  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <motion.div
        style={reduce ? undefined : { y, willChange: "transform" }}
        className="absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/4 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand-soft opacity-30 blur-[130px]" />
        <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle,rgba(10,10,10,0.045)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(70%_55%_at_50%_32%,#000,transparent_78%)]" />
      </motion.div>
    </div>
  );
}
