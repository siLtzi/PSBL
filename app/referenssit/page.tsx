import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Calendar, Ruler, Building2, HardHat } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/live";
import {
  allReferencesQuery,
  referencesPageSettingsQuery,
} from "@/sanity/queries";
import { exo2, scienceGothic } from "@/app/fonts";
import Footer from "@/components/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psbl.fi";

type ReferenceItem = {
  _id: string;
  title: string;
  slug: string;
  tag?: string | null;
  location?: string | null;
  year?: number | null;
  sizeM2?: number | null;
  client?: string | null;
  excerpt?: string | null;
  imageUrl?: string | null;
};

type ReferencesPageSettings = {
  heroTitle?: string | null;
  heroSubtitle?: string | null;
};

export const metadata: Metadata = {
  title: "Referenssit – Toteutetut betonilattiaurakat Pohjois-Suomessa",
  description:
    "Katso esimerkkejä toteuttamistamme betonilattiaurakoista: teollisuuslattiat, liiketilat, matkailukohteet ja asuinrakennukset eri puolilta Pohjois-Suomea ja Lappia. Mm. Kauppakeskus Kuukkeli, Tokmanni Ivalo, Lapin keskussairaala.",
  alternates: {
    canonical: `${SITE_URL}/referenssit`,
  },
  openGraph: {
    title: "Referenssit – Toteutetut betonilattiaurakat | PSBL",
    description:
      "Näytteitä toteuttamistamme betonilattiaurakoista eri puolilta Pohjois-Suomea ja Lappia.",
    url: `${SITE_URL}/referenssit`,
    type: "website",
  },
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

  // JSON-LD for References page with dynamic items
  const referencesPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/referenssit/#webpage`,
    url: `${SITE_URL}/referenssit`,
    name: "Referenssit – Toteutetut betonilattiaurakat",
    description: heroSubtitle,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: references.slice(0, 10).map((ref, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: ref.title,
          url: `${SITE_URL}/referenssit/${ref.slug}`,
          description: ref.excerpt || `Betonilattiaurakka: ${ref.location || ""} ${ref.year || ""}`.trim(),
        },
      })),
    },
  };

  return (
    <main className="bg-black text-zinc-50 min-h-screen overflow-x-hidden">
      {/* JSON-LD Structured Data for References */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(referencesPageJsonLd),
        }}
      />

      {/* HERO / HEADER */}
      <section className="relative w-full overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 pt-28 sm:pt-32 md:pt-36">
          <h1
            className={`
              ${scienceGothic.className}
              text-4xl sm:text-5xl md:text-6xl
              font-black tracking-tight text-center uppercase
            `}
          >
            {heroTitle}
          </h1>

          <p
            className={`
              ${exo2.className}
              mt-4 text-base sm:text-lg md:text-xl text-zinc-200 text-center max-w-3xl mx-auto
              leading-relaxed
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
            <div className="grid gap-5 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
              {references.map((ref) => (
                <Link
                  key={ref._id}
                  href={`/referenssit/${ref.slug}`}
                  prefetch={false}
                  className="group flex flex-col h-full min-w-0"
                >
                  <article className="relative flex flex-col h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-800 bg-zinc-900/40 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-yellow-500/5">
                    
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden">
                      {ref.imageUrl ? (
                        <Image
                          src={ref.imageUrl}
                          alt={ref.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                          <Building2 className="h-10 w-10 sm:h-16 sm:w-16 text-zinc-600" />
                        </div>
                      )}
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
                    <div className="flex flex-1 flex-col p-4 sm:p-6">
                      {/* Title & Arrow */}
                      <div className="flex items-start justify-between gap-2">
                        <h2
                          className={`
                            ${scienceGothic.className}
                            text-lg sm:text-xl md:text-2xl font-bold text-zinc-100 leading-tight
                            uppercase tracking-wide transition-colors group-hover:text-yellow-400
                            break-words hyphens-auto min-w-0
                          `}
                          lang="fi"
                        >
                          {ref.title}
                        </h2>
                        <ArrowUpRight className="h-5 w-5 text-zinc-500 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-yellow-400 flex-shrink-0 mt-1" />
                      </div>

                      {/* Metadata Row */}
                      <div className={`
                        ${exo2.className}
                        mt-3 sm:mt-4 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 text-[11px] sm:text-xs font-medium text-zinc-400
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
                        {ref.client && (
                          <div className="flex items-center gap-1.5">
                            <HardHat className="h-3.5 w-3.5 text-zinc-500" />
                            <span>{ref.client}</span>
                          </div>
                        )}
                      </div>

                      {/* Excerpt */}
                      {ref.excerpt && (
                        <p
                          className={`
                            ${exo2.className}
                            mt-3 sm:mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2 sm:line-clamp-3 flex-1
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
