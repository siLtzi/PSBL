"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Script from "next/script";
import { barlow, barlowCondensed } from "@/app/fonts";

const CONSENT_KEY = "psbl-cookie-consent";
type ConsentValue = "all" | "necessary" | null;

function getStoredConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  const val = localStorage.getItem(CONSENT_KEY);
  if (val === "all" || val === "necessary") return val;
  return null;
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [visible, setVisible] = useState(false);

  // Check stored consent on mount
  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
    } else {
      // Small delay so banner doesn't flash on first paint
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for "reset-cookie-consent" event (from Footer / evästekäytäntö page)
  const handleReset = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY);
    setConsent(null);
    setVisible(true);
  }, []);

  useEffect(() => {
    window.addEventListener("reset-cookie-consent", handleReset);
    return () =>
      window.removeEventListener("reset-cookie-consent", handleReset);
  }, [handleReset]);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "all");
    setConsent("all");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, "necessary");
    setConsent("necessary");
    setVisible(false);
  };

  return (
    <>
      {/* Plausible is cookieless & GDPR-compliant — no consent needed */}
      <Script
        async
        strategy="afterInteractive"
        src="https://plausible.io/js/pa-O7UsupDNIBjKPwgQmfm3t.js"
      />
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init();`}
      </Script>

      {/* Cookie Banner */}
      {visible && (
        <div
          className={`
            fixed bottom-4 inset-x-4 z-50
            animate-slide-up
            ${barlow.className}
          `}
        >
          <div className="mx-auto max-w-[980px]">
            <div className="relative overflow-hidden border border-(--steel) bg-[rgba(13,13,13,0.94)] backdrop-blur-[14px] shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
              <div className="hazard-stripe" />

              <div className="absolute right-4 top-4 hidden sm:block">
                <span
                  className={`
                    ${barlowCondensed.className}
                    text-[3.8rem] leading-none tracking-[2px]
                    text-[rgba(240,192,0,0.08)]
                  `}
                >
                  01
                </span>
              </div>

              <div className="grid gap-6 px-5 py-5 sm:px-7 sm:py-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-8">
                <div className="max-w-[680px]">
                  <div
                    className={`
                      ${barlow.className}
                      mb-3 flex items-center gap-3 text-[0.65rem]
                      font-semibold uppercase tracking-[3px] text-(--yellow)
                    `}
                  >
                    <span className="h-0.5 w-8 bg-(--yellow)" />
                    Evästeasetukset
                  </div>

                  <h3
                    className={`
                      ${barlowCondensed.className}
                      max-w-[14ch] text-[clamp(1.9rem,4vw,3rem)]
                      font-black uppercase leading-[0.95]
                      tracking-[1px] text-(--off-white)
                    `}
                  >
                    Selkeästi mitattu. Ei turhaa seurantaa.
                  </h3>

                  <p className="mt-4 max-w-[60ch] text-sm leading-[1.8] text-(--light) sm:text-[0.95rem]">
                    Käytämme evästeetöntä analytiikkaa parantaaksemme sivuston
                    toimivuutta. Emme seuraa henkilötietoja, ja tallennamme
                    selaimeesi vain tekemäsi valinnan. {" "}
                    <Link
                      href="/evastekaytanto"
                      prefetch={false}
                      className="font-semibold text-(--yellow) transition-colors hover:text-(--yellow-hot)"
                    >
                      Lue evästekäytäntö
                    </Link>
                    .
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col lg:items-stretch">
                  <button
                    onClick={accept}
                    className={`
                      ${barlowCondensed.className}
                      button-cta button-cta-fill-yellow group
                      min-w-[220px] px-6 py-3 text-[0.82rem]
                      font-extrabold uppercase tracking-[2px]
                      bg-(--yellow) text-(--black)
                      cursor-pointer
                    `}
                  >
                    <span className="button-cta-label">Hyväksy kaikki</span>
                  </button>
                  <button
                    onClick={reject}
                    className={`
                      ${barlowCondensed.className}
                      button-cta button-cta-fill-soft-yellow group
                      min-w-[220px] px-6 py-3 text-[0.82rem]
                      font-extrabold uppercase tracking-[2px]
                      border border-(--concrete-gray)
                      bg-transparent text-(--off-white)
                      hover:border-(--yellow) hover:text-(--yellow)
                      cursor-pointer
                    `}
                  >
                    <span className="button-cta-label">Vain välttämättömät</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
