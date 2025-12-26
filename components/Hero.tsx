"use client"; 
// This marks the component as a CLIENT COMPONENT in Next.js.
// Needed because we use hooks, refs, and GSAP animations.

import { ArrowBigRightDash } from "lucide-react";
// Icon for the CTA buttons.

import { scienceGothic, exo2 } from "@/app/fonts";
// Custom fonts loaded via Next.js font system.

import { useHeroAnimations } from "@/components/animations/HeroAnimations";
// Our GSAP hook that animates title + subtitle when hero loads.

// Helper to strip Sanity Stega characters (invisible JSON)
// so they don't break GSAP SplitText or string splitting.
function clean(text: string) {
  if (!text) return text;
  return text.replace(/[\u200b\u200c\u200d\u2060\ufeff]/g, "");
}

export type HeroContent = {
  // Structure of the data the Hero component expects.
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  videoUrl: string;
  posterUrl?: string;
  heroMessage?: string;
};

// ---------------------------------------------------------------------------
// SPLIT LOGIC FOR "POHJOIS-" AND "SUOMEN"
// ---------------------------------------------------------------------------
// Many Finnish names have hyphens. We want:
//
// Desktop: "POHJOIS-SUOMEN" on ONE line
// Mobile:  "POHJOIS-" (line break) "SUOMEN"
//
// This function checks for "-" and splits the string cleanly.
function SplitTitle({ text }: { text: string }) {
  if (!text.includes("-")) return <span>{text}</span>;

  const [part1, part2] = text.split("-");

  return (
    <>
      {/* First half, always kept together */}
      <span className="inline-block whitespace-nowrap">{part1}-</span>

      {/* Mobile forces a new line. Desktop hides it. */}
      <br className="block sm:hidden" />

      {/* Second half, also kept together */}
      <span className="inline-block whitespace-nowrap">{part2}</span>
    </>
  );
}

export default function Hero({ content }: { content: HeroContent }) {
  // Destructure content for cleaner usage.
  const {
    titleLine1,
    titleLine2,
    subtitle,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    videoUrl,
    posterUrl,
    heroMessage,
  } = content;

  // Pull in animation refs (GSAP):
  // - rootRef: main wrapper
  // - titleRef: animates the logo/title
  // - subtitleRef: animates the subtitle
  const { rootRef, titleRef, subtitleRef } = useHeroAnimations();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-zinc-50">
      {/* BACKGROUND VIDEO */}
      {/* Covers entire hero section with autoplaying video. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={posterUrl}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Fade gradient overlay to improve readability on top of the video */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center">
          
          {/* MAIN CONTENT (center aligned) */}
          <div
            ref={rootRef} // GSAP animates items inside this container
            className="
              flex w-full flex-col items-center text-center 
              px-2 sm:px-0 pb-20 md:pb-24
            "
          >
            {/* --------------------------------------------- */}
            {/* HERO MESSAGE (Optional) */}
            {/* --------------------------------------------- */}
            {heroMessage && (
              <div className={`
                ${exo2.className}
                mb-6 inline-flex items-center rounded-full 
                border border-zinc-50/30 bg-zinc-900/50 
                px-4 py-1.5 text-sm text-zinc-200 
                backdrop-blur-sm sm:text-base
              `}>
                {heroMessage}
              </div>
            )}

            {/* --------------------------------------------- */}
            {/* TITLE (H1) */}
            {/* --------------------------------------------- */}
            <h1
              ref={titleRef} // GSAP target: title fades/slides in
              className={`
                ${scienceGothic.className}
                font-bold sm:font-black
                uppercase
                text-balance
                flex flex-col items-center
                drop-shadow-2xl
              `}
            >
              {/* FIRST LINE (e.g., POHJOIS-SUOMEN) */}
              <div
                className="
                  leading-[0.9] tracking-tighter
                  text-[13vw]              /* Very large on mobile */
                  sm:text-5xl md:text-6xl  /* Standard on desktop */
                  lg:text-7xl xl:text-8xl
                  sm:leading-[1.1]
                "
              >
                <SplitTitle text={clean(titleLine1)} />
              </div>

              {/* SECOND LINE (e.g., BETONILATTIAT) */}
              <div
                className="
                  leading-[0.9] tracking-tighter
                  whitespace-nowrap
                  mt-1 sm:mt-0
                  text-[8.5vw]            /* Slightly smaller on mobile */
                  sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                "
              >
                {clean(titleLine2)}
              </div>
            </h1>

            {/* --------------------------------------------- */}
            {/* SUBTITLE */}
            {/* --------------------------------------------- */}
            <p
              ref={subtitleRef} // GSAP target: subtitle animates after title
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

            {/* --------------------------------------------- */}
            {/* CTA BUTTONS */}
            {/* --------------------------------------------- */}
            <div
              className={`
                ${scienceGothic.className}
                mt-8 sm:mt-12
                flex flex-col sm:flex-row items-center justify-center
                gap-4 w-full px-4
              `}
            >
              {/* PRIMARY CTA: yellow button */}
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
                {/* Hover background growth animation */}
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-zinc-900 group-hover:h-full" />

                {/* Arrow sliding OUT on hover */}
                <span className="absolute right-0 pr-6 duration-200 ease-out group-hover:translate-x-12">
                  <ArrowBigRightDash className="w-6 h-6" />
                </span>

                {/* Arrow sliding IN on hover */}
                <span className="absolute left-0 pl-4 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                  <ArrowBigRightDash className="w-6 h-6 text-yellow-400" />
                </span>

                {/* Button text */}
                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white uppercase tracking-wide">
                  {primaryCtaLabel}
                </span>
              </a>

              {/* SECONDARY CTA: transparent button */}
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
                {/* Animated hover background */}
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-zinc-100 group-hover:h-full" />

                {/* Arrow sliding OUT */}
                <span className="absolute right-0 pr-6 duration-200 ease-out group-hover:translate-x-12">
                  <ArrowBigRightDash className="w-6 h-6" />
                </span>

                {/* Arrow sliding IN */}
                <span className="absolute left-0 pl-4 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                  <ArrowBigRightDash className="w-6 h-6 text-black" />
                </span>

                {/* Text */}
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
