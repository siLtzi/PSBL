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

    let ctx: gsap.Context;

    // Wait for fonts to be ready to prevent "wonky" split text
    document.fonts.ready.then(() => {
      ctx = gsap.context(() => {
        const split = new SplitText(titleRef.current, {
          type: "lines,chars",
          linesClass: "hero-line",
        });

        const chars = split.chars as HTMLElement[];

        // Remove "will-change" to prevent stutter/memory issues
        gsap.set(chars, {
          opacity: 0,
          y: "1em",
        });

        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, { opacity: 0, y: 16 });
        }

        gsap.set(".hero-cta", {
          opacity: 0,
          y: 16,
          scale: 0.96,
        });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Typewriter
        tl.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.8, // Slightly slower for smoother feel
          stagger: 0.02,
        });

        // SUBTITLE
        tl.to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.6"
        );

        // BUTTONS
        tl.to(
          ".hero-cta",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            stagger: 0.1,
          },
          "-=0.4"
        );
      }, rootRef);
    });

    return () => ctx?.revert();
  }, []);

  return { rootRef, titleRef, subtitleRef };
}
