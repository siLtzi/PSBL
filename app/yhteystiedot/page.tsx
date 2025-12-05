import Image from "next/image";
import Footer from "@/components/Footer";
import { exo2, scienceGothic } from "@/app/fonts";
import ContactForm from "@/components/ContactForm";
import FinlandMap from "@/components/FinlandMap";
import { sanityClient } from "@/sanity/config";
import { contactSettingsQuery } from "@/sanity/queries";

type ContactSettings = {
  heroMediaType?: "image" | "video";
  heroImageUrl?: string | null;
  heroVideoUrl?: string | null;
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
    (await sanityClient.fetch<ContactSettings | null>(
      contactSettingsQuery
    )) ?? {};

  const heroTitle = settings.heroTitle ?? "YHTEYSTIEDOT";
  const heroSubtitle =
    settings.heroSubtitle ??
    "Ota yhteyttä jo tänään – palaamme sinulle mahdollisimman pian.";

  const heroMediaType = settings.heroMediaType ?? "image";
  const heroImageUrl = settings.heroImageUrl ?? "/psbl-contact-hero.jpg";
  const heroVideoUrl = settings.heroVideoUrl ?? "";

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

  return (
    <main className="bg-white text-zinc-900">
      {/* HERO */}
      <section className="relative h-[320px] sm:h-[360px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
        {heroMediaType === "video" && heroVideoUrl ? (
          <video
            src={heroVideoUrl}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <Image
            src={heroImageUrl}
            alt="PSBL yhteystiedot - taustakuva"
            fill
            priority
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
          <div>
            <h1
              className={`
                ${scienceGothic.className}
                text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight
              `}
            >
              {heroTitle}
            </h1>
            {heroSubtitle && (
              <p
                className={`
                  ${exo2.className}
                  mt-3 text-xl sm:text-2xl text-zinc-200
                `}
              >
                {heroSubtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* FLOATING MAP (DESKTOP) */}
          <div className="pointer-events-none hidden lg:block absolute left-1/2 top-20 -translate-x-1/2">
            <FinlandMap className="w-52 xl:w-64 drop-shadow-[0_18px_35px_rgba(0,0,0,0.25)]" />
          </div>

          {/* 2 COLUMNS */}
          <div className="grid gap-12 lg:gap-20 lg:grid-cols-2 items-start">
            {/* LEFT COLUMN */}
            <div className="max-w-xl mx-auto text-center lg:text-left">
              <h2
                className={`
                  ${scienceGothic.className}
                  text-2xl sm:text-3xl md:text-4xl font-black tracking-tight
                `}
              >
                {introTitle}
              </h2>

              <p
                className={`
                  ${exo2.className}
                  mt-4 text-sm sm:text-base text-zinc-700 leading-relaxed
                `}
              >
                {introBody}
              </p>

              {/* COMPANY INFO */}
              <div
                className={`
                  ${exo2.className}
                  mt-8 space-y-2 text-sm sm:text-base
                `}
              >
                {company.name && (
                  <p className="font-semibold">{company.name}</p>
                )}
                {company.businessId && (
                  <p>Y-tunnus: {company.businessId}</p>
                )}
                {company.location && <p>{company.location}</p>}

                <div className="mt-4 space-y-1">
                  {company.email && (
                    <p>
                      <span className="font-semibold">Sähköposti: </span>
                      <a
                        href={`mailto:${company.email}`}
                        className="underline underline-offset-2 hover:text-zinc-600"
                      >
                        {company.email}
                      </a>
                    </p>
                  )}
                  {company.phone && (
                    <p>
                      <span className="font-semibold">Puhelin: </span>
                      <a
                        href={`tel:${company.phone.replace(/\s/g, "")}`}
                        className="underline underline-offset-2 hover:text-zinc-600"
                      >
                        {company.phone}
                      </a>
                    </p>
                  )}
                </div>
              </div>

              {/* BILLING INFO */}
              <div className="mt-10">
                <h3
                  className={`
                    ${scienceGothic.className}
                    text-xl sm:text-2xl font-black tracking-tight
                  `}
                >
                  LASKUTUSTIEDOT
                </h3>

                <div
                  className={`
                    ${exo2.className}
                    mt-4 space-y-3 text-sm sm:text-base
                  `}
                >
                  {billing.eInvoiceAddress && (
                    <div>
                      <p className="font-semibold">Verkkolaskuosoite:</p>
                      <p>{billing.eInvoiceAddress}</p>
                    </div>
                  )}

                  {(billing.operatorName || billing.operatorCode) && (
                    <div>
                      <p className="font-semibold">Välittäjä:</p>
                      {billing.operatorName && <p>{billing.operatorName}</p>}
                      {billing.operatorCode && (
                        <p>(Operaattoritunnus: {billing.operatorCode})</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN – FORM (texts from Sanity) */}
            <div className="lg:pl-10 mx-auto w-full max-w-xl text-center lg:text-left">
              <ContactForm heading={formTitle} intro={formIntro} />
            </div>
          </div>

          {/* MOBILE MAP BELOW */}
          <div className="mt-10 flex justify-center lg:hidden">
            <FinlandMap className="w-48 sm:w-56 drop-shadow-[0_18px_35px_rgba(0,0,0,0.25)]" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
