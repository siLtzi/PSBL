import localFont from "next/font/local";
import { Barlow_Condensed, Barlow } from "next/font/google";

export const scienceGothic = localFont({
  src: [
    { path: "./fonts/ScienceGothic-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ScienceGothic-Bold.woff2",    weight: "700", style: "normal" },
    { path: "./fonts/ScienceGothic-Black.woff2",   weight: "900", style: "normal" },
  ],
  variable: "--font-science-gothic",
  display: "swap",
});

// 👇 USE THIS EVERYWHERE FOR GOTHIC
export const scienceGothicCaps = `${scienceGothic.className} uppercase`;


export const exo2 = localFont({
  src: [
    { path: "./fonts/Exo2-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Exo2-Black.woff2",   weight: "900", style: "normal" },
    { path: "./fonts/Exo2-Bold.woff2",    weight: "700", style: "normal" },
  ],
  variable: "--font-exo2",
  display: "swap",
});

// Industrial theme fonts
export const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});
