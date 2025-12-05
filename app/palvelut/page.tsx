import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Services, { ServicesContent } from "@/components/Services";
import { sanityClient } from "@/sanity/config";
import { servicesSettingsQuery } from "@/sanity/queries";
import { exo2, scienceGothic } from "@/app/fonts";

type ServicesSettings = {
  heading?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroMediaType?: "image" | "video" | null;
  heroImageUrl?: string | null;
  heroVideoUrl?: string | null;
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
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[450px] overflow-hidden">
        {/* Background: video > image > fallback */}
        {settings.heroMediaType === "video" && settings.heroVideoUrl && (
          <video
            src={settings.heroVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {settings.heroMediaType === "image" && settings.heroImageUrl && (
          <img
            src={settings.heroImageUrl}
            alt={heroTitle}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {!settings.heroMediaType &&
          !settings.heroImageUrl &&
          !settings.heroVideoUrl && (
            <div className="absolute inset-0 bg-zinc-900" />
          )}

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

        {/* Text content */}
        <div
          className={`
    relative z-10 flex items-center justify-center text-center 
    px-4 
    pt-18 sm:pt-20 md:pt-28 
    ${scienceGothic.className}
  `}
        >
          <div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight ">
              {heroTitle}
            </h1>
            {heroSubtitle && (
              <p
                className={`mt-3 text-2xl sm:text-3xl md:text-4xl text-zinc-200 ${exo2.className}`}
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
