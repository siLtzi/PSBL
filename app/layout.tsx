import type { Metadata, Viewport } from "next";
import "./globals.css";
import { scienceGothic } from "./fonts";
import Header from "@/components/Header";
import CookieConsent from "@/components/CookieConsent";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

// ============================================
// SEO CONFIGURATION
// ============================================
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psbl.fi";
const SITE_NAME = "Pohjois-Suomen Betonilattiat";
const SITE_DESCRIPTION = "Ammattitaitoisia betonilattiaurakoita laatutakuulla yrityksille ja yksityisille koko Pohjois-Suomen alueella. Lattiavalut, kuivasirotelattiat, kovabetonointi, lattiapinnoitukset ja kiillotetut betonilattiat – laadukkaasti ja aikataulussa.";

export const metadata: Metadata = {
  // Base metadata
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Lattiaurakat laatutakuulla`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "betonilattiat",
    "betonilattiatyöt",
    "lattiaurakat",
    "betoniurakointi",
    "kuivasirotelattiat",
    "kovabetonointi",
    "lattiapinnoitukset",
    "kuviobetonointi",
    "kiillotettu betonilattia",
    "lattiavalut",
    "teollisuuslattiat",
    "varastolattiat",
    "autohallilattiat",
    "akryylibetonipinnoitus",
    "PU-pinnoitus",
    "HardCem-lattia",
    "Masterdur lattia",
    "holvivalut",
    "lattioiden kiillotushionnat",
    "betonilattia urakoitsija",
    "lattiaurakoitsija Pohjois-Suomi",
    "betonilattiat Rovaniemi",
    "betonilattiat Oulu",
    "betonilattiat Lappi",
    "lattiavalut Saariselkä",
    "lattiavalut Levi",
    "lattiavalut Muonio",
    "betonilattiat Kemi",
    "betonilattiat Tornio",
    "betonilattiat Ivalo",
    "betonilattiat Kemijärvi",
    "Oulu",
    "Pohjois-Suomi",
    "Rovaniemi",
    "Kuusamo",
    "Lappi",
  ],
  authors: [{ name: "Pohjois-Suomen Betonilattiat Oy" }],
  creator: "Pohjois-Suomen Betonilattiat Oy",
  publisher: "Pohjois-Suomen Betonilattiat Oy",

  // Robots - SET TO TRUE FOR PRODUCTION
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "fi_FI",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} – Lattiaurakat laatutakuulla`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Pohjois-Suomen Betonilattiat – Ammattitaitoisia betonilattiaurakoita",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} – Lattiaurakat laatutakuulla`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },

  // Verification (add your actual verification codes)
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // Alternate languages (if you add English later)
  alternates: {
    canonical: SITE_URL,
    languages: {
      "fi-FI": SITE_URL,
    },
  },

  // Category
  category: "construction",

  // Other
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// Viewport configuration (separated in Next.js 14+)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// JSON-LD Structured Data for Organization
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pohjois-Suomen Betonilattiat Oy",
  alternateName: "PSBL",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Oulu",
    addressRegion: "Pohjois-Pohjanmaa",
    addressCountry: "FI",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+358-44-248-0482",
    contactType: "customer service",
    email: "toimisto@psbl.fi",
    availableLanguage: ["Finnish"],
    areaServed: "FI",
  },
  sameAs: [
    "https://www.instagram.com/psbl.fi/",
  ],
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 65.0121,
      longitude: 25.4651,
    },
    geoRadius: "500000", // 500km radius covering Northern Finland
  },
};

// JSON-LD for Local Business
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Pohjois-Suomen Betonilattiat Oy",
  image: `${SITE_URL}/og-image.png`,
  url: SITE_URL,
  telephone: "+358-44-248-0482",
  email: "toimisto@psbl.fi",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Oulu",
    addressRegion: "Pohjois-Pohjanmaa",
    postalCode: "90100",
    addressCountry: "FI",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 65.0121,
    longitude: 25.4651,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "16:00",
    },
  ],
  areaServed: [
    { "@type": "Place", name: "Oulu" },
    { "@type": "Place", name: "Rovaniemi" },
    { "@type": "Place", name: "Kuusamo" },
    { "@type": "Place", name: "Kajaani" },
    { "@type": "Place", name: "Kemi" },
    { "@type": "Place", name: "Tornio" },
    { "@type": "Place", name: "Raahe" },
    { "@type": "Place", name: "Ylivieska" },
    { "@type": "Place", name: "Saariselkä" },
    { "@type": "Place", name: "Levi" },
    { "@type": "Place", name: "Muonio" },
    { "@type": "Place", name: "Ivalo" },
    { "@type": "Place", name: "Kemijärvi" },
    { "@type": "Place", name: "Sodankylä" },
    { "@type": "Place", name: "Enontekiö" },
    { "@type": "AdministrativeArea", name: "Pohjois-Suomi" },
    { "@type": "AdministrativeArea", name: "Lappi" },
  ],
  serviceType: [
    "Betonilattiatyöt",
    "Lattiavalut",
    "Kuivasirotelattiat",
    "Kovabetonointi",
    "Lattiapinnoitukset",
    "Kuviobetonointi",
    "Kiillotettu betonilattia",
    "Holvivalut",
    "Akryylibetonipinnoitukset",
    "PU-pinnoitukset",
    "Lattioiden kiillotushionnat",
  ],
  knowsAbout: [
    "Betonilattiaurakointi",
    "Teollisuuslattiat",
    "Varastolattiat",
    "Liiketilalattiat",
    "Pysäköintihallilattiat",
    "Masterdur kuivasirotelattiat",
    "HardCem-lattiat",
    "SynTop kuivasirotelattiat",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi" className={scienceGothic.variable}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

      </head>

      <body className="bg-black text-zinc-50">
        {/* HEADER näkyy kaikilla sivuilla */}
        <Header />

        {/* Sivukohtainen sisältö */}
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}

        {/* Cookie consent banner + conditional Plausible analytics */}
        <CookieConsent />
      </body>
    </html>
  );
}
