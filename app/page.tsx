import type { Metadata } from "next";
import Hero, { HeroContent } from "@/components/Hero";
import Stats, { StatItem } from "@/components/Stats";
import Ticker from "@/components/Ticker";
import About, { AboutContent } from "@/components/About";
import Services, { ServicesContent } from "@/components/Services";
import References, {
  ReferencesContent,
  ReferenceItem,
} from "@/components/References";
import Testimonials, { TestimonialItem } from "@/components/Testimonials";
import BottomCta from "@/components/BottomCta";
import Footer from "@/components/Footer";

import { sanityFetch } from "@/sanity/lib/live";
import {
  homeSettingsQuery,
  aboutSettingsQuery,
  servicesSettingsQuery,
  referencesSettingsQuery,
  featuredReferencesQuery,
  approvedTestimonialsQuery,
} from "@/sanity/queries";

import heroFallback from "@/content/heroFallback.json";
import aboutFallback from "@/content/aboutFallback.json";
import servicesFallback from "@/content/servicesFallback.json";
import referencesFallback from "@/content/referencesFallback.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psbl.fi";

export const metadata: Metadata = {
  title: "Pohjois-Suomen Betonilattiat | Lattiavalut ja pinnoitukset",
  description:
    "Betonilattiaurakoita yrityksille ja yksityisille koko Pohjois-Suomessa. Lattiavalut, pinnoitukset, kovabetonointi ja kiillotetut betonilattiat kiinteällä hinnalla.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Pohjois-Suomen Betonilattiat | Lattiavalut ja pinnoitukset",
    description:
      "Betonilattiaurakoita yrityksille ja yksityisille koko Pohjois-Suomessa. Lattiavalut, pinnoitukset ja kovabetonointi kiinteällä hinnalla.",
    url: SITE_URL,
    type: "website",
  },
};

// JSON-LD for the homepage (WebPage + Service)
const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: "Pohjois-Suomen Betonilattiat | Lattiavalut ja pinnoitukset",
  description:
    "Betonilattiaurakoita yrityksille ja yksityisille koko Pohjois-Suomessa. Lattiavalut, kuivasirotelattiat, kovabetonointi ja lattiapinnoitukset.",
  inLanguage: "fi",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Pohjois-Suomen Betonilattiat",
    publisher: {
      "@type": "Organization",
      name: "Pohjois-Suomen Betonilattiat Oy",
    },
  },
  mainEntity: {
    "@type": "Service",
    serviceType: "Betonilattiaurakointi",
    provider: {
      "@type": "LocalBusiness",
      name: "Pohjois-Suomen Betonilattiat Oy",
      telephone: "+358-44-248-0482",
      email: "toimisto@psbl.fi",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Pohjois-Suomi" },
      { "@type": "AdministrativeArea", name: "Lappi" },
      { "@type": "Place", name: "Oulu" },
      { "@type": "Place", name: "Rovaniemi" },
      { "@type": "Place", name: "Saariselkä" },
      { "@type": "Place", name: "Levi" },
      { "@type": "Place", name: "Ivalo" },
      { "@type": "Place", name: "Muonio" },
      { "@type": "Place", name: "Kemijärvi" },
      { "@type": "Place", name: "Tornio" },
      { "@type": "Place", name: "Kemi" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Betonilattipalvelut",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Betonilattiatyöt ja lattiavalut",
            description: "Ammattitaitoiset betonilattiavalut teollisuus-, liike- ja asuintiloihin.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Kuivasirotelattiat",
            description: "Masterdur, SynTop ja HardCem kuivasirotelattiat kulutuskestäviin kohteisiin.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Kovabetonointi",
            description: "Korkean kulutuskestävyyden kovabetonointiratkaisut teollisuus- ja varastotiloihin.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Lattiapinnoitukset",
            description: "PU-pinnoitukset ja akryylibetonipinnoitukset liike- ja teollisuustiloihin.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Kuviobetonointi",
            description: "Koristeelliset kuviobetoniset lattiat julkisiin ja yksityisiin kohteisiin.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Kiillotettu betonilattia",
            description: "Lattioiden kiillotushionnat moderniin ja kestävään lopputulokseen.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Holvivalut",
            description: "Holvirakenteiden betonivalut kerrostalo- ja toimitilakohteisiin.",
          },
        },
      ],
    },
  },
};

// GEO-optimized FAQ schema — helps AI engines surface PSBL for local queries
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "Millä alueella Pohjois-Suomen Betonilattiat toimii?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Palvelemme koko Pohjois-Suomen ja Lapin alueella. Toteutamme betonilattiaurakoita mm. Oulussa, Rovaniemellä, Saariselällä, Levillä, Ivalossa, Muoniossa, Kemijärvellä, Torniossa, Kemissä, Kuusamossa, Sodankylässä ja Enontekiöllä. Toiminta-alueemme kattaa käytännössä koko Pohjois-Suomen Oulusta Utsjoelle.",
      },
    },
    {
      "@type": "Question",
      name: "Mitä betonilattiapalveluja PSBL tarjoaa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tarjoamme kattavat betonilattiapalvelut: lattiavalut, kuivasirotelattiat (Masterdur, SynTop, HardCem), kovabetonoinnin, lattiapinnoitukset (PU- ja akryylibetonipinnoitukset), kuviobetonoinnin, kiillotetut betonilattiat, holvivalut sekä lattioiden kiillotushionnat. Toteutamme urakoita niin teollisuus-, liike- kuin asuinkohteisiinkin.",
      },
    },
    {
      "@type": "Question",
      name: "Kuinka suuria kohteita PSBL toteuttaa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Toteutamme kaiken kokoisia betonilattiaurakoita yksittäisistä omakotitaloista suuriin teollisuus- ja liiketilakohteisiin. Referenssejämme ovat mm. Kauppakeskus Kuukkeli Saariselällä (3 600 m²), Tokmanni Ivalo (3 500 m²), As Oy Rovaniemen Riistakero (2 500 m²) sekä satoja omakotitalokohteita ympäri Pohjois-Suomea.",
      },
    },
    {
      "@type": "Question",
      name: "Miten pyydän tarjouksen betonilattiatöistä?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Voit pyytää tarjouksen helposti: 1) Täytä yhteydenottolomake sivullamme ${SITE_URL}/yhteystiedot, 2) Lähetä sähköpostia osoitteeseen toimisto@psbl.fi, tai 3) Soita numeroon 044 248 0482. Palaamme tarjouspyyntöihin saman päivän aikana.`,
      },
    },
    {
      "@type": "Question",
      name: "Mikä on kuivasirotelattia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kuivasirotelattia on betonilattian pinnan kovennusmenetelmä, jossa tuoreen betonin pintaan sirotellaan kulutusta kestävää kuiva-ainetta (esim. Masterdur C400, SynTop-450 tai HardCem). Se lisää lattian kulutuskestävyyttä merkittävästi ja sopii erityisesti teollisuus-, varasto- ja autohallilattioihin. PSBL toteuttaa kuivasirotelattioita koko Pohjois-Suomen alueella.",
      },
    },
  ],
};

type SanityServicesSettings = {
  heading?: string | null;
  heroTitle?: string | null; // new (for /palvelut)
  heroSubtitle?: string | null; // new (for /palvelut)
  heroImageUrl?: string | null; // new (for /palvelut)
  services?: {
    title?: string | null;
    imageUrl?: string | null;
    hotspot?: { x: number; y: number } | null;
    ctaHref?: string | null;
  }[];
};

type SanityReferenceItem = {
  _key?: string;
  imageUrl?: string | null;
  caption?: string | null;
  tag?: string | null;
  location?: string | null;
};

type SanityReferencesSettings = {
  heading?: string | null;
  subheading?: string | null;
  items?: SanityReferenceItem[] | null;
};

export default async function HomePage() {
  const [
    heroSettingsResult,
    aboutSettingsResult,
    servicesSettingsResult,
    referencesSettingsResult,
    featuredReferencesResult,
    testimonialsResult,
  ] = await Promise.all([
    sanityFetch({ query: homeSettingsQuery }),
    sanityFetch({ query: aboutSettingsQuery }),
    sanityFetch({ query: servicesSettingsQuery }),
    sanityFetch({ query: referencesSettingsQuery }),
    sanityFetch({ query: featuredReferencesQuery }),
    sanityFetch({ query: approvedTestimonialsQuery }),
  ]);

  const testimonials = (testimonialsResult.data ?? []) as TestimonialItem[];
  const heroSettings = heroSettingsResult.data as (Partial<HeroContent> & {
    stats?: StatItem[] | null;
    tickerItems?: string[] | null;
  }) | null;
  const aboutSettings = aboutSettingsResult.data as Partial<AboutContent> | null;
  const servicesSettings = servicesSettingsResult.data as SanityServicesSettings | null;
  const referencesSettings = referencesSettingsResult.data as SanityReferencesSettings | null;
  const featuredRefs = (featuredReferencesResult.data ?? []) as {
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
  }[];

  const heroContent: HeroContent = {
    ...(heroFallback as HeroContent),
    ...(heroSettings || {}),
  };

  const aboutContent: AboutContent = {
    ...(aboutFallback as AboutContent),
    ...(aboutSettings || {}),
  };

  const servicesContent: ServicesContent = {
    heading:
      servicesSettings?.heading ??
      (servicesFallback as ServicesContent).heading,
    services: (servicesSettings?.services ?? []).length
      ? (servicesSettings!.services!.map((svc, index) => {
          const fb = (servicesFallback as ServicesContent).services[index];

          if (!fb) {
            return {
              title: svc.title ?? "",
              imageUrl: svc.imageUrl ?? "/images/placeholder.jpg",
              hotspot: svc.hotspot ?? null,
              ctaHref: svc.ctaHref ?? null,
            };
          }

          return {
            title: svc.title ?? fb.title,
            imageUrl: svc.imageUrl ?? fb.imageUrl,
            hotspot: svc.hotspot ?? null,
            ctaHref: svc.ctaHref ?? fb.ctaHref,
          };
        }) as ServicesContent["services"])
      : (servicesFallback as ServicesContent).services,
  };

  const referencesContent: ReferencesContent = (() => {
    const fb = referencesFallback as ReferencesContent;
    const s = referencesSettings;

    // Use featured projectReference documents if any exist
    if (featuredRefs.length > 0) {
      const items: ReferenceItem[] = featuredRefs.map((ref) => ({
        _key: ref._id,
        caption: ref.title,
        tag: ref.tag ?? undefined,
        location: ref.location ?? undefined,
        imageUrl: ref.imageUrl ?? undefined,
        sizeM2: ref.sizeM2 ?? undefined,
        excerpt: ref.excerpt ?? undefined,
      }));

      return {
        heading: s?.heading ?? fb.heading,
        subheading: s?.subheading ?? fb.subheading,
        items,
      };
    }

    // Fallback to referencesSettings items or static fallback
    if (!s) return fb;

    const safeItems: ReferenceItem[] =
      s.items && s.items.length
        ? s.items.map((item, index) => {
            const fbItem = fb.items[index];

            return {
              _key: item._key ?? fbItem?._key ?? String(index),
              caption: item.caption ?? fbItem?.caption,
              tag: item.tag ?? fbItem?.tag,
              location: item.location ?? fbItem?.location,
              imageUrl:
                item.imageUrl ?? fbItem?.imageUrl ?? "/images/placeholder.jpg",
            };
          })
        : fb.items;

    return {
      heading: s.heading ?? fb.heading,
      subheading: s.subheading ?? fb.subheading,
      items: safeItems,
    };
  })();

  return (
    <main className="relative flex-1 bg-[var(--dark)] text-[var(--off-white)] overflow-x-hidden w-full">
      {/* JSON-LD Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageJsonLd),
        }}
      />
      {/* FAQ Schema for GEO (Generative Engine Optimization) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <Hero content={heroContent} />
      <Stats items={heroSettings?.stats ?? undefined} />
      <Ticker items={heroSettings?.tickerItems ?? undefined} />
      <About content={aboutContent} />
      <Services content={servicesContent} />
      <References content={referencesContent} />
      {testimonials.length > 0 && <Testimonials items={testimonials} />}
      <BottomCta />
      <Footer />
    </main>
  );
}
