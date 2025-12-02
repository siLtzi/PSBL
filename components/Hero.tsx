"use client";

import { ArrowBigRightDash } from "lucide-react";
import { scienceGothic, exo2 } from "@/app/fonts";
import { useHeroAnimations } from "@/components/animations/HeroAnimations";

export type HeroContent = {
  titleLine1: string; // e.g. "POHJOIS-SUOMEN"
  titleLine2: string; // e.g. "BETONILATTIAT"
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  videoUrl: string;
};

// 1. SPLIT LOGIC: Forces "POHJOIS-" and "SUOMEN" to stay as chunks.
// On Mobile: Forces a break between them.
// On Desktop: Sits on one line, but wraps cleanly between words if needed (never breaks the "N").
function SplitTitle({ text }: { text: string }) {
  if (!text.includes("-")) return <span>{text}</span>;
  const [part1, part2] = text.split("-");

  return (
    <>
      <span className="inline-block whitespace-nowrap">{part1}-</span>
      {/* Mobile: Force break. Desktop: Hide break (allow flex wrap) */}
      <br className="block sm:hidden" />
      <span className="inline-block whitespace-nowrap">{part2}</span>
    </>
  );
}

export default function Hero({ content }: { content: HeroContent }) {
  const {
    titleLine1,
    titleLine2,
    subtitle,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    videoUrl,
  } = content;

  const { rootRef, titleRef, subtitleRef } = useHeroAnimations();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-zinc-50">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center">
          <div
            ref={rootRef}
            className="
              flex w-full flex-col items-center text-center 
              px-2 sm:px-0 pb-20 md:pb-24
            "
          >
            {/* TITLE CONTAINER */}
            <h1
              ref={titleRef}
              className={`
                ${scienceGothic.className}
                font-bold sm:font-black
                uppercase
                text-balance
                flex flex-col items-center
                drop-shadow-2xl
              `}
            >
              {/* LINE 1 & 2: POHJOIS- SUOMEN */}
              <div
                className="
                  leading-[0.9] tracking-tighter
                  /* Mobile: Big text (13vw) looks good here because words are short */
                  text-[13vw] 
                  /* Desktop: Standard sizing */
                  sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                  sm:leading-[1.1]
                "
              >
                <SplitTitle text={titleLine1} />
              </div>

              {/* LINE 3: BETONILATTIAT */}
              {/* CRITICAL FIX: We make this SPECIFIC word smaller on mobile 
                  so it fits on one line (nowrap) without overflowing. 
                  (8.5vw fits 13 chars nicely, vs 13vw which explodes). 
              */}
              <div
                className="
                  leading-[0.9] tracking-tighter
                  whitespace-nowrap
                  mt-1 sm:mt-0
                  /* Mobile: Smaller text (8.5vw) to accommodate 13 characters */
                  text-[8.5vw]
                  /* Desktop: Matches the line above */
                  sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                "
              >
                {titleLine2}
              </div>
            </h1>

            {/* SUBTITLE */}
            <p
              ref={subtitleRef}
              className={`
                ${exo2.className}
                mt-6 text-base sm:text-lg md:text-xl lg:text-2xl
                font-medium text-zinc-200
                max-w-[90%] sm:max-w-2xl mx-auto
                drop-shadow-lg leading-relaxed
              `}
            >
              {subtitle}
            </p>

            {/* BUTTONS */}
            <div
              className={`
                ${scienceGothic.className}
                mt-8 sm:mt-12
                flex flex-col sm:flex-row items-center justify-center
                gap-4 w-full px-4
              `}
            >
              <a
                href={primaryCtaHref}
                className="
                  hero-cta relative inline-flex items-center justify-start 
                  py-4 pl-8 pr-16 overflow-hidden font-bold text-base 
                  text-zinc-900 transition-all duration-150 ease-in-out 
                  rounded-xl bg-yellow-400 group hover:pl-10 hover:pr-14 
                  w-full sm:w-auto max-w-xs
                "
              >
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-zinc-900 group-hover:h-full" />
                <span className="absolute right-0 pr-6 duration-200 ease-out group-hover:translate-x-12">
                  <ArrowBigRightDash className="w-6 h-6" />
                </span>
                <span className="absolute left-0 pl-4 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                  <ArrowBigRightDash className="w-6 h-6 text-yellow-400" />
                </span>
                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white uppercase tracking-wide">
                  {primaryCtaLabel}
                </span>
              </a>

              <a
                href={secondaryCtaHref}
                className="
                  hero-cta relative inline-flex items-center justify-start 
                  py-4 pl-8 pr-16 overflow-hidden font-bold text-base 
                  text-white transition-all duration-150 ease-in-out 
                  rounded-xl border border-zinc-200/50 bg-black/40 
                  backdrop-blur-sm group hover:pl-10 hover:pr-14 
                  w-full sm:w-auto max-w-xs
                "
              >
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-zinc-100 group-hover:h-full" />
                <span className="absolute right-0 pr-6 duration-200 ease-out group-hover:translate-x-12">
                  <ArrowBigRightDash className="w-6 h-6" />
                </span>
                <span className="absolute left-0 pl-4 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                  <ArrowBigRightDash className="w-6 h-6 text-black" />
                </span>
                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-black uppercase tracking-wide">
                  {secondaryCtaLabel}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}