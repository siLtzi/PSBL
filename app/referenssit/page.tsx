import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { sanityClient } from "@/sanity/config";
import {
  allReferencesQuery,
  referencesPageSettingsQuery,
} from "@/sanity/queries";
import { exo2, scienceGothic } from "@/app/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { urlFor } from "@/sanity/lib/image";

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
  const [settings, references] = await Promise.all([
    sanityClient.fetch<ReferencesPageSettings | null>(
      referencesPageSettingsQuery
    ),
    sanityClient.fetch<ReferenceItem[]>(allReferencesQuery),
  ]);

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
      <Header />

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
          <div className="absolute inset-0 bg-black/70" />
        )}

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
          <h1
            className={`
              ${scienceGothic.className}
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl
              font-black tracking-tight text-center
            `}
          >
            {heroTitle}
          </h1>

          <p
            className={`
              ${exo2.className}
              mt-4 text-sm sm:text-base md:text-lg text-zinc-300 text-center max-w-3xl mx-auto
            `}
          >
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-16 sm:pb-20 md:pb-24 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {references.map((ref) => (
                <Link
                  key={ref._id}
                  href={`/referenssit/${ref.slug}`}
                  className="group"
                >
                  <article className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-[0_18px_45px_rgba(0,0,0,0.4)]">
                    {/* Image */}
                    <div className="relative h-52 sm:h-56 md:h-60 w-full overflow-hidden">
                      <Image
                        src={ref.imageUrl}
                        alt={ref.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>

                    {/* Text area */}
                    <div className="relative px-4 py-4 sm:px-5 sm:py-5">
                      {/* Tag + meta */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {ref.tag && (
                          <span
                            className={`
                              ${exo2.className}
                              inline-flex items-center rounded-full
                              bg-yellow-400 text-zinc-900
                              px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]
                            `}
                          >
                            {ref.tag}
                          </span>
                        )}

                        {(ref.location || ref.year || ref.sizeM2) && (
                          <p
                            className={`
                              ${exo2.className}
                              text-[11px] text-zinc-400 flex items-center gap-2 flex-wrap
                            `}
                          >
                            {ref.location && <span>{ref.location}</span>}
                            {ref.year && (
                              <span className="opacity-70">• {ref.year}</span>
                            )}
                            {typeof ref.sizeM2 === "number" && ref.sizeM2 > 0 && (
                              <span className="opacity-70">• {ref.sizeM2} m²</span>
                            )}
                          </p>
                        )}
                      </div>

                      {/* Title */}
                      <h2
                        className={`
                          ${scienceGothic.className}
                          text-lg sm:text-xl font-black text-zinc-50 leading-snug
                          uppercase tracking-wide
                        `}
                      >
                        {ref.title}
                      </h2>

                      {/* Excerpt */}
                      {ref.excerpt && (
                        <p
                          className={`
                            ${exo2.className}
                            mt-2 text-sm text-zinc-300 leading-relaxed line-clamp-3
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
