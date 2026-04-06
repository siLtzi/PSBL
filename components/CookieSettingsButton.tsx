"use client";

import { barlow } from "@/app/fonts";

/**
 * Small button that dispatches `reset-cookie-consent` event.
 * CookieConsent component listens for this and re-shows the banner.
 */
export default function CookieSettingsButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("reset-cookie-consent"))}
      className={`
        ${barlow.className}
        button-snappy
        inline-flex items-center
        px-4 py-2 text-xs font-bold uppercase tracking-wider
        border border-zinc-600 text-zinc-300 rounded-lg
        hover:border-yellow-400 hover:text-yellow-400
        cursor-pointer
      `}
    >
      Muuta evästeasetuksia
    </button>
  );
}
