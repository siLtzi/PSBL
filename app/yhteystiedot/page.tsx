import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import { barlowCondensed, barlow } from "@/app/fonts";
import ContactForm from "@/components/ContactForm";
import { sanityClient } from "@/sanity/config";
import { contactSettingsQuery } from "@/sanity/queries";

const FinlandMap = dynamic(() => import("@/components/FinlandMap"), {
  loading: () => <div className="w-24 sm:w-32 md:w-40 lg:w-52 xl:w-60 aspect-[3/5]" />,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psbl.fi";

export const metadata: Metadata = {
  title: "Yhteystiedot | Pyydä tarjous betonilattiatöistä",
  description:
    "Ota yhteyttä ja pyydä tarjous betonilattiatöistä. Palvelemme Pohjois-Suomessa ja Lapissa: Oulu, Rovaniemi, Saariselkä, Levi, Ivalo, Muonio, Kemijärvi, Tornio ja Kemi.",
  alternates: {
    canonical: `${SITE_URL}/yhteystiedot`,
  },
  openGraph: {
    title: "Yhteystiedot | Ota yhteyttä | PSBL",
    description:
      "Pyydä tarjous betonilattiatöistä. Palvelemme koko Pohjois-Suomen ja Lapin alueella.",
    url: `${SITE_URL}/yhteystiedot`,
    type: "website",
  },
};

type ContactSettings = {
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  introTitle?: string | null;
  introBody?: string | null;
  company?: {
    name?: string | null;
    businessId?: string | null;
    location?: string | null;
    email?: string | null;
    phone?: string | null;
  };
  billing?: {
    eInvoiceAddress?: string | null;
    operatorName?: string | null;
    operatorCode?: string | null;
  };
  formTitle?: string | null;
  formIntro?: string | null;
};

export default async function ContactPage() {
  const settings =
    (await sanityClient.fetch<ContactSettings | null>(contactSettingsQuery)) ??
    {};

  const heroTitle = settings.heroTitle ?? "YHTEYSTIEDOT";
  const heroSubtitle =
    settings.heroSubtitle ??
    "Ota yhteyttä jo tänään – palaamme sinulle mahdollisimman pian.";

  const introTitle =
    settings.introTitle ?? "PALVELEMME KOKO POHJOIS-SUOMEN ALUEELLA";
  const introBody =
    settings.introBody ??
    "Voit olla yhteydessä meihin sähköpostitse, yhteydenottolomakkeella tai soittamalla. Jos emme heti vastaa puhelimeen, olemme todennäköisesti työmaalla – soitamme sinulle takaisin saman päivän aikana.";

  const company = settings.company ?? {};
  const billing = settings.billing ?? {};

  const formTitle = settings.formTitle ?? "LÄHETÄ VIESTI";
  const formIntro =
    settings.formIntro ??
    "Täytäthän kaikki kentät, niin osaamme vastata sinulle mahdollisimman hyvin.";

  // JSON-LD for Contact Page
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/yhteystiedot/#webpage`,
    url: `${SITE_URL}/yhteystiedot`,
    name: "Yhteystiedot – Ota yhteyttä ja pyydä tarjous",
    description: heroSubtitle,
    inLanguage: "fi",
    mainEntity: {
      "@type": "LocalBusiness",
      name: company.name || "Pohjois-Suomen Betonilattiat Oy",
      email: company.email || "toimisto@psbl.fi",
      telephone: company.phone || "+358-44-248-0482",
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: company.location || "Oulu",
        addressRegion: "Pohjois-Pohjanmaa",
        addressCountry: "FI",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 65.0121,
        longitude: 25.4651,
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
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "16:00",
      },
    },
  };

  return (
    <main className="bg-[var(--dark)] text-[var(--off-white)]">
      {/* JSON-LD Structured Data for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageJsonLd),
        }}
      />

      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-[var(--black)] pt-[60px]">
        <div className="py-16 sm:py-20 md:py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className={`${barlow.className} text-[0.7rem] font-semibold tracking-[3px] uppercase text-[var(--yellow)] mb-4 flex items-center gap-3`}>
              <span className="w-2 h-2 bg-[var(--yellow)]" />
              Yhteystiedot
            </div>
            <h1
              className={`
                ${barlowCondensed.className}
                text-3xl sm:text-4xl md:text-5xl font-black tracking-[2px] uppercase
              `}
            >
              {heroTitle}
            </h1>
            {heroSubtitle && (
              <p className={`${barlow.className} mt-4 text-base sm:text-lg text-[var(--light)] max-w-2xl`}>
                {heroSubtitle}
              </p>
            )}
          </div>
        </div>
        <div className="hazard-stripe" />
      </section>

      {/* MAIN CONTENT */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* 2 COLUMNS */}
          <div className="grid gap-12 lg:gap-20 lg:grid-cols-2 items-start">
            {/* LEFT COLUMN: text + billing + MAP */}
            <div className="max-w-xl mx-auto">
              <h2
                className={`
                  ${barlowCondensed.className}
                  text-2xl sm:text-3xl md:text-4xl font-black tracking-tight
                `}
              >
                {introTitle}
              </h2>

              <p
                className={`
                  ${barlow.className}
                  mt-4 text-sm sm:text-base text-[var(--light)] leading-relaxed
                `}
              >
                {introBody}
              </p>

              {/* COMPANY + BILLING + MAP WRAPPER */}
              <div className="mt-8 flex flex-row gap-6 items-start">
                {/* LEFT SIDE: company + billing */}
                <div
                  className={`${barlow.className} flex-1 space-y-6 text-sm sm:text-base text-[var(--light)]`}
                >
                  {/* Company info */}
                  <div>
                    {company.name && (
                      <p className="font-semibold text-[var(--off-white)]">{company.name}</p>
                    )}
                    {company.businessId && (
                      <p>Y-tunnus: {company.businessId}</p>
                    )}
                    {company.location && <p>{company.location}</p>}

                    <div className="mt-4 space-y-1">
                      <p className="font-semibold text-[var(--off-white)]">Roni Nyländen</p>
                      {company.email && (
                        <p>
                          <span className="font-semibold text-[var(--off-white)]">Sähköposti: </span>
                          <a
                            href={`mailto:${company.email}`}
                            className="text-[var(--yellow)] underline underline-offset-2 hover:text-[var(--yellow-hot)]"
                          >
                            {company.email}
                          </a>
                        </p>
                      )}
                      {company.phone && (
                        <p>
                          <span className="font-semibold text-[var(--off-white)]">Puhelin: </span>
                          <a
                            href={`tel:${company.phone.replace(/\s/g, "")}`}
                            className="text-[var(--yellow)] underline underline-offset-2 hover:text-[var(--yellow-hot)]"
                          >
                            {company.phone}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Billing info */}
                  <div className="pt-2 border-t border-[var(--steel)]">
                    <h3
                      className={`
                        ${barlowCondensed.className}
                        text-xl sm:text-2xl font-black tracking-[2px] uppercase mb-3
                      `}
                    >
                      LASKUTUSTIEDOT
                    </h3>

                    <div className="space-y-3">
                      {billing.eInvoiceAddress && (
                        <div>
                          <p className="font-semibold text-[var(--off-white)]">Verkkolaskuosoite:</p>
                          <p>{billing.eInvoiceAddress}</p>
                        </div>
                      )}

                      {(billing.operatorName || billing.operatorCode) && (
                        <div>
                          <p className="font-semibold text-[var(--off-white)]">Välittäjä:</p>
                          {billing.operatorName && (
                            <p>{billing.operatorName}</p>
                          )}
                          {billing.operatorCode && (
                            <p>(Operaattoritunnus: {billing.operatorCode})</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE: MAP (always visible, size depends on screen) */}
                <div className="shrink-0 flex items-center justify-center">
                  <FinlandMap
                    className="
                      w-24 
                      xs:w-28
                      sm:w-32
                      md:w-40
                      lg:w-52
                      xl:w-60
                      drop-shadow-[0_18px_35px_rgba(0,0,0,0.25)]
                    "
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN – FORM */}
            <div className="lg:pl-10 mx-auto w-full max-w-xl text-center lg:text-left">
              <ContactForm heading={formTitle} intro={formIntro} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
