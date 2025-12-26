"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { scienceGothic, exo2 } from "@/app/fonts";

export type ReferenceItem = {
  _key?: string;
  imageUrl: string;
  caption?: string;
  tag?: string;
  location?: string;
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
  const { heading, subheading, items } = content;

  // Hide if Sanity has no items yet
  if (!items || items.length === 0) return null;

  // Duplicate items so GSAP can scroll seamlessly (like an infinite tape)
  const shouldLoop = items.length >= 3;
  const loopItems = shouldLoop ? [...items, ...items] : items;

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    // 🔸 if not enough items, skip marquee animation
    if (items.length < 3) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      gsap.set(track, { xPercent: 0 });

      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      const handleEnter = () => tween.pause();
      const handleLeave = () => tween.resume();

      track.addEventListener("mouseenter", handleEnter);
      track.addEventListener("mouseleave", handleLeave);

      return () => {
        track.removeEventListener("mouseenter", handleEnter);
        track.removeEventListener("mouseleave", handleLeave);
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-zinc-900 text-yellow-500 py-16 md:py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-[120rem] px-6 sm:px-10 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-12">
          <h2
            className={`
              ${scienceGothic.className}
              text-3xl sm:text-4xl md:text-5xl font-black tracking-tight
            `}
          >
            {heading}
          </h2>

          {subheading && (
            <p
              className={`
                ${exo2.className}
                mt-3 text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto
              `}
            >
              {subheading}
            </p>
          )}
        </div>

        {/* Marquee strip */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="
                flex gap-6 sm:gap-8
                w-max
                will-change-transform
              "
            >
              {loopItems.map((ref, index) => (
                <article
                  key={`${ref._key ?? "ref"}-${index}`}
                  className="
                    relative
                    w-[260px] sm:w-[320px]
                    h-[200px] sm:h-[220px]
                    rounded-xl overflow-hidden
                    bg-zinc-800
                    shadow-[0_10px_25px_rgba(0,0,0,0.45)]
                    group
                    shrink-0
                  "
                >
                  {/* Image */}
                  <Image
                    src={ref.imageUrl}
                    alt={ref.caption || ref.tag || "Referenssikohde"}
                    fill
                    sizes="(max-width: 768px) 260px, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dark gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Text overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 z-10">
                    {ref.tag && (
                      <p
                        className={`
                          ${exo2.className}
                          inline-flex items-center px-2.5 py-1 mb-2
                          text-[11px] font-semibold uppercase tracking-[0.18em]
                          rounded-full bg-yellow-400 text-zinc-900
                        `}
                      >
                        {ref.tag}
                      </p>
                    )}

                    {ref.caption && (
                      <p
                        className={`
    ${scienceGothic.className}
    text-sm sm:text-base font-bold text-zinc-50
    leading-snug
    uppercase tracking-wide
  `}
                      >
                        {ref.caption}
                      </p>
                    )}

                    {ref.location && (
                      <p
                        className={`
                          ${exo2.className}
                          mt-1 text-xs text-zinc-300
                        `}
                      >
                        {ref.location}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-900 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-900 to-transparent" />
        </div>
      </div>
    </section>
  );
}
