import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero, { HeroContent } from "@/components/Hero";
import About, { AboutContent } from "@/components/About";
import Services, { ServicesContent } from "@/components/Services";
import References, {
  ReferencesContent,
  ReferenceItem,
} from "@/components/References";
import BottomCta from "@/components/BottomCta";
import Footer from "@/components/Footer";

import { sanityClient } from "@/sanity/config";
import {
  homeSettingsQuery,
  aboutSettingsQuery,
  servicesSettingsQuery,
  referencesSettingsQuery,
} from "@/sanity/queries";

import heroFallback from "@/content/heroFallback.json";
import aboutFallback from "@/content/aboutFallback.json";
import servicesFallback from "@/content/servicesFallback.json";
import referencesFallback from "@/content/referencesFallback.json";

export const metadata: Metadata = {
  title: "Pohjois-Suomen Betonilattiat – Lattiaurakat laatutakuulla",
  description: "Lattiaurakat laatutakuulla yrityksille ja yksityisille.",
};

type SanityServicesSettings = {
  heading?: string | null;
  heroTitle?: string | null; // new (for /palvelut)
  heroSubtitle?: string | null; // new (for /palvelut)
  heroImageUrl?: string | null; // new (for /palvelut)
  services?: {
    title?: string | null;
    imageUrl?: string | null;
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
  const [heroSettings, aboutSettings, servicesSettings, referencesSettings] =
    await Promise.all([
      sanityClient.fetch<Partial<HeroContent> | null>(homeSettingsQuery),
      sanityClient.fetch<Partial<AboutContent> | null>(aboutSettingsQuery),
      sanityClient.fetch<SanityServicesSettings | null>(servicesSettingsQuery),
      sanityClient.fetch<SanityReferencesSettings | null>(
        referencesSettingsQuery,
      ),
    ]);

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
              ctaHref: svc.ctaHref ?? null,
            };
          }

          return {
            title: svc.title ?? fb.title,
            imageUrl: svc.imageUrl ?? fb.imageUrl,
            ctaHref: svc.ctaHref ?? fb.ctaHref,
          };
        }) as ServicesContent["services"])
      : (servicesFallback as ServicesContent).services,
  };

  const referencesContent: ReferencesContent = (() => {
    const fb = referencesFallback as ReferencesContent;
    const s = referencesSettings;

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
    // FIX: Added overflow-x-hidden here to prevent horizontal scrolling issues from GSAP animations or wide content
    <main className="relative flex-1 bg-black text-zinc-50 overflow-x-hidden w-full">
      <Header />
      <Hero content={heroContent} />
      <About content={aboutContent} />
      <Services content={servicesContent} />

      {/* NEW: GSAP references strip between services and bottom CTA */}
      <References content={referencesContent} />

      <BottomCta />
      <Footer />
    </main>
  );
}
