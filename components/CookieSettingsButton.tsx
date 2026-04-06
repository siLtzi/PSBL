"use client";

import { barlowCondensed } from "@/app/fonts";

/**
 * Small button that dispatches `reset-cookie-consent` event.
 * CookieConsent component listens for this and re-shows the banner.
 */
export default function CookieSettingsButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("reset-cookie-consent"))}
      className={`
        ${barlowCondensed.className}
        button-cta button-cta-fill-soft-yellow group
        inline-flex items-center px-5 py-3
        text-[0.78rem] font-extrabold uppercase tracking-[2px]
        border border-(--concrete-gray) bg-transparent text-(--off-white)
        hover:border-(--yellow) hover:text-(--yellow)
        cursor-pointer
      `}
    >
      <span className="button-cta-label">Muuta evästeasetuksia</span>
    </button>
  );
}
