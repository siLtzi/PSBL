import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Calendar, Ruler, Building2, HardHat } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/live";
import {
  allReferencesQuery,
  referencesPageSettingsQuery,
} from "@/sanity/queries";
import { barlowCondensed, barlow } from "@/app/fonts";
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
  title: "Referenssit | Toteutetut betonilattiaurakat Pohjois-Suomessa",
  description:
    "Esimerkkejä toteuttamistamme betonilattiaurakoista: teollisuuslattiat, liiketilat, matkailukohteet ja asuinrakennukset Pohjois-Suomessa ja Lapissa.",
  alternates: {
    canonical: `${SITE_URL}/referenssit`,
  },
  openGraph: {
    title: "Referenssit | Toteutetut betonilattiaurakat | PSBL",
    description:
      "Esimerkkejä toteuttamistamme betonilattiaurakoista Pohjois-Suomessa ja Lapissa.",
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
    "Tässä muutamia esimerkkejä lattiaurakoista, joita olemme toteuttaneet Pohjois-Suomessa viime vuosina.";

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
    <main className="bg-[var(--dark)] text-[var(--off-white)] min-h-screen overflow-x-hidden">
      {/* JSON-LD Structured Data for References */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(referencesPageJsonLd),
        }}
      />

      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-[var(--black)] pt-[60px]">
        <div className="py-16 sm:py-20 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className={`${barlow.className} text-[0.7rem] font-semibold tracking-[3px] uppercase text-[var(--yellow)] mb-4 flex items-center gap-3`}>
              <span className="w-2 h-2 bg-[var(--yellow)]" />
              Referenssit
            </div>
            <h1
              className={`
                ${barlowCondensed.className}
                text-4xl sm:text-5xl md:text-6xl
                font-black tracking-[2px] uppercase
              `}
            >
              {heroTitle}
            </h1>

            <p
              className={`
                ${barlow.className}
                mt-4 text-base sm:text-lg text-[var(--light)] max-w-3xl
                leading-relaxed
              `}
            >
              {heroSubtitle}
            </p>
          </div>
        </div>
        <div className="hazard-stripe" />
      </section>

      {/* CONTENT */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {references.length === 0 ? (
            <p
              className={`
                ${barlow.className}
                text-sm sm:text-base text-[var(--mid)] text-center
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
                  <article className="relative flex flex-col h-full overflow-hidden border border-[var(--steel)] bg-[var(--panel)] transition-all duration-300 hover:border-[var(--yellow)]/40 hover:bg-[var(--steel)] hover:shadow-2xl hover:shadow-[var(--yellow)]/5">
                    
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
                        <div className="absolute inset-0 bg-[var(--steel)] flex items-center justify-center">
                          <Building2 className="h-10 w-10 sm:h-16 sm:w-16 text-[var(--mid)]" />
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                      
                      {/* Floating Tag */}
                      {ref.tag && (
                        <div className="absolute top-4 left-4 z-10">
                          <span
                            className={`
                              ${barlow.className}
                              inline-flex items-center
                              bg-[var(--yellow)] text-[var(--black)]
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
                            ${barlowCondensed.className}
                            text-lg sm:text-xl md:text-2xl font-bold text-[var(--off-white)] leading-tight
                            uppercase tracking-wide transition-colors group-hover:text-[var(--yellow)]
                            break-words hyphens-auto min-w-0
                          `}
                          lang="fi"
                        >
                          {ref.title}
                        </h2>
                        <ArrowUpRight className="h-5 w-5 text-[var(--mid)] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--yellow)] flex-shrink-0 mt-1" />
                      </div>

                      {/* Metadata Row */}
                      <div className={`
                        ${barlow.className}
                        mt-3 sm:mt-4 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 text-[11px] sm:text-xs font-medium text-[var(--mid)]
                      `}>
                        {ref.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-[var(--concrete-gray)]" />
                            <span>{ref.location}</span>
                          </div>
                        )}
                        {ref.year && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-[var(--concrete-gray)]" />
                            <span>{ref.year}</span>
                          </div>
                        )}
                        {typeof ref.sizeM2 === "number" && ref.sizeM2 > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Ruler className="h-3.5 w-3.5 text-[var(--concrete-gray)]" />
                            <span>{ref.sizeM2} m²</span>
                          </div>
                        )}
                        {ref.client && (
                          <div className="flex items-center gap-1.5">
                            <HardHat className="h-3.5 w-3.5 text-[var(--concrete-gray)]" />
                            <span>{ref.client}</span>
                          </div>
                        )}
                      </div>

                      {/* Excerpt */}
                      {ref.excerpt && (
                        <p
                          className={`
                            ${barlow.className}
                            mt-3 sm:mt-4 text-xs sm:text-sm text-[var(--light)] leading-relaxed line-clamp-2 sm:line-clamp-3 flex-1
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
