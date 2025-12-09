"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { exo2 } from "@/app/fonts";
import { urlFor } from "@/sanity/lib/image";

type ReferenceItem = {
  _key: string;
  caption?: string | null;
  tag?: string | null;
  image?: any;
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
          if (!ref.image) return null;
          const refUrl = urlFor(ref.image).width(900).url();

          return (
            <button
              key={ref._key}
              type="button"
              onClick={() => setActiveRef(ref)}
              className="
                group relative overflow-hidden rounded-xl border border-zinc-200 
                bg-zinc-50 shadow-sm text-left
                focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400
              "
            >
              <div className="relative h-52 w-full">
                <Image
                  src={refUrl}
                  alt={ref.caption || serviceTitle}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              {(ref.caption || ref.tag) && (
                <div className="px-4 py-3">
                  {ref.tag && (
                    <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500 mb-1">
                      {ref.tag}
                    </p>
                  )}
                  {ref.caption && (
                    <p
                      className={`
                        ${exo2.className}
                        text-sm text-zinc-800
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
      {activeRef && activeRef.image && (
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
              aria-label="Sulje kuva"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large image */}
            <div className="relative w-full h-[55vh] sm:h-[60vh] md:h-[70vh] overflow-hidden rounded-xl border border-zinc-700 bg-black">
              <Image
                src={urlFor(activeRef.image).width(2000).url()}
                alt={activeRef.caption || serviceTitle}
                fill
                className="object-contain"
              />
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
                      ${exo2.className}
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
