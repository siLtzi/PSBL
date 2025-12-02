"use client";

import { scienceGothic, exo2 } from "@/app/fonts";
import FinlandMap from "@/components/FinlandMap";
import { ArrowBigRightDash } from "lucide-react";

export type AboutContent = {
  headline: string;
  lead: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
};

export default function About({ content }: { content: AboutContent }) {
  const { headline, lead, body, ctaLabel, ctaHref } = content;

  return (
    <section className="relative w-full bg-zinc-100 text-zinc-900 py-16 md:py-28 overflow-hidden">
      {/* ---------------------- */}
      {/* TOP: CENTERED HEADLINE */}
      {/* ---------------------- */}
      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-16 text-center mb-12 md:mb-16">
        <h2
          className={`
            ${scienceGothic.className}
            /* FIX: Responsive font sizing for long Finnish headers */
            text-2xl 
            xs:text-3xl
            sm:text-4xl 
            md:text-5xl 
            lg:text-5xl
            font-black 
            leading-tight 
            tracking-tight
            break-words
            hyphens-auto
            uppercase
          `}
        >
          {headline}
        </h2>
      </div>

      {/* ----------------------------- */}
      {/* MAIN GRID: LEFT TEXT + RIGHT MAP */}
      {/* ----------------------------- */}
      <div
        className="
          mx-auto max-w-[110rem]
          px-4 sm:px-8 lg:px-16
          grid gap-12 lg:gap-20
          lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] /* Ensures columns don't overflow */
          items-center
        "
      >
        {/* LEFT SIDE — TEXT */}
        <div className="min-w-0">
          <div className="h-1 w-16 rounded-full bg-yellow-400 mb-6" />

          <p
            className={`
              ${exo2.className}
              text-lg sm:text-2xl md:text-3xl font-semibold text-zinc-800 mb-4
              break-words
            `}
          >
            {lead}
          </p>

          <p
            className={`
              ${exo2.className}
              text-sm sm:text-lg text-zinc-600 leading-relaxed max-w-prose
            `}
          >
            {body}
          </p>

          {/* CTA BUTTON */}
          <a
            href={ctaHref}
            className={`
              ${scienceGothic.className}
              relative inline-flex items-center justify-start
              w-full sm:w-auto max-w-xs
              py-4 pl-8 pr-16
              overflow-hidden font-bold
              text-zinc-900 transition-all duration-150 ease-in-out
              bg-yellow-400 rounded-xl group
              hover:pl-12 hover:pr-12
              mt-8 shadow-[0_12px_30px_rgba(250,204,21,0.35)]
            `}
          >
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 bg-zinc-900 group-hover:h-full" />

            <span className="absolute right-0 pr-6 duration-200 ease-out group-hover:translate-x-12">
              <ArrowBigRightDash className="w-6 h-6" />
            </span>

            <span className="absolute left-0 pl-4 -translate-x-12 duration-200 ease-out group-hover:translate-x-0">
              <ArrowBigRightDash className="w-6 h-6 text-yellow-400" />
            </span>

            <span className="relative w-full text-left transition-colors duration-200 group-hover:text-white uppercase">
              {ctaLabel}
            </span>
          </a>
        </div>

        {/* RIGHT SIDE — MAP */}
        <div className="min-w-0 flex justify-center relative">
          {/* Added max-width constraint specifically for mobile */}
          <div className="w-full max-w-[80vw] sm:max-w-[500px]">
             <FinlandMap className="w-full h-auto drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}