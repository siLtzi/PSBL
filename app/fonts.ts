import localFont from "next/font/local";

export const scienceGothic = localFont({
  src: [
    { path: "./fonts/ScienceGothic-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ScienceGothic-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/ScienceGothic-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-science-gothic",
  display: "swap",
});

export const exo2 = localFont({
  src: [
    { path: "./fonts/Exo2-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Exo2-Black.woff2", weight: "900", style: "normal" },
    { path: "./fonts/Exo2-Bold.woff2", weight: "700", style: "normal" },

  ],
  variable: "--font-exo2",
  display: "swap",
});
