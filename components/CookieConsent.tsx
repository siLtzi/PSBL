"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Script from "next/script";
import { exo2 } from "@/app/fonts";

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
            fixed bottom-0 inset-x-0 z-[100]
            border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md
            shadow-[0_-8px_30px_rgba(0,0,0,0.4)]
            animate-slide-up
            ${exo2.className}
          `}
        >
          <div className="mx-auto max-w-5xl px-4 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Text */}
            <div className="flex-1 text-sm text-zinc-300 leading-relaxed">
              <p>
                Käytämme evästeetöntä analytiikkaa (Plausible) parantaaksemme
                sivustoamme. Emme kerää henkilötietoja.{" "}
                <Link
                  href="/evastekaytanto"
                  prefetch={false}
                  className="underline underline-offset-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  Lue lisää
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 shrink-0">
              <button
                onClick={reject}
                className="
                  px-4 py-2 text-xs font-bold uppercase tracking-wider
                  border border-zinc-600 text-zinc-300 rounded-lg
                  hover:border-zinc-400 hover:text-white
                  transition-colors cursor-pointer
                "
              >
                Vain välttämättömät
              </button>
              <button
                onClick={accept}
                className="
                  px-4 py-2 text-xs font-bold uppercase tracking-wider
                  bg-yellow-400 text-zinc-900 rounded-lg
                  hover:bg-yellow-300
                  transition-colors cursor-pointer
                "
              >
                Hyväksy kaikki
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
