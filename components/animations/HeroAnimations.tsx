"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function useHeroAnimations() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(titleRef.current, {
        type: "lines,chars",
        linesClass: "hero-line",
      });

      const chars = split.chars as HTMLElement[];

      gsap.set(chars, {
        opacity: 0,
        y: "1em",
        willChange: "transform, opacity",
      });

      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 16, willChange: "transform, opacity" });
      }

      gsap.set(".hero-cta", {
        opacity: 0,
        y: 16,
        scale: 0.96,
        willChange: "transform, opacity",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Typewriter (still main animation)
      tl.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.015,
      });

      // SUBTITLE: Start sooner + animate faster
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,      // faster
        },
        "-=0.4"               // start almost halfway through typewriter
      );

      // BUTTONS: Start earlier + animate faster
      tl.to(
        ".hero-cta",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.1,      // faster
          stagger: 0,
        },
        "-=0.3"               // overlap subtitle a bit
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return { rootRef, titleRef, subtitleRef };
}
