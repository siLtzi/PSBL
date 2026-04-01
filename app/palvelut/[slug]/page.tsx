import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText, type PortableTextBlock } from "next-sanity";
import type { Metadata } from "next";
import { portableTextComponents } from "@/components/portableTextComponents";

import { sanityClient } from "@/sanity/config";
import {
  servicePageSlugsQuery,
  servicePageBySlugQuery,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { exo2, scienceGothic, scienceGothicCaps } from "@/app/fonts";
import Footer from "@/components/Footer";
import ServiceReferencesGallery from "@/components/ServiceReferencesGallery";
import BottomCta from "@/components/BottomCta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psbl.fi";

type ReferenceItem = {
  _key: string;
  caption?: string | null;
  tag?: string | null;
  image?: any;
  videoUrl?: string | null;
};

type ServicePageData = {
  title: string;
  heroSubtitle?: string | null;

  contentTitle?: string | null;
  contentBody?: PortableTextBlock[]; // <--- Changed from string | null

  sideImage?: any;

  specsTitle?: string | null;
  specsBody?: PortableTextBlock[]; // <--- Changed from string | null

  coverageTitle?: string | null;
  coverageBody?: string | null; // This stays string (it's 'text' in schema)

  references?: ReferenceItem[];
  seoTitle?: string | null;
  seoDescription?: string | null;
};

// ------------------------------------------------------
// Static params for all /palvelut/[slug] pages
// ------------------------------------------------------
export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(
    servicePageSlugsQuery
  );

  return slugs.map(({ slug }) => ({ slug }));
}

// ------------------------------------------------------
// Enhanced per-page metadata (SEO)
// ------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>; // 1. Update Type to Promise
}): Promise<Metadata> {
  const { slug } = await params; // 2. Await the params

  const data = await sanityClient.fetch<ServicePageData | null>(
    servicePageBySlugQuery,
    { slug } // Use the awaited slug
  );

  if (!data) {
    return {};
  }

  const title = data.seoTitle ?? data.title;
  const description =
    data.seoDescription ??
    data.heroSubtitle ??
    `${data.title} – Ammattitaitoiset betonilattiatyöt Pohjois-Suomessa`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/palvelut/${slug}`,
    },
    openGraph: {
      title: `${title} | Pohjois-Suomen Betonilattiat`,
      description,
      url: `${SITE_URL}/palvelut/${slug}`,
      type: "website",
      images: data.sideImage
        ? [
            {
              url: urlFor(data.sideImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
  };
}

// ------------------------------------------------------
// Page component
// ------------------------------------------------------
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>; // 1. Update Type to Promise
}) {
  const { slug } = await params; // 2. Await the params

  const data = await sanityClient.fetch<ServicePageData | null>(
    servicePageBySlugQuery,
    { slug } // Use the awaited slug
  );

  if (!data) {
    return notFound();
  }

  const {
    title,
    heroSubtitle,
    contentTitle,
    contentBody,
    sideImage,
    specsTitle,
    specsBody,
    coverageTitle,
    coverageBody,
    references,
  } = data;

  const sideImageUrl = sideImage ? urlFor(sideImage).width(1200).url() : "";

  const hasSpecs = specsTitle || specsBody;
  const hasCoverage = coverageTitle || coverageBody;
  const hasReferences = references && references.length > 0;
  const coveragePlaces = coverageBody
    ? coverageBody
        .split(/[\n,]/) // pilkut tai rivinvaihdot
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => item.replace(/[.;:]+$/g, "")) // siivoa . ; : lopusta
    : [];

  // JSON-LD for Service Page
  const servicePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/palvelut/${slug}/#service`,
    name: title,
    description: heroSubtitle || `${title} – Ammattitaitoiset betonilattiatyöt`,
    url: `${SITE_URL}/palvelut/${slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Pohjois-Suomen Betonilattiat Oy",
      url: SITE_URL,
    },
    areaServed: coveragePlaces.length
      ? coveragePlaces.map((place) => ({
          "@type": "Place",
          name: place,
        }))
      : {
          "@type": "Place",
          name: "Pohjois-Suomi",
        },
    image: sideImageUrl || undefined,
  };

  return (
    <main className="bg-white text-zinc-900">
      {/* JSON-LD Structured Data for Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicePageJsonLd),
        }}
      />

      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-zinc-900 text-white">
        <div className="relative h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/85" />

          <div className="relative z-10 flex h-full items-end sm:items-center justify-center px-6 sm:px-8 pb-6 sm:pb-0 pt-16 sm:pt-0 text-center">
            <div>
              <h1
                className={`
                  ${scienceGothicCaps}
                  text-2xl sm:text-4xl md:text-5xl
                  font-black tracking-tight break-words
                `}
              >
                {title}
              </h1>
              {heroSubtitle && (
                <p
                  className={`
                    ${exo2.className}
                    mt-3 text-base sm:text-lg md:text-xl text-zinc-200
                  `}
                >
                  {heroSubtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-4 sm:px-6 lg:px-8">

          {/* Hero image + intro title */}
          {sideImageUrl && (
            <div className="relative h-72 sm:h-80 md:h-96 w-full overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
              <Image
                src={sideImageUrl}
                alt={title}
                fill
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content body – full width for inline images */}
          <div>
            {contentTitle && (
              <h2
                className={`${scienceGothicCaps} text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-6`}
              >
                {contentTitle}
              </h2>
            )}

            {contentBody && (
              <div
                className={`${exo2.className} text-base sm:text-lg text-zinc-700 leading-relaxed`}
              >
                <PortableText value={contentBody} components={portableTextComponents} />
              </div>
            )}
          </div>

          {/* Suositukset (tekniset tiedot) */}
          {hasSpecs && (
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-8 sm:px-8 sm:py-10">
              {specsTitle && (
                <h3
                  className={`${scienceGothicCaps} text-xl sm:text-2xl font-black mb-4`}
                >
                  {specsTitle}
                </h3>
              )}

              {specsBody && (
                <div
                  className={`${exo2.className} text-base sm:text-lg text-zinc-700 leading-relaxed`}
                >
                  <PortableText value={specsBody} components={portableTextComponents} />
                </div>
              )}
            </div>
          )}

          {/* Toiminta-alue / paikkakunnat erillisenä keltaisena SEO-laattana */}
          {hasCoverage && (
            <div className="rounded-2xl border border-yellow-300 bg-yellow-50 px-6 py-8 sm:px-8 sm:py-10">
              {coverageTitle && (
                <h3
                  className={`
          ${scienceGothicCaps}
          text-xl sm:text-2xl font-black mb-3
        `}
                >
                  {coverageTitle}
                </h3>
              )}

              {coveragePlaces.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {coveragePlaces.map((place, i) => (
                    <span
                      key={`${place}-${i}`}
                      className={`
              ${exo2.className}
              inline-flex items-center rounded-full 
              bg-yellow-400 text-zinc-900 
              px-3 py-1 text-xs sm:text-sm font-semibold
            `}
                    >
                      {place}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* References gallery (optional) */}
          {hasReferences && (
            <section>
              <h3
                className={`
                  ${scienceGothicCaps}
                  text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-6
                `}
              >
                REFERENSSIT
              </h3>

              <ServiceReferencesGallery
                references={references!}
                serviceTitle={title}
              />
            </section>
          )}
        </div>
      </section>

      <BottomCta />
      <Footer />
    </main>
  );
}
