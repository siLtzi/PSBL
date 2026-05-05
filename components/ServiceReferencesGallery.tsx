"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { barlow } from "@/app/fonts";
import { urlFor } from "@/sanity/lib/image";

type ReferenceItem = {
  _key: string;
  caption?: string | null;
  tag?: string | null;
  image?: any;
  videoUrl?: string | null;
};

type Props = {
  references: ReferenceItem[];
  serviceTitle: string;
};

export default function ServiceReferencesGallery({
  references,
  serviceTitle,
}: Props) {
  const [activeRef, setActiveRef] = useState<ReferenceItem | null>(null);

  return (
    <>
      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {references.map((ref) => {
          const hasVideo = !!ref.videoUrl;
          const hasImage = !!ref.image;
          if (!hasVideo && !hasImage) return null;

          return (
            <button
              key={ref._key}
              type="button"
              onClick={() => setActiveRef(ref)}
              className="
                group relative overflow-hidden border border-[var(--steel)]
                bg-[var(--panel)] text-left cursor-pointer
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--yellow)]
              "
            >
              <div className="relative h-52 w-full">
                {hasVideo ? (
                  <video
                    src={ref.videoUrl!}
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={urlFor(ref.image).width(900).url()}
                    alt={ref.caption || serviceTitle}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                {hasVideo && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              {(ref.caption || ref.tag) && (
                <div className="px-4 py-3">
                  {ref.tag && (
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--mid)] mb-1">
                      {ref.tag}
                    </p>
                  )}
                  {ref.caption && (
                    <p
                      className={`
                        ${barlow.className}
                        text-sm text-[var(--off-white)]
                      `}
                    >
                      {ref.caption}
                    </p>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* LIGHTBOX OVERLAY */}
      {activeRef && (activeRef.image || activeRef.videoUrl) && (
        <div
          className="
            fixed inset-0 z-[80] bg-black/80 
            flex items-center justify-center p-4
          "
          onClick={() => setActiveRef(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveRef(null)}
              className="
                absolute right-3 top-3 z-20
                inline-flex h-9 w-9 items-center justify-center
                rounded-full bg-black/70 text-zinc-100
                hover:bg-black hover:text-white
                transition-colors
              "
              aria-label="Sulje"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large media */}
            <div className="relative w-full h-[55vh] sm:h-[60vh] md:h-[70vh] overflow-hidden border border-[var(--steel)] bg-black">
              {activeRef.videoUrl ? (
                <video
                  src={activeRef.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={urlFor(activeRef.image).width(2000).url()}
                  alt={activeRef.caption || serviceTitle}
                  fill
                  sizes="(min-width: 1280px) 1280px, 95vw"
                  className="object-contain"
                />
              )}
            </div>

            {/* Caption */}
            {(activeRef.caption || activeRef.tag) && (
              <div className="mt-3 text-center">
                {activeRef.tag && (
                  <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-400 mb-1">
                    {activeRef.tag}
                  </p>
                )}
                {activeRef.caption && (
                  <p
                    className={`
                      ${barlow.className}
                      text-sm text-zinc-100
                    `}
                  >
                    {activeRef.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
