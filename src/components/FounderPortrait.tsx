"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { TiltCard } from "./TiltCard";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function FounderPortrait({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const t = useTranslations("about");
  const [failed, setFailed] = useState(false);

  // Drive depth off global page scroll; the hero sits at the top, so the
  // portrait recedes as the first ~520px scroll past.
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 520], [0, -80]);
  const scale = useTransform(scrollY, [0, 520], [1, 0.84]);
  const rotateX = useTransform(scrollY, [0, 520], [0, 12]);
  const opacity = useTransform(scrollY, [0, 470], [1, 0.5]);

  if (failed) return null;

  const arch = (
    <div className="relative mx-auto h-[360px] w-[260px] overflow-hidden rounded-t-full bg-gradient-to-b from-brand-soft via-paper to-paper sm:h-[440px] sm:w-[320px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/founder.png"
        alt={t("founder.imageAlt")}
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-paper via-paper/75 to-transparent" />
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-10 -z-10 mx-auto h-28 w-3/4 rounded-[50%] bg-brand/10 blur-2xl"
      />
      <div className="[perspective:1400px]">
        <motion.div
          style={
            reduce
              ? undefined
              : {
                  y,
                  scale,
                  rotateX,
                  opacity,
                  willChange: "transform",
                }
          }
        >
          <div className="animate-float motion-reduce:animate-none">
            <motion.div
              style={{ transformPerspective: 1400 }}
              initial={
                reduce
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.88,
                      y: 40,
                      rotateX: 10,
                      rotateY: -12,
                      filter: "blur(12px)",
                    }
              }
              animate={
                reduce
                  ? undefined
                  : {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      rotateX: 0,
                      rotateY: 0,
                      filter: "blur(0px)",
                    }
              }
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
            >
              {reduce ? arch : <TiltCard max={8}>{arch}</TiltCard>}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
