import type { Metadata } from "next";
import "./globals.css";
import { scienceGothic } from "./fonts";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Pohjois-Suomen Betonilattiat",
  description: "Lattiaurakat laatutakuulla yrityksille ja yksityisille.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi" className={scienceGothic.variable}>
      <body className="bg-black text-zinc-50">
        {/* HEADER näkyy nyt KAIKILLA sivuilla */}
        <Header />

        {/* Sivukohtainen sisältö (etusivu, palvelut, yhteystiedot, ...) */}
        {children}
      </body>
    </html>
  );
}
