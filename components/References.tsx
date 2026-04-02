"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { barlowCondensed, ibmPlexMono } from "@/app/fonts";

export type ReferenceItem = {
  _key?: string;
  imageUrl?: string;
  caption?: string;
  tag?: string;
  location?: string;
  sizeM2?: number;
  excerpt?: string;
};

export type ReferencesContent = {
  heading: string;
  subheading?: string;
  items: ReferenceItem[];
};

export default function References({
  content,
}: {
  content: ReferencesContent;
}) {
  const { heading, items } = content;
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (!items || items.length === 0) return null;

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("article")?.offsetWidth ?? 400;
    el.scrollBy({ left: dir === "left" ? -cardWidth - 3 : cardWidth + 3, behavior: "smooth" });
  };

  return (
    <section
      className="py-20 border-t-[3px] border-[var(--steel)]"
      id="referenssit"
    >
      {/* Section header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4 px-6 md:px-12">
        <div>
          <div
            className={`${ibmPlexMono.className} text-[0.65rem] font-semibold tracking-[3px] uppercase text-[var(--yellow)] mb-4 flex items-center gap-3`}
          >
            <span className="text-[var(--concrete-gray)]">{"//"}</span>
            Referenssit
          </div>
          <h2
            className={`${barlowCondensed.className} font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase tracking-[2px] leading-[0.95] text-[var(--off-white)]`}
          >
            {heading || "Viimeaikaiset kohteet."}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Arrow buttons */}
          <button
            onClick={() => scroll("left")}
            aria-label="Edellinen"
            className={`w-11 h-11 flex items-center justify-center border border-[var(--steel)] text-[var(--light)] transition-all duration-300 ${
              canScrollLeft
                ? "hover:border-[var(--yellow)] hover:text-[var(--yellow)] cursor-pointer"
                : "opacity-30 cursor-default"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Seuraava"
            className={`w-11 h-11 flex items-center justify-center border border-[var(--steel)] text-[var(--light)] transition-all duration-300 ${
              canScrollRight
                ? "hover:border-[var(--yellow)] hover:text-[var(--yellow)] cursor-pointer"
                : "opacity-30 cursor-default"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <Link
            href="/referenssit"
            className={`${ibmPlexMono.className} text-xs tracking-[2px] uppercase text-[var(--yellow)] border border-[var(--yellow)] px-5 py-2.5 hover:bg-[var(--yellow)] hover:text-[var(--black)] transition-all duration-300 shrink-0 hidden sm:block`}
          >
            Kaikki kohteet →
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={updateScrollState}
          className="flex gap-[3px] overflow-x-auto scroll-smooth pl-6 md:pl-12 pr-6 md:pr-12 no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((ref, index) => (
            <article
              key={ref._key ?? `ref-${index}`}
              className="relative overflow-hidden bg-[var(--black)] group cursor-pointer shrink-0 w-[85vw] sm:w-[45vw] lg:w-[30vw] xl:w-[22vw] aspect-[3/4]"
            >
              {ref.imageUrl ? (
                <Image
                  src={ref.imageUrl}
                  alt={ref.caption || ref.tag || "Referenssikohde"}
                  fill
                  sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw"
                  className="object-cover grayscale-[40%] brightness-[0.5] transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-[0.35] group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-[var(--panel)]" />
              )}

              {/* Hover border */}
              <div className="absolute inset-0 border-0 border-[var(--yellow)] transition-all duration-300 pointer-events-none z-[3] group-hover:border-2" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 z-[2]">
                {ref.tag && (
                  <span
                    className={`${ibmPlexMono.className} inline-block text-[0.55rem] tracking-[2px] uppercase bg-[var(--yellow)] text-[var(--black)] px-2 py-0.5 mb-2 w-fit font-semibold`}
                  >
                    {ref.tag}
                  </span>
                )}

                {ref.caption && (
                  <h3
                    className={`${barlowCondensed.className} font-extrabold text-lg uppercase tracking-[1.5px] text-[var(--off-white)] leading-[1.1]`}
                  >
                    {ref.caption}
                  </h3>
                )}

                <div
                  className={`${ibmPlexMono.className} mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6rem] tracking-[1px] text-[var(--light)]`}
                >
                  {ref.location && <span>{ref.location}</span>}
                  {typeof ref.sizeM2 === "number" && ref.sizeM2 > 0 && (
                    <span>{ref.sizeM2} m²</span>
                  )}
                </div>
              </div>

              {/* Yellow bottom stripe */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--yellow)] z-[4] scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
            </article>
          ))}
        </div>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--dark)] to-transparent z-[5]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--dark)] to-transparent z-[5]" />
      </div>

      {/* Mobile "all references" link */}
      <div className="mt-8 px-6 md:px-12 sm:hidden">
        <Link
          href="/referenssit"
          className={`${ibmPlexMono.className} text-xs tracking-[2px] uppercase text-[var(--yellow)] border border-[var(--yellow)] px-5 py-2.5 hover:bg-[var(--yellow)] hover:text-[var(--black)] transition-all duration-300 inline-block`}
        >
          Kaikki kohteet →
        </Link>
      </div>
    </section>
  );
}
