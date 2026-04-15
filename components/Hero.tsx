"use client";

import { barlowCondensed, barlow } from "@/app/fonts";

function clean(text: string) {
  if (!text) return text;
  return text.replace(/[\u200b\u200c\u200d\u2060\ufeff]/g, "");
}

export type HeroContent = {
  titleLine1: string;
  titleLine2: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroHeadingLine3: string;
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
    heroHeadingLine1,
    heroHeadingLine2,
    heroHeadingLine3,
    subtitle,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    videoUrl,
  } = content;

  return (
    <section className="relative mt-[60px] h-[calc(100vh-60px)] min-h-[650px] grid grid-cols-1 md:grid-cols-[auto_1fr] overflow-hidden bg-[var(--black)]">
      {/* ── Left content panel ── */}
      <div className="relative z-[5] flex flex-col justify-end md:justify-center p-6 md:py-16 md:pl-12 md:pr-8 bg-transparent md:bg-[var(--black)]">
        {/* Label */}
        <div
          className={`
            ${barlow.className}
            text-[0.7rem] font-semibold tracking-[3px] uppercase
            text-[var(--yellow)] mb-8 flex items-center gap-4
            opacity-0 animate-[heroFadeIn_0.5s_0.2s_forwards]
          `}
        >
          <span className="hero-label-line" />
          {clean(titleLine1)} {clean(titleLine2)}
        </div>

        {/* H1 — per-line reveal */}
        <h1 className={`${barlowCondensed.className} mb-10`}>
          {/* Line 1 */}
          <span className="hero-line-clip block font-black text-[clamp(4rem,9vw,8.5rem)] leading-[0.92] uppercase tracking-[2px] text-[var(--off-white)]">
            <span className="hero-line-inner">{clean(heroHeadingLine1)}</span>
          </span>
          {/* Line 2 (highlighted) */}
          <span className="hero-line-clip block font-black text-[clamp(4rem,9vw,8.5rem)] leading-[0.92] uppercase tracking-[2px] text-[var(--off-white)]">
            <span className="hero-line-inner">
              <span className="hero-highlight inline-block relative">
                <span className="hero-highlight-bg" />
                <span className="hero-highlight-text-base">{clean(heroHeadingLine2)}</span>
                <span aria-hidden="true" className="hero-highlight-text-overlay">
                  {clean(heroHeadingLine2)}
                </span>
              </span>
            </span>
          </span>
          {/* Line 3 */}
          <span className="hero-line-clip block font-black text-[clamp(4rem,9vw,8.5rem)] leading-[0.92] uppercase tracking-[2px] text-[var(--off-white)]">
            <span className="hero-line-inner">{clean(heroHeadingLine3)}</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`
            ${barlow.className}
            text-[1.1rem] font-normal text-[var(--light)]
            max-w-[460px] leading-[1.8] mb-10
            opacity-0 animate-[slideIn_0.6s_0.85s_forwards]
          `}
        >
          {subtitle}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[slideIn_0.6s_1s_forwards]">
          <a
            href={primaryCtaHref}
            className={`
              ${barlowCondensed.className}
              button-cta button-cta-arrow button-cta-fill-yellow group
              inline-flex items-center px-8 py-4 font-extrabold text-[0.85rem]
              tracking-[2.5px] uppercase cursor-pointer
              bg-(--yellow) text-(--black)
            `}
          >
            <span className="button-cta-label">{primaryCtaLabel}</span>
            <span aria-hidden="true" className="button-cta-icon-out">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
            <span aria-hidden="true" className="button-cta-icon-in">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
          <a
            href={secondaryCtaHref}
            className={`
              ${barlowCondensed.className}
              button-cta button-cta-fill-soft-yellow group
              inline-flex items-center gap-2.5
              px-8 py-4 font-extrabold text-[0.85rem]
              tracking-[2.5px] uppercase cursor-pointer
              bg-transparent text-(--off-white)
              border-2 border-(--concrete-gray)
              hover:border-(--yellow) hover:text-(--yellow)
            `}
          >
            <span className="button-cta-label">{secondaryCtaLabel}</span>
          </a>
        </div>
      </div>

      {/* ── Right image / video panel with diagonal clip ── */}
      <div className="hero-right-clip absolute inset-0 md:relative md:inset-auto overflow-hidden">
        <video
          className="w-full h-full object-cover contrast-[1.15] saturate-[0.75] brightness-[0.55] scale-105"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>

      {/* Hazard stripe at bottom */}
      <div className="hazard-stripe absolute bottom-0 left-0 right-0 z-10" />

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 right-12 z-10 hidden md:flex flex-col items-center gap-2 opacity-0"
        style={{ animation: "heroFadeIn 0.5s 1.5s forwards" }}
      >
        <span
          className="w-px h-10 bg-[var(--yellow)]"
          style={{ animation: "heroScrollPulse 2s ease-in-out infinite" }}
        />
        <span className={`${barlow.className} text-[0.55rem] font-semibold tracking-[2px] uppercase text-[var(--mid)] [writing-mode:vertical-rl]`}>
          Vieritä
        </span>
      </div>
    </section>
  );
}
