import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText, type PortableTextBlock } from "next-sanity";

import { sanityClient } from "@/sanity/config";
import {
  servicePageSlugsQuery,
  servicePageBySlugQuery,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { exo2, scienceGothic, scienceGothicCaps } from "@/app/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type ReferenceItem = {
  _key: string;
  caption?: string | null;
  tag?: string | null;
  image?: any;
};

type ServicePageData = {
  title: string;
  heroSubtitle?: string | null;
  heroImage?: any;

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
// Optional: per-page metadata (SEO)
// ------------------------------------------------------
export async function generateMetadata({
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
    return {};
  }

  return {
    title: data.seoTitle ?? data.title,
    description:
      data.seoDescription ??
      data.heroSubtitle ??
      "Pohjois-Suomen Betonilattiat",
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
    heroImage,
    contentTitle,
    contentBody,
    sideImage,
    specsTitle,
    specsBody,
    coverageTitle,
    coverageBody,
    references,
  } = data;

  const heroImageUrl = heroImage ? urlFor(heroImage).width(1600).url() : "";
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

  return (
    <main className="bg-white text-zinc-900">
      <Header />

      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        <div className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[440px]">
          {heroImageUrl && (
            <Image
              src={heroImageUrl}
              alt={title}
              fill
              priority
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/85" />

          <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
            <div>
              <h1
                className={`
                  ${scienceGothicCaps}
                  text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                  font-black tracking-tight
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
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          {/* Top: main text + optional side image */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-start">
            <div>
              {contentTitle && (
                <h2
                  className={`${scienceGothicCaps} text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4`}
                >
                  {contentTitle}
                </h2>
              )}

              {/* FIX 1: contentBody */}
              {contentBody && (
                <div
                  className={`${exo2.className} text-sm sm:text-base text-zinc-700 leading-relaxed portable-text`}
                >
                  <PortableText value={contentBody} />
                </div>
              )}
            </div>

            {sideImageUrl && (
              <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden rounded-xl shadow-[0_14px_30px_rgba(0,0,0,0.15)]">
                <Image
                  src={sideImageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Suositukset (tekniset tiedot) */}
          {hasSpecs && (
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-8 sm:px-8 sm:py-10">
              {specsTitle && (
                <h3
                  className={`${scienceGothicCaps} text-xl sm:text-2xl font-black mb-3`}
                >
                  {specsTitle}
                </h3>
              )}

              {specsBody && (
                <div
                  className={`${exo2.className} text-sm sm:text-base text-zinc-700 leading-relaxed`}
                >
                  <PortableText value={specsBody} />
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

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {references!.map((ref) => {
                  if (!ref.image) return null;
                  const refUrl = urlFor(ref.image).width(900).url();

                  return (
                    <figure
                      key={ref._key}
                      className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-sm"
                    >
                      <div className="relative h-52 w-full">
                        <Image
                          src={refUrl}
                          alt={ref.caption || title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      {(ref.caption || ref.tag) && (
                        <figcaption className="px-4 py-3">
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
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
