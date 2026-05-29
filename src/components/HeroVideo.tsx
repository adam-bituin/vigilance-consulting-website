"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Decorative ambient layer behind the hero: a light, warm Higgsfield clip.
// Sits at -z-20, behind HeroBackdrop's brand-soft blob (-z-10).
const MEDIA =
  "absolute inset-0 h-full w-full object-cover object-center opacity-60 [filter:saturate(0.9)_brightness(1.06)] [mask-image:radial-gradient(130%_100%_at_50%_30%,#000_55%,transparent_92%)] [-webkit-mask-image:radial-gradient(130%_100%_at_50%_30%,#000_55%,transparent_92%)]";

export function HeroVideo() {
  const reduce = useReducedMotion();
  // Only download + play the clip on larger screens with motion allowed;
  // everyone else gets the lightweight poster (saves mobile bandwidth).
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setShowVideo(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  return (
    <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
      {showVideo ? (
        <video
          className={MEDIA}
          poster="/bg-hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/bg-hero.webm" type="video/webm" />
          <source src="/bg-hero.mp4" type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={MEDIA} src="/bg-hero-poster.jpg" alt="" />
      )}

      {/* White scrims: mute the clip, keep the founder fade-to-white + dark text readable. */}
      <div className="absolute inset-0 bg-paper/25" />
      <div className="absolute inset-0 [background:radial-gradient(58%_48%_at_50%_36%,#fff_0%,rgba(255,255,255,0.5)_48%,transparent_80%)]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
    </div>
  );
}
