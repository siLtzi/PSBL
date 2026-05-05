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
import { barlowCondensed, barlow } from "@/app/fonts";
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
    <main className="bg-[var(--dark)] text-[var(--off-white)]">
      {/* JSON-LD Structured Data for Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicePageJsonLd),
        }}
      />

      {/* ── HERO: full-bleed image with overlay text ── */}
      <section className="relative w-full overflow-hidden pt-[60px]">
        {sideImageUrl ? (
          <>
            <div className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] min-h-[360px]">
              <Image
                src={sideImageUrl}
                alt={title}
                fill
                sizes="100vw"
                className="object-cover brightness-[0.35] contrast-[1.1]"
                priority
              />
              {/* Gradient fade to dark */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)] via-transparent to-[var(--black)]/60" />

              {/* Text overlay */}
              <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-12 md:pb-16">
                <div className="max-w-5xl mx-auto w-full">
                  <div className={`${barlow.className} text-[0.7rem] font-semibold tracking-[3px] uppercase text-[var(--yellow)] mb-4 flex items-center gap-3`}>
                    <span className="w-2 h-2 bg-[var(--yellow)]" />
                    Palvelu
                  </div>
                  <h1
                    className={`
                      ${barlowCondensed.className} uppercase
                      text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                      font-black tracking-[2px] break-words
                    `}
                  >
                    {title}
                  </h1>
                  {heroSubtitle && (
                    <p className={`${barlow.className} mt-4 text-base sm:text-lg text-[var(--light)] max-w-2xl`}>
                      {heroSubtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="hazard-stripe" />
          </>
        ) : (
          <>
            <div className="bg-[var(--black)] py-16 sm:py-20 md:py-24 px-6 md:px-12">
              <div className="max-w-5xl mx-auto">
                <div className={`${barlow.className} text-[0.7rem] font-semibold tracking-[3px] uppercase text-[var(--yellow)] mb-4 flex items-center gap-3`}>
                  <span className="w-2 h-2 bg-[var(--yellow)]" />
                  Palvelu
                </div>
                <h1
                  className={`
                    ${barlowCondensed.className} uppercase
                    text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                    font-black tracking-[2px] break-words
                  `}
                >
                  {title}
                </h1>
                {heroSubtitle && (
                  <p className={`${barlow.className} mt-4 text-base sm:text-lg text-[var(--light)] max-w-2xl`}>
                    {heroSubtitle}
                  </p>
                )}
              </div>
            </div>
            <div className="hazard-stripe" />
          </>
        )}
      </section>

      {/* ── MAIN CONTENT: two-column layout ── */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* LEFT: main content body */}
            <div className="flex-1 min-w-0">
              {contentTitle && (
                <h2
                  className={`${barlowCondensed.className} uppercase text-2xl sm:text-3xl md:text-4xl font-black tracking-[2px] mb-6`}
                >
                  {contentTitle}
                </h2>
              )}

              {contentBody && (
                <div
                  className={`${barlow.className} text-base sm:text-lg text-[var(--light)] leading-relaxed`}
                >
                  <PortableText value={contentBody} components={portableTextComponents} />
                </div>
              )}
            </div>

            {/* RIGHT: sidebar with specs + coverage */}
            {(hasSpecs || hasCoverage) && (
              <aside className="w-full lg:w-[320px] lg:flex-shrink-0 flex flex-col gap-6">
                {/* Specs card */}
                {hasSpecs && (
                  <div className="bg-[var(--panel)] border-l-[3px] border-[var(--yellow)] px-6 py-6">
                    {specsTitle && (
                      <h3
                        className={`${barlowCondensed.className} uppercase text-lg sm:text-xl font-black tracking-[2px] mb-3 text-[var(--yellow)]`}
                      >
                        {specsTitle}
                      </h3>
                    )}
                    {specsBody && (
                      <div
                        className={`${barlow.className} text-sm text-[var(--light)] leading-relaxed`}
                      >
                        <PortableText value={specsBody} components={portableTextComponents} />
                      </div>
                    )}
                  </div>
                )}

                {/* Coverage card */}
                {hasCoverage && (
                  <div className="bg-[var(--yellow)]/10 border-l-[3px] border-[var(--yellow)] px-6 py-6">
                    {coverageTitle && (
                      <h3
                        className={`${barlowCondensed.className} uppercase text-lg sm:text-xl font-black tracking-[2px] mb-3`}
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
                              ${barlow.className}
                              inline-flex items-center
                              bg-[var(--yellow)] text-[var(--black)]
                              px-3 py-1 text-xs font-semibold
                            `}
                          >
                            {place}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* ── REFERENCES GALLERY ── */}
      {hasReferences && (
        <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--steel)]">
          <div className="mx-auto max-w-5xl px-6 md:px-12">
            <div className={`${barlow.className} text-[0.65rem] font-semibold tracking-[3px] uppercase text-[var(--yellow)] mb-3 flex items-center gap-3`}>
              <span className="text-[var(--concrete-gray)]">{"//"}</span>
              Referenssit
            </div>
            <h3
              className={`
                ${barlowCondensed.className} uppercase
                text-2xl sm:text-3xl md:text-4xl font-black tracking-[2px] mb-8
              `}
            >
              TOTEUTUKSIA
            </h3>

            <ServiceReferencesGallery
              references={references!}
              serviceTitle={title}
            />
          </div>
        </section>
      )}

      <BottomCta />
      <Footer />
    </main>
  );
}
