import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Services, { ServicesContent } from "@/components/Services";
import { sanityClient } from "@/sanity/config";
import { servicesSettingsQuery } from "@/sanity/queries";
import { exo2, scienceGothic } from "@/app/fonts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psbl.fi";

export const metadata: Metadata = {
  title: "Palvelut – Betonilattiatyöt ja pinnoitukset Pohjois-Suomessa",
  description:
    "Tutustu PSBL:n betonilattia- ja pinnoituspalveluihin: lattiavalut, kuivasirotelattiat, kovabetonointi, lattiapinnoitukset, kuviobetonointi ja kiillotetut betonilattiat. Palvelemme koko Pohjois-Suomen ja Lapin alueella.",
  alternates: {
    canonical: `${SITE_URL}/palvelut`,
  },
  openGraph: {
    title: "Palvelut – Betonilattiatyöt ja pinnoitukset | PSBL",
    description:
      "Ammattitaitoisia betonilattiaurakoita koko Pohjois-Suomen ja Lapin alueella: lattiavalut, pinnoitukset, kovabetonointi, kiillotetut lattiat.",
    url: `${SITE_URL}/palvelut`,
    type: "website",
  },
};

// JSON-LD for Services page
const servicesPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/palvelut/#webpage`,
  url: `${SITE_URL}/palvelut`,
  name: "Palvelut – Betonilattiatyöt ja pinnoitukset",
  description:
    "Tutustu PSBL:n betonilattia- ja pinnoituspalveluihin.",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Betonilattiatyöt",
          url: `${SITE_URL}/palvelut/betonilattiatyot-lattiavalut`,
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Kuivasirotelattiat",
          url: `${SITE_URL}/palvelut/kuivasirotelattiat-mastertoplattiat`,
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Kovabetonointi",
          url: `${SITE_URL}/palvelut/kovabetonointi`,
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "Lattiapinnoitukset",
          url: `${SITE_URL}/palvelut/lattiapinnoitukset`,
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Service",
          name: "Kuviobetonointi",
          url: `${SITE_URL}/palvelut/kuviobetonointi`,
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Service",
          name: "Kiillotettu betonilattia",
          url: `${SITE_URL}/palvelut/kiillotettu-betonilattia`,
        },
      },
    ],
  },
};

type ServicesSettings = {
  heading?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  services?: {
    title: string;
    imageUrl: string;
    ctaHref: string | null;
  }[];
};

export default async function PalvelutPage() {
  const settings =
    (await sanityClient.fetch<ServicesSettings | null>(
      servicesSettingsQuery
    )) ?? {};

  const servicesContent: ServicesContent = {
    heading: settings.heading ?? "PALVELUT",
    services: settings.services ?? [],
  };

  const heroTitle = settings.heroTitle ?? "PALVELUT";
  const heroSubtitle =
    settings.heroSubtitle ??
    "Tutustu PSBL:n betonilattia- ja pinnoituspalveluihin.";

  return (
    <main className="relative flex-1 bg-black text-zinc-50 overflow-x-hidden w-full">
      {/* JSON-LD Structured Data for Services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesPageJsonLd),
        }}
      />

      {/* HERO SECTION */}
      <section className="relative h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] overflow-hidden bg-zinc-900">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

        {/* Text content */}
        <div
          className={`
            relative z-10 flex items-center justify-center text-center
            px-4 h-full
            pt-14 sm:pt-16 md:pt-20
            ${scienceGothic.className}
          `}
        >
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
              {heroTitle}
            </h1>
            {heroSubtitle && (
              <p
                className={`mt-3 text-lg sm:text-xl md:text-2xl text-zinc-200 ${exo2.className}`}
              >
                {heroSubtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <Services content={servicesContent} hideHeading />

      <Footer />
    </main>
  );
}
