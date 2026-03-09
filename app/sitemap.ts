import { MetadataRoute } from "next";
import { sanityClient } from "@/sanity/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psbl.fi";

// Fetch dynamic routes from Sanity
async function getServiceSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityClient.fetch<{ slug: string }[]>(`
      *[_type == "servicePage" && defined(slug.current)]{
        "slug": slug.current
      }
    `);
    return slugs.map((s) => s.slug);
  } catch {
    return [];
  }
}

async function getReferenceSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityClient.fetch<{ slug: string }[]>(`
      *[_type == "projectReference" && defined(slug.current)]{
        "slug": slug.current
      }
    `);
    return slugs.map((s) => s.slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/palvelut`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/referenssit`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/yhteystiedot`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tietosuojaseloste`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/evastekaytanto`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic service pages
  const serviceSlugs = await getServiceSlugs();
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${SITE_URL}/palvelut/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic reference pages
  const referenceSlugs = await getReferenceSlugs();
  const referencePages: MetadataRoute.Sitemap = referenceSlugs.map((slug) => ({
    url: `${SITE_URL}/referenssit/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...referencePages];
}
