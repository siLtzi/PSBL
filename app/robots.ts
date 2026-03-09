import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psbl.fi";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/studio/",      // Sanity Studio
          "/api/",         // API routes
          "/_next/",       // Next.js internals
          "/draft-mode/",  // Draft mode routes
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/studio/", "/api/", "/draft-mode/"],
      },
      {
        // Allow AI crawlers for GEO (Generative Engine Optimization)
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/studio/", "/api/", "/draft-mode/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/studio/", "/api/", "/draft-mode/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/studio/", "/api/", "/draft-mode/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/studio/", "/api/", "/draft-mode/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/studio/", "/api/", "/draft-mode/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
