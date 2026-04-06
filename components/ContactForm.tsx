"use client";

import { useState, FormEvent } from "react";
import dynamic from "next/dynamic";
import { barlowCondensed, barlow } from "@/app/fonts";
import { MapPin, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics"; // 👈 NEW

type ContactFormProps = {
  heading: string;
  intro: string;
};

export type LatLng = { lat: number; lng: number };

// Client-only map modal
const LocationMapModal = dynamic(() => import("./LocationMapModal"), {
  ssr: false,
});

export default function ContactForm({ heading, intro }: ContactFormProps) {
  const [siteLocation, setSiteLocation] = useState("");
  const [coords, setCoords] = useState<LatLng | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleOpenMap = () => {
    setIsMapOpen(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string | null,
      email: formData.get("email") as string | null,
      phone: formData.get("phone") as string | null,
      company: formData.get("company") as string | null,
      siteLocationText: formData.get("siteLocationText") as string | null,
      squareMeters: formData.get("squareMeters") as string | null,
      message: formData.get("message") as string | null,
      coords,
    };

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let extra = "";
        try {
          const data = await res.json();
          if (data?.error) {
            extra = ` (${
              typeof data.error === "string"
                ? data.error
                : data.error.message ?? ""
            })`;
          }
        } catch {
          // ignore
        }

        console.error("Contact API failed:", res.status, extra);
        setSubmitError(
          "Viestin lähetys epäonnistui. Yritä hetken päästä uudelleen."
        );

        // 🔴 Track failed submit
        trackEvent("contact_form_error", {
          status: res.status,
        });

        return;
      }

      setSubmitSuccess(true);

      // 🟢 Track successful submit
      trackEvent("contact_form_submitted", {
        has_company: Boolean(payload.company),
        has_coords: Boolean(coords),
        has_square_meters: Boolean(payload.squareMeters),
      });

      form.reset();
      setSiteLocation("");
      setCoords(null);
    } catch (err) {
      console.error("Contact submit error", err);
      setSubmitError("Viestin lähetys epäonnistui. Tarkista verkkoyhteys.");

      // 🔴 Track network/error case
      trackEvent("contact_form_error", {
        type: "network_or_client_error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:pl-6">
      <h2
        className={`
          ${barlowCondensed.className}
          text-2xl sm:text-3xl font-black tracking-[2px] uppercase
        `}
      >
        {heading}
      </h2>

      <p
        className={`
          ${barlow.className}
          mt-2 text-sm sm:text-base text-[var(--light)]
        `}
      >
        {intro}
      </p>

      <form
        className={`
          ${barlow.className}
          mt-6 space-y-4 text-left
        `}
        onSubmit={handleSubmit}
      >
        {/* FIRST ROW: Name + Email */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* NIMI */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mid)] mb-1">
              Nimi*
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-[var(--steel)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--off-white)] focus:outline-none focus:ring-2 focus:ring-[var(--yellow)] focus:border-[var(--yellow)]"
            />
          </div>

          {/* SÄHKÖPOSTI */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mid)] mb-1">
              Sähköpostiosoite*
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-[var(--steel)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--off-white)] focus:outline-none focus:ring-2 focus:ring-[var(--yellow)] focus:border-[var(--yellow)]"
            />
          </div>
        </div>

        {/* SECOND ROW: Company + Phone */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* YRITYS */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mid)] mb-1">
              Yritys
            </label>
            <input
              type="text"
              name="company"
              className="w-full border border-[var(--steel)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--off-white)] focus:outline-none focus:ring-2 focus:ring-[var(--yellow)] focus:border-[var(--yellow)]"
            />
          </div>

          {/* PUHELIN */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mid)] mb-1">
              Puhelin*
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full border border-[var(--steel)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--off-white)] focus:outline-none focus:ring-2 focus:ring-[var(--yellow)] focus:border-[var(--yellow)]"
            />
          </div>
        </div>

        {/* THIRD ROW: Area (m²) */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mid)] mb-1">
              Neliömäärä (m²)
            </label>
            <input
              type="number"
              name="squareMeters"
              min={0}
              step="1"
              placeholder="Esim. 120"
              className="w-full border border-[var(--steel)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--off-white)] placeholder:text-[var(--concrete-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--yellow)] focus:border-[var(--yellow)]"
            />
            <p className="mt-1 text-[11px] text-[var(--mid)]">
              Arvioitu pinta-ala.
            </p>
          </div>
        </div>

        {/* WORKSITE LOCATION + MAP PICKER */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mid)] mb-1">
            Työmaan osoite tai sijainti*
          </label>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              name="siteLocationText"
              required
              value={siteLocation}
              onChange={(e) => setSiteLocation(e.target.value)}
              placeholder="Esim. katuosoite ja paikkakunta"
              className="w-full sm:flex-1 border border-[var(--steel)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--off-white)] placeholder:text-[var(--concrete-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--yellow)] focus:border-[var(--yellow)]"
            />

            <button
              type="button"
              onClick={handleOpenMap}
              className="
                button-snappy
                w-full sm:w-auto
                inline-flex items-center justify-center sm:justify-start gap-1
                border border-[var(--steel)] bg-[var(--panel)] px-3 py-2 text-[11px] sm:text-xs
                font-semibold uppercase tracking-[0.12em]
                text-[var(--light)] hover:border-[var(--yellow)] hover:text-[var(--yellow)]
                hover:bg-[rgba(240,192,0,0.06)]
              "
            >
              <MapPin className="w-4 h-4" />
              Valitse kartalta
            </button>
          </div>

          <p className="mt-1 text-[11px] text-[var(--mid)]">
            Uusille työmaille voit valita sijainnin suoraan kartalta
          </p>

          {coords && (
            <p className="mt-1 text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Sijainti tallennettu ({coords.lat.toFixed(5)},{" "}
              {coords.lng.toFixed(5)}).
            </p>
          )}
        </div>

        {/* MESSAGE FIELD */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mid)] mb-1">
            Viestisi*
          </label>
          <textarea
            name="message"
            rows={6}
            required
            placeholder="Esim. betonimäärä, aikataulu, työmaan kuvaus…"
            className="w-full border border-[var(--steel)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--off-white)] placeholder:text-[var(--concrete-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--yellow)] focus:border-[var(--yellow)] resize-vertical"
          />
        </div>

        {/* STATUS MESSAGES */}
        <div className="text-center lg:text-left min-h-[1.25rem]">
          {submitError && (
            <p className="text-xs text-red-400">{submitError}</p>
          )}
          {submitSuccess && !submitError && (
            <p className="text-xs text-emerald-400">
              Kiitos viestistä! Otamme sinuun yhteyttä mahdollisimman pian.
            </p>
          )}
        </div>

        {/* FOOTER SECTION */}
        <div className="pt-2 flex flex-col gap-3 items-center lg:items-start">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              ${barlowCondensed.className}
              button-cta button-cta-arrow button-cta-fill-yellow group
              inline-flex items-center px-8 py-4 font-extrabold text-[0.85rem]
              tracking-[2.5px] uppercase cursor-pointer
              bg-[var(--yellow)] text-[var(--black)]
              w-full sm:w-auto
              ${isSubmitting ? "opacity-70 cursor-wait" : ""}
            `}
          >
            <span className="button-cta-label">{isSubmitting ? "Lähetetään…" : "Lähetä"}</span>
            <span aria-hidden="true" className="button-cta-icon-out">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
            <span aria-hidden="true" className="button-cta-icon-in">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </button>
        </div>
      </form>

      {/* MAP MODAL (client-only) */}
      {isMapOpen && (
        <LocationMapModal
          initialCoords={coords}
          onCancel={() => setIsMapOpen(false)}
          onConfirm={(c) => {
            setCoords(c);
            setIsMapOpen(false);
          }}
        />
      )}
    </div>
  );
}
