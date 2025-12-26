import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Calendar, Ruler } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/live";
import {
  allReferencesQuery,
  referencesPageSettingsQuery,
} from "@/sanity/queries";
import { exo2, scienceGothic } from "@/app/fonts";
import Footer from "@/components/Footer";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

type ReferenceItem = {
  _id: string;
  title: string;
  slug: string;
  tag?: string | null;
  location?: string | null;
  year?: number | null;
  sizeM2?: number | null;
  excerpt?: string | null;
  imageUrl: string;
};

type ReferencesPageSettings = {
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroImage?: any;
  heroVideoUrl?: string | null; // from heroVideo.asset->url
};

export const metadata: Metadata = {
  title: "Referenssit – Pohjois-Suomen Betonilattiat",
  description:
    "Näytteitä toteuttamistamme betonilattiaurakoista eri puolilta Pohjois-Suomea.",
};

export default async function ReferencesPage() {
  const [settingsResult, referencesResult] = await Promise.all([
    sanityFetch({ query: referencesPageSettingsQuery }),
    sanityFetch({ query: allReferencesQuery }),
  ]);

  const settings = settingsResult.data as ReferencesPageSettings | null;
  const references = referencesResult.data as ReferenceItem[];

  const heroTitle = settings?.heroTitle ?? "REFERENSSIT";
  const heroSubtitle =
    settings?.heroSubtitle ??
    "Ote toteuttamistamme betonilattiaurakoista eri puolilta Pohjois-Suomea. Näistä näet käytännössä, millaisia kohteita PSBL on viime vuosina tehnyt.";

  const heroImageUrl = settings?.heroImage
    ? urlFor(settings.heroImage).width(1600).url()
    : null;
  const heroVideoUrl = settings?.heroVideoUrl ?? null;

  return (
    <main className="bg-black text-zinc-50 min-h-screen">
      {/* HERO / HEADER */}
      <section className="relative w-full overflow-hidden bg-black">
        {/* 1) Video, 2) Image, 3) Plain black */}
        {heroVideoUrl ? (
          <video
            src={heroVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            poster={heroImageUrl || undefined}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt=""
            fill
            priority
            className="object-cover"
          />
        ) : null}

        {(heroVideoUrl || heroImageUrl) && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        )}

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 md:py-40">
          <h1
            className={`
              ${scienceGothic.className}
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              font-black tracking-tight text-center uppercase
              drop-shadow-2xl
            `}
          >
            {heroTitle}
          </h1>

          <p
            className={`
              ${exo2.className}
              mt-6 text-base sm:text-lg md:text-xl text-zinc-200 text-center max-w-3xl mx-auto
              leading-relaxed drop-shadow-md
            `}
          >
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 sm:py-24 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {references.length === 0 ? (
            <p
              className={`
                ${exo2.className}
                text-sm sm:text-base text-zinc-400 text-center
              `}
            >
              Referenssejä ei ole vielä lisätty. Päivitämme sivua pian.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {references.map((ref) => (
                <Link
                  key={ref._id}
                  href={`/referenssit/${ref.slug}`}
                  className="group flex flex-col h-full"
                >
                  <article className="relative flex flex-col h-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-yellow-500/5">
                    
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={ref.imageUrl}
                        alt={ref.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                      
                      {/* Floating Tag */}
                      {ref.tag && (
                        <div className="absolute top-4 left-4 z-10">
                          <span
                            className={`
                              ${exo2.className}
                              inline-flex items-center rounded-full
                              bg-yellow-500/90 text-zinc-950 backdrop-blur-sm
                              px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg
                            `}
                          >
                            {ref.tag}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-1 flex-col p-6">
                      {/* Title & Arrow */}
                      <div className="flex items-start justify-between gap-4">
                        <h2
                          className={`
                            ${scienceGothic.className}
                            text-xl sm:text-2xl font-bold text-zinc-100 leading-tight
                            uppercase tracking-wide transition-colors group-hover:text-yellow-400
                          `}
                        >
                          {ref.title}
                        </h2>
                        <ArrowUpRight className="h-6 w-6 text-zinc-500 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-yellow-400 flex-shrink-0" />
                      </div>

                      {/* Metadata Row */}
                      <div className={`
                        ${exo2.className}
                        mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-zinc-400
                      `}>
                        {ref.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                            <span>{ref.location}</span>
                          </div>
                        )}
                        {ref.year && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                            <span>{ref.year}</span>
                          </div>
                        )}
                        {typeof ref.sizeM2 === "number" && ref.sizeM2 > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Ruler className="h-3.5 w-3.5 text-zinc-500" />
                            <span>{ref.sizeM2} m²</span>
                          </div>
                        )}
                      </div>

                      {/* Excerpt */}
                      {ref.excerpt && (
                        <p
                          className={`
                            ${exo2.className}
                            mt-4 text-sm text-zinc-400 leading-relaxed line-clamp-3 flex-1
                          `}
                        >
                          {ref.excerpt}
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
