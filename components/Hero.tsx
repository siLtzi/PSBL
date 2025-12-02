"use client";

import { ArrowBigRightDash } from "lucide-react";
import { scienceGothic, exo2 } from "@/app/fonts";
import { useHeroAnimations } from "@/components/animations/HeroAnimations";

export type HeroContent = {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  videoUrl: string;
};

// Allow line break AFTER the hyphen: "POHJOIS-<wbr />SUOMEN"
function fixHyphenWrap(str: string) {
  return str.replace(/(\w+)-(\w+)/g, "$1-<wbr />$2");
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
        {/* CENTER EVERYTHING */}
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
              sm:px-[8vw]
              pb-20
              md:pb-24
            "
          >
            {/* TITLE */}
            <h1
              ref={titleRef}
              className={`
                ${scienceGothic.className}
                text-[9vw]
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                xl:text-8xl
                font-bold
                sm:font-black
                leading-tight
                sm:leading-[1.1]
                tracking-[-0.02em]
                text-balance
                drop-shadow-2xl
              `}
            >
              {/* Line 1 with smart hyphen wrapping */}
              <span
                className="block whitespace-normal"
                dangerouslySetInnerHTML={{
                  __html: fixHyphenWrap(titleLine1),
                }}
              />

              {/* Line 2 also gets the same treatment, just in case */}
              <span
                className="block whitespace-normal"
                dangerouslySetInnerHTML={{
                  __html: fixHyphenWrap(titleLine2),
                }}
              />
            </h1>

            {/* SUBTITLE */}
            <p
              ref={subtitleRef}
              className={`
                ${exo2.className}
                mt-4
                text-sm
                sm:text-lg
                md:text-xl
                lg:text-3xl
                font-medium
                text-zinc-100
                max-w-3xl
                mx-auto
                drop-shadow-lg
              `}
            >
              {subtitle}
            </p>

            {/* BUTTONS */}
            <div
              className={`
                ${scienceGothic.className}
                mt-8
                sm:mt-10
                flex
                flex-col
                items-center
                gap-3
                sm:gap-4
                sm:flex-row
                sm:justify-center
                w-full
              `}
            >
              {/* PRIMARY CTA */}
              <a
                href={primaryCtaHref}
                className="
                  hero-cta
                  relative
                  inline-flex
                  items-center
                  justify-start
                  py-3.5
                  pl-6
                  pr-14
                  sm:py-4
                  sm:pl-8
                  sm:pr-16
                  overflow-hidden
                  font-bold
                  text-sm
                  sm:text-base
                  text-zinc-900
                  transition-all
                  duration-150
                  ease-in-out
                  rounded-xl
                  bg-yellow-400
                  group
                  hover:pl-10
                  hover:pr-10
                  sm:hover:pl-12
                  sm:hover:pr-12
                  w-full
                  sm:w-auto
                  max-w-xs
                "
              >
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-zinc-900 group-hover:h-full" />
                <span className="absolute right-0 pr-6 duration-200 ease-out group-hover:translate-x-12">
                  <ArrowBigRightDash className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <span className="absolute left-0 pl-4 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                  <ArrowBigRightDash className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                </span>
                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white uppercase tracking-wide">
                  {primaryCtaLabel}
                </span>
              </a>

              {/* SECONDARY CTA */}
              <a
                href={secondaryCtaHref}
                className="
                  hero-cta
                  relative
                  inline-flex
                  items-center
                  justify-start
                  py-3.5
                  pl-6
                  pr-14
                  sm:py-4
                  sm:pl-8
                  sm:pr-16
                  overflow-hidden
                  font-bold
                  text-sm
                  sm:text-base
                  text-white
                  transition-all
                  duration-150
                  ease-in-out
                  rounded-xl
                  border
                  border-zinc-200/50
                  bg-black/40
                  backdrop-blur-sm
                  group
                  hover:pl-10
                  hover:pr-10
                  sm:hover:pl-12
                  sm:hover:pr-12
                  w-full
                  sm:w-auto
                  max-w-xs
                "
              >
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-zinc-100 group-hover:h-full" />
                <span className="absolute right-0 pr-6 duration-200 ease-out group-hover:translate-x-12">
                  <ArrowBigRightDash className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <span className="absolute left-0 pl-4 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                  <ArrowBigRightDash className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
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