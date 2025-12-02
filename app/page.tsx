import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero, { HeroContent } from "@/components/Hero";
import About, { AboutContent } from "@/components/About";
import Services, { ServicesContent } from "@/components/Services";
import BottomCta from "@/components/BottomCta";
import Footer from "@/components/Footer";

import { sanityClient } from "@/sanity/config";
import {
  homeSettingsQuery,
  aboutSettingsQuery,
  servicesSettingsQuery
} from "@/sanity/queries";

import heroFallback from "@/content/heroFallback.json";
import aboutFallback from "@/content/aboutFallback.json";
import servicesFallback from "@/content/servicesFallback.json";

export const metadata: Metadata = {
  title: "Pohjois-Suomen Betonilattiat – Lattiaurakat laatutakuulla",
  description: "Lattiaurakat laatutakuulla yrityksille ja yksityisille."
};

type SanityServicesSettings = {
  heading?: string | null;
  services?: {
    title?: string | null;
    imageUrl?: string | null;
    ctaHref?: string | null;
  }[];
};

export default async function HomePage() {
  const [heroSettings, aboutSettings, servicesSettings] = await Promise.all([
    sanityClient.fetch<Partial<HeroContent> | null>(homeSettingsQuery),
    sanityClient.fetch<Partial<AboutContent> | null>(aboutSettingsQuery),
    sanityClient.fetch<SanityServicesSettings | null>(servicesSettingsQuery)
  ]);

  const heroContent: HeroContent = {
    ...(heroFallback as HeroContent),
    ...(heroSettings || {})
  };

  const aboutContent: AboutContent = {
    ...(aboutFallback as AboutContent),
    ...(aboutSettings || {})
  };

  const servicesContent: ServicesContent = {
    heading:
      servicesSettings?.heading ?? (servicesFallback as ServicesContent).heading,
    services: (servicesSettings?.services ?? []).length
      ? (servicesSettings!.services!.map((svc, index) => {
          const fb = (servicesFallback as ServicesContent).services[index];

          if (!fb) {
            return {
              title: svc.title ?? "",
              imageUrl: svc.imageUrl ?? "/images/placeholder.jpg",
              ctaHref: svc.ctaHref ?? null
            };
          }

          return {
            title: svc.title ?? fb.title,
            imageUrl: svc.imageUrl ?? fb.imageUrl,
            ctaHref: svc.ctaHref ?? fb.ctaHref
          };
        }) as ServicesContent["services"])
      : (servicesFallback as ServicesContent).services
  };

  return (
    // FIX: Added overflow-x-hidden here to prevent horizontal scrolling issues from GSAP animations or wide content
    <main className="relative flex-1 bg-black text-zinc-50 overflow-x-hidden w-full">
      <Header />
      <Hero content={heroContent} />
      <About content={aboutContent} />
      <Services content={servicesContent} />

      {/* new sections */}
      <BottomCta />
      <Footer />
    </main>
  );
}