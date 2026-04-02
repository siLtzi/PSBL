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

  if (!items || items.length === 0) return null;

  // Take up to 6 items for the grid
  const gridItems = items.slice(0, 6);

  return (
    <section
      className="py-20 px-6 md:px-12 border-t-[3px] border-[var(--steel)]"
      id="referenssit"
    >
      {/* Section header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
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
        <Link
          href="/referenssit"
          className={`${ibmPlexMono.className} text-xs tracking-[2px] uppercase text-[var(--yellow)] border border-[var(--yellow)] px-5 py-2.5 hover:bg-[var(--yellow)] hover:text-[var(--black)] transition-all duration-300 shrink-0`}
        >
          Kaikki kohteet →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[3px] auto-rows-[280px] md:auto-rows-[300px]">
        {gridItems.map((ref, index) => {
          const isLarge = index === 0;

          return (
            <article
              key={ref._key ?? `ref-${index}`}
              className={`relative overflow-hidden bg-[var(--black)] group cursor-pointer ${
                isLarge ? "md:row-span-2 md:col-span-1" : ""
              }`}
            >
              {ref.imageUrl ? (
                <Image
                  src={ref.imageUrl}
                  alt={ref.caption || ref.tag || "Referenssikohde"}
                  fill
                  sizes={
                    isLarge
                      ? "(min-width: 768px) 33vw, 100vw"
                      : "(min-width: 768px) 33vw, 100vw"
                  }
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
          );
        })}
      </div>
    </section>
  );
}
