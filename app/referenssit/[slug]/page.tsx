import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { portableTextComponents } from "@/components/portableTextComponents";
import ServiceReferencesGallery from "@/components/ServiceReferencesGallery";
import Footer from "@/components/Footer";
import { sanityClient } from "@/sanity/config";
import { referenceBySlugQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { exo2, scienceGothicCaps } from "@/app/fonts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psbl.fi";

type ReferenceDoc = {
  _id: string;
  title: string;
  tag?: string | null;
  location?: string | null;
  year?: number | null;
  sizeM2?: number | null;
  client?: string | null;
  excerpt?: string | null;
  body?: any;
  mainImage?: any;
  gallery?: any[];
};

// ----- Static params for all reference pages -----
export async function generateStaticParams() {
  const refs = await sanityClient.fetch<{ slug: string }[]>(/* groq */ `
    *[_type == "projectReference" && defined(slug.current)]{
      "slug": slug.current
    }
  `);

  return refs.map((r) => ({ slug: r.slug }));
}

// ----- Enhanced Metadata (SEO) -----
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const data = await sanityClient.fetch<ReferenceDoc | null>(
    referenceBySlugQuery,
    { slug }
  );

  if (!data) return {};

  const title = `${data.title} – Referenssi`;
  const description =
    data.excerpt ??
    `Betonilattiaurakka: ${data.title}${data.location ? `, ${data.location}` : ""}${data.year ? ` ${data.year}` : ""}${data.sizeM2 ? ` – ${data.sizeM2} m²` : ""}`.trim();

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/referenssit/${slug}`,
    },
    openGraph: {
      title: `${title} | Pohjois-Suomen Betonilattiat`,
      description,
      url: `${SITE_URL}/referenssit/${slug}`,
      type: "article",
      images: data.mainImage
        ? [
            {
              url: urlFor(data.mainImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: data.title,
            },
          ]
        : undefined,
    },
  };
}

// ----- Page component -----
export default async function ReferencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await sanityClient.fetch<ReferenceDoc | null>(
    referenceBySlugQuery,
    { slug }
  );

  if (!data) return notFound();

  const {
    title,
    tag,
    location,
    year,
    sizeM2,
    client,
    excerpt,
    body,
    mainImage,
    gallery: rawGallery,
  } = data;

  const rawGalleryArr = rawGallery ?? [];

  // Merge mainImage + gallery into a single array for the unified gallery
  const allImages = [
    ...(mainImage ? [mainImage] : []),
    ...rawGalleryArr,
  ];

  // JSON-LD for Reference/Project Page
  const referencePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/referenssit/${slug}/#article`,
    headline: title,
    description: excerpt || `Betonilattiaurakka: ${location ?? ""} ${year ?? ""}`.trim(),
    url: `${SITE_URL}/referenssit/${slug}`,
    image: mainImage ? urlFor(mainImage).width(1200).url() : undefined,
    datePublished: year ? `${year}-01-01` : undefined,
    author: {
      "@type": "Organization",
      name: "Pohjois-Suomen Betonilattiat Oy",
    },
    publisher: {
      "@type": "Organization",
      name: "Pohjois-Suomen Betonilattiat Oy",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/referenssit/${slug}`,
    },
    about: {
      "@type": "Service",
      name: tag || "Betonilattiatyöt",
      areaServed: location
        ? {
            "@type": "Place",
            name: location,
          }
        : undefined,
    },
  };

  return (
    <main className="bg-black text-zinc-50 min-h-screen">
      {/* JSON-LD Structured Data for Reference */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(referencePageJsonLd),
        }}
      />

      {/* HERO */}
      <section className="relative w-full bg-zinc-950 pt-28 pb-14 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/90 to-zinc-950" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          {tag && (
            <p
              className={`
                ${exo2.className}
                inline-flex items-center rounded-full
                bg-yellow-400 text-zinc-900
                px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] mb-4
              `}
            >
              {tag}
            </p>
          )}

          <h1
            className={`
              ${scienceGothicCaps}
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl
              font-black tracking-tight
            `}
          >
            {title}
          </h1>

          {(location || year || sizeM2 || client) && (
            <p
              className={`
                ${exo2.className}
                mt-4 text-sm sm:text-base text-zinc-400
              `}
            >
              {location && <span>{location}</span>}
              {year && <span> • {year}</span>}
              {typeof sizeM2 === "number" && sizeM2 > 0 && (
                <span> • {sizeM2} m²</span>
              )}
              {client && <span> • Tilaaja: {client}</span>}
            </p>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 md:py-16 lg:py-20 bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Excerpt + long description */}
          <div>
            {excerpt && (
              <p
                className={`
                  ${exo2.className}
                  text-sm sm:text-base text-zinc-200 mb-4
                `}
              >
                {excerpt}
              </p>
            )}

            {body && (
              <div
                className={`
                  ${exo2.className}
                  text-sm sm:text-base text-zinc-200 leading-relaxed prose prose-invert max-w-none
                `}
              >
                <PortableText value={body} components={portableTextComponents} />
              </div>
            )}
          </div>

          {/* All images */}
          {allImages.length > 0 && (
            <div>
              <h2
                className={`
                  ${scienceGothicCaps}
                  text-xl sm:text-2xl font-black mb-4
                `}
              >
                KUVAT KOHTEESTA
              </h2>

              <ServiceReferencesGallery
                references={allImages.map((img, i) => ({
                  _key: String(i),
                  image: img,
                }))}
                serviceTitle={title}
              />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
