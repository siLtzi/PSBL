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

// This helper splits the text by hyphen and ensures the pieces
// NEVER break inside the word (fixing the "N" issue),
// but ALWAYS break after the hyphen on mobile.
function SplitText({ text }: { text: string }) {
  if (!text.includes("-")) {
    return <span className="whitespace-nowrap">{text}</span>;
  }

  const parts = text.split("-");
  // We assume the first part includes the hyphen visually
  const firstPart = parts[0] + "-";
  const secondPart = parts[1];

  return (
    <>
      {/* Part 1: "POHJOIS-" */}
      <span className="whitespace-nowrap inline-block">
        {firstPart}
      </span>
      
      {/* The Break: Visible on mobile (block), hidden on desktop */}
      <br className="block sm:hidden" />
      
      {/* Part 2: "SUOMEN" */}
      <span className="whitespace-nowrap inline-block">
        {secondPart}
      </span>
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
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center">
          <div
            ref={rootRef}
            className="
              flex
              w-full
              flex-col
              items-center
              text-center
              px-4
              sm:px-0
              pb-20
              md:pb-24
            "
          >
            {/* TITLE */}
            <h1
              ref={titleRef}
              className={`
                ${scienceGothic.className}
                /* MOBILE FONT SIZE: */
                /* Reduced from 13vw to 11vw to ensure BETONILATTIAT fits without breaking */
                text-[11vw]
                
                /* DESKTOP FONT SIZES: */
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
                xl:text-9xl
                
                font-bold
                sm:font-black
                leading-[0.9]
                sm:leading-[1.1]
                tracking-[-0.02em]
                drop-shadow-2xl
                uppercase
                flex
                flex-col
                items-center
                w-full
              `}
            >
              {/* Line 1: Handle the hyphen split manually */}
              <div className="block">
                 <SplitText text={titleLine1} />
              </div>

              {/* Line 2: Ensure it doesn't wrap locally if possible */}
              <span className="block whitespace-nowrap mt-1 sm:mt-0">
                {titleLine2}
              </span>
            </h1>

            {/* SUBTITLE */}
            <p
              ref={subtitleRef}
              className={`
                ${exo2.className}
                mt-6
                text-base
                sm:text-lg
                md:text-xl
                lg:text-2xl
                font-medium
                text-zinc-200
                max-w-[90%]
                sm:max-w-2xl
                mx-auto
                drop-shadow-lg
                leading-relaxed
              `}
            >
              {subtitle}
            </p>

            {/* BUTTONS */}
            <div
              className={`
                ${scienceGothic.className}
                mt-8
                sm:mt-12
                flex
                flex-col
                items-center
                gap-4
                sm:flex-row
                sm:justify-center
                w-full
                px-4
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