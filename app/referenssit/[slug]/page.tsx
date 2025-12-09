import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import ServiceReferencesGallery from "@/components/ServiceReferencesGallery";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { sanityClient } from "@/sanity/config";
import { allReferencesQuery, referenceBySlugQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { exo2, scienceGothicCaps } from "@/app/fonts";

type ReferenceDoc = {
  _id: string;
  title: string;
  tag?: string | null;
  location?: string | null;
  year?: number | null;
  sizeM2?: number | null;
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

// ----- Metadata (SEO) -----
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

  return {
    title: `${data.title} – Referenssi | Pohjois-Suomen Betonilattiat`,
    description:
      data.excerpt ??
      `Betonilattiaurakka: ${data.location ?? ""} ${data.year ?? ""}`.trim(),
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
    excerpt,
    body,
    mainImage,
    gallery = [],
  } = data;

  const mainImageUrl = mainImage ? urlFor(mainImage).width(1600).url() : null;

  return (
    <main className="bg-black text-zinc-50 min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-black">
        <div className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[440px]">
          {mainImageUrl && (
            <Image
              src={mainImageUrl}
              alt={title}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />

          <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
            <div className="max-w-3xl">
              {tag && (
                <p
                  className={`
                    ${exo2.className}
                    inline-flex items-center rounded-full
                    bg-yellow-400 text-zinc-900
                    px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] mb-3
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

              {(location || year || sizeM2) && (
                <p
                  className={`
                    ${exo2.className}
                    mt-3 text-sm sm:text-base text-zinc-300
                  `}
                >
                  {location && <span>{location}</span>}
                  {year && <span> • {year}</span>}
                  {typeof sizeM2 === "number" && sizeM2 > 0 && (
                    <span> • {sizeM2} m²</span>
                  )}
                </p>
              )}
            </div>
          </div>
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
                <PortableText value={body} />
              </div>
            )}
          </div>

          {/* Gallery */}
          {gallery.length > 0 && (
            <div>
              <h2
                className={`
        ${scienceGothicCaps}
        text-xl sm:text-2xl font-black mb-4
      `}
              >
                LISÄKUVAT KOHTEESTA
              </h2>

              <ServiceReferencesGallery
                // adapt simple image array → objects the gallery expects
                references={gallery.map((img, i) => ({
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
