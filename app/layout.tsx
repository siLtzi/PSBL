import type { Metadata } from "next";
import "./globals.css";
import { scienceGothic } from "./fonts";
import Header from "@/components/Header";
import Script from "next/script";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

export const metadata: Metadata = {
  title: "Pohjois-Suomen Betonilattiat",
  description: "Lattiaurakat laatutakuulla yrityksille ja yksityisille.",

  // ❗ Change this to true once your site goes live
  robots: {
    index: false,   // set to true for production!
    follow: false,  // set to true for production!
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi" className={scienceGothic.variable}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        {/* --- Plausible Analytics --- */}
        <Script
          defer
          data-domain="psbl-ten.vercel.app"               // <-- your real domain
          src="https://plausible.io/js/script.js"
        />
      </head>

      <body className="bg-black text-zinc-50">
        {/* HEADER näkyy kaikilla sivuilla */}
        <Header />

        {/* Sivukohtainen sisältö */}
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
