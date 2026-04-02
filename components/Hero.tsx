"use client";

import { barlowCondensed, barlow } from "@/app/fonts";

function clean(text: string) {
  if (!text) return text;
  return text.replace(/[\u200b\u200c\u200d\u2060\ufeff]/g, "");
}

export type HeroContent = {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  videoUrl: string;
  heroMessage?: string;
};

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

  return (
    <section className="relative mt-[60px] h-[calc(100vh-60px)] min-h-[600px] flex overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-[1]">
        <video
          className="w-full h-full object-cover contrast-[1.15] saturate-[0.7] brightness-[0.4] animate-[heroKen_25s_ease-in-out_infinite_alternate] origin-[30%_60%]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>

      {/* Hero content */}
      <div className="relative z-[5] flex flex-col justify-center items-start p-8 md:p-12 lg:p-16 w-full md:pl-[10%] lg:pl-[14%]">
        {/* Label */}
        <div className={`
          ${barlow.className}
          text-[0.7rem] font-semibold tracking-[3px] uppercase
          text-[var(--yellow)] mb-6 flex items-center gap-4
          animate-[slideIn_0.6s_0.2s_forwards] opacity-0
        `}>
          <span className="w-2 h-2 bg-[var(--yellow)] animate-[labelPulse_2s_ease-in-out_infinite]" />
          {clean(titleLine1)} {clean(titleLine2)}
        </div>

        {/* H1 */}
        <h1 className={`
          ${barlowCondensed.className}
          font-black uppercase tracking-[2px] text-[var(--off-white)]
          mb-8 animate-[slideIn_0.6s_0.4s_forwards] opacity-0
        `}>
          <span className="relative z-[2] block text-[clamp(3.2rem,7vw,6.5rem)] leading-none mb-[-0.15em] ml-[0.05em]" style={{ WebkitTextStroke: '2px var(--black)' }}>
            Valetaan
          </span>
          <span className="relative z-[1] inline-block text-[clamp(5.5rem,14vw,13rem)] leading-[0.85] text-[var(--black)] bg-[var(--yellow)] px-[0.2em] py-[0.02em] w-fit rotate-[-2deg] origin-left shadow-[6px_6px_0px_var(--steel),_inset_0_-4px_0_rgba(0,0,0,0.15)]">
            lattiat
          </span>
          <span className="block text-[clamp(3.2rem,7vw,6.5rem)] leading-none mt-[-0.1em] ml-[0.05em]" style={{ WebkitTextStroke: '2px var(--black)' }}>
            kuntoon.
          </span>
        </h1>

        {/* Subtitle */}
        <p className={`
          ${barlow.className}
          text-[1.25rem] font-normal text-[var(--light)]
          max-w-[540px] leading-[1.7] mb-10
          animate-[slideIn_0.6s_0.6s_forwards] opacity-0
        `}>
          {subtitle}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-[slideIn_0.6s_0.8s_forwards] opacity-0">
          <a
            href={primaryCtaHref}
            className={`
              ${barlowCondensed.className}
              inline-flex items-center gap-2.5
              px-8 py-4 font-extrabold text-[0.85rem]
              tracking-[2.5px] uppercase cursor-pointer
              bg-[var(--yellow)] text-[var(--black)]
              relative overflow-hidden
              transition-all duration-250
              hover:bg-[var(--yellow-hot)] hover:-translate-y-0.5
              hover:shadow-[0_6px_30px_rgba(240,192,0,0.4),_0_0_60px_rgba(240,192,0,0.1)]
            `}
          >
            {primaryCtaLabel}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a
            href={secondaryCtaHref}
            className={`
              ${barlowCondensed.className}
              inline-flex items-center gap-2.5
              px-8 py-4 font-extrabold text-[0.85rem]
              tracking-[2.5px] uppercase cursor-pointer
              bg-transparent text-[var(--off-white)]
              border-2 border-[var(--concrete-gray)]
              transition-all duration-250
              hover:border-[var(--yellow)] hover:text-[var(--yellow)]
              hover:-translate-y-0.5
            `}
          >
            {secondaryCtaLabel}
          </a>
        </div>
      </div>

      {/* Hazard stripe at bottom */}
      <div className="hazard-stripe absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
}
