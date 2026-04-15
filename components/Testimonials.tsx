"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { barlowCondensed, barlow } from "@/app/fonts";
import { Star } from "lucide-react";

export type TestimonialItem = {
  _id: string;
  name: string;
  location?: string | null;
  company?: string | null;
  projectType?: string | null;
  quote: string;
  rating?: number | null;
  date?: string | null;
};

export default function Testimonials({
  items,
}: {
  items: TestimonialItem[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);

  if (!items.length) return null;

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    updateScrollState();
  }, [items.length, updateScrollState]);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("article")?.offsetWidth ?? 400;
    const scrollStep = cardWidth + 3;
    const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);

    if (dir === "right") {
      if (el.scrollLeft >= maxScrollLeft - 2) {
        el.scrollTo({ left: 0, behavior: "auto" });
        return;
      }
      el.scrollTo({
        left: Math.min(el.scrollLeft + scrollStep, maxScrollLeft),
        behavior: "smooth",
      });
      return;
    }

    if (el.scrollLeft <= 2) {
      el.scrollTo({ left: maxScrollLeft, behavior: "auto" });
      return;
    }
    el.scrollTo({
      left: Math.max(el.scrollLeft - scrollStep, 0),
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (items.length < 2 || isAutoplayPaused || !isInView) return;
    const id = window.setInterval(() => scroll("right"), 5000);
    return () => window.clearInterval(id);
  }, [isAutoplayPaused, isInView, items.length, scroll]);

  return (
    <section
      ref={sectionRef}
      className="py-20 border-t-[3px] border-[var(--steel)]"
      id="arvostelut"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4 px-6 md:px-12">
        <div>
          <div
            className={`${barlow.className} text-[0.65rem] font-semibold tracking-[3px] uppercase text-[var(--yellow)] mb-4 flex items-center gap-3`}
          >
            <span className="text-[var(--concrete-gray)]">{"//"}</span>
            Asiakkaat
          </div>
          <h2
            className={`${barlowCondensed.className} font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase tracking-[2px] leading-[0.95] text-[var(--off-white)]`}
          >
            Mitä asiakkaamme
            <br />
            sanovat.
          </h2>
        </div>

        <div className="flex items-center gap-3">
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
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={updateScrollState}
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
          onTouchStart={() => setIsAutoplayPaused(true)}
          onTouchEnd={() => setIsAutoplayPaused(false)}
          onTouchCancel={() => setIsAutoplayPaused(false)}
          className="flex gap-[3px] overflow-x-auto scroll-smooth snap-x snap-mandatory pl-6 md:pl-12 pr-6 md:pr-12 no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((t) => (
            <article
              key={t._id}
              className="shrink-0 snap-start w-[85vw] sm:w-[45vw] lg:w-[30vw] xl:w-[22vw] p-8 md:p-10 bg-[var(--panel)] border-t-[3px] border-[var(--yellow)] hover:bg-[var(--steel)] transition-all duration-400 flex flex-col"
            >
              {/* Stars */}
              {t.rating && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.rating!
                          ? "fill-[var(--yellow)] text-[var(--yellow)]"
                          : "text-[var(--concrete-gray)]"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Quote */}
              <p className="text-[0.9rem] text-[var(--light)] leading-[1.8] mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-[var(--steel)] pt-4 mt-auto">
                <div
                  className={`${barlowCondensed.className} font-extrabold text-[1.1rem] uppercase tracking-[1px] text-[var(--off-white)]`}
                >
                  {t.name}
                </div>
                {t.company && (
                  <div
                    className={`${barlowCondensed.className} font-bold text-[0.9rem] uppercase tracking-[1px] text-[var(--off-white)] mt-1`}
                  >
                    {t.company}
                  </div>
                )}
                {(t.projectType || t.location) && (
                  <div className="text-[0.7rem] text-[var(--mid)] mt-2 flex flex-col gap-0.5">
                    {t.projectType && <span>{t.projectType}</span>}
                    {t.location && <span>{t.location}</span>}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
