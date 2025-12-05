"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { scienceGothic, exo2 } from "@/app/fonts";
import { ArrowBigRightDash } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function BottomCta() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Triggers slightly earlier for better flow
          toggleActions: "play none none none",
          once: true,
        },
      });

      // 1. Headline: Premium "Blur-Up" Reveal
      tl.from(".bottom-cta-headline", {
        y: 40,
        opacity: 0,
        filter: "blur(12px)", // The cinematic blur effect
        duration: 1,
        ease: "power3.out",
      })
      // 2. Body: Follows slightly faster, also with blur
      .from(
        ".bottom-cta-body",
        {
          y: 20,
          opacity: 0,
          filter: "blur(5px)",
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8" // Overlap aggressively for a seamless feel
      );
      
      // BUTTON ANIMATION REMOVED entirely per request
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-zinc-100 text-zinc-900 py-16 md:py-20 relative z-0"
    >
      <div className="mx-auto max-w-3xl px-4 text-center">
        {/* Headline */}
        <h2
          className={`
            ${scienceGothic.className}
            bottom-cta-headline
            text-3xl sm:text-4xl md:text-5xl font-black mb-6
            tracking-tight
          `}
        >
          TEHDÄÄNKÖ TARJOUS URAKALLESI?
        </h2>

        {/* Body */}
        <p
          className={`
            ${exo2.className}
            bottom-cta-body
            text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-zinc-600 font-medium
          `}
        >
          Meidän kauttamme saat betonilattiatyön, kuljetuksen ja pumppauksen
          helposti samassa paketissa kiinteällä hinnalla.
        </p>

        {/* CTA button - No GSAP, pure CSS Hover */}
        <Link
          href="/yhteystiedot"
          className={`
            ${scienceGothic.className}
            relative inline-flex items-center justify-start
            w-full sm:w-auto max-w-xs
            py-4 pl-8 pr-16
            overflow-hidden font-bold
            text-zinc-900 transition-all duration-300 ease-in-out
            bg-yellow-400 rounded-xl group
            hover:pl-12 hover:pr-12
            shadow-[0_12px_30px_rgba(250,204,21,0.35)]
            hover:shadow-[0_20px_40px_rgba(250,204,21,0.5)]
            z-10
          `}
        >
          {/* dark fill rising */}
          <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-300 ease-in-out bg-zinc-900 group-hover:h-full" />

          {/* arrow sliding right */}
          <span className="absolute right-0 pr-6 duration-300 ease-out group-hover:translate-x-12">
            <ArrowBigRightDash className="w-6 h-6" />
          </span>

          {/* arrow entering from left */}
          <span className="absolute left-0 pl-4 -translate-x-12 group-hover:translate-x-0 duration-300 ease-out">
            <ArrowBigRightDash className="w-6 h-6 text-yellow-400" />
          </span>

          {/* text */}
          <span className="relative w-full text-left transition-colors duration-300 ease-in-out group-hover:text-white">
            YHTEYSTIEDOT
          </span>
        </Link>
      </div>
    </section>
  );
}