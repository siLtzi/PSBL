"use client";

import { useState, FormEvent } from "react";
import dynamic from "next/dynamic";
import { exo2, scienceGothic } from "@/app/fonts";
import { ArrowBigRightDash, MapPin, CheckCircle2 } from "lucide-react";

type ContactFormProps = {
  heading: string;
  intro: string;
};

export type LatLng = { lat: number; lng: number };

// Client-only map modal (no SSR → no window error)
const LocationMapModal = dynamic(
  () => import("./LocationMapModal"),
  { ssr: false }
);

export default function ContactForm({ heading, intro }: ContactFormProps) {
  const [siteLocation, setSiteLocation] = useState("");
  const [coords, setCoords] = useState<LatLng | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleOpenMap = () => {
    setIsMapOpen(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Later: send to API
    console.log("Site location text:", siteLocation);
    console.log("Coordinates:", coords);

    alert("Kiitos viestistä!");
  };

  return (
    <div className="lg:pl-6">
      <h2
        className={`
          ${scienceGothic.className}
          text-2xl sm:text-3xl font-black tracking-tight
        `}
      >
        {heading}
      </h2>

      <p
        className={`
          ${exo2.className}
          mt-2 text-sm sm:text-base text-zinc-700
        `}
      >
        {intro}
      </p>

      <form
        className={`
          ${exo2.className}
          mt-6 space-y-4
        `}
        onSubmit={handleSubmit}
      >
        {/* FIRST ROW: Name + Email */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* NIMI */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-1">
              Nimi
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>

          {/* SÄHKÖPOSTI */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-1">
              Sähköpostiosoite
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
        </div>

        {/* SECOND ROW: Company + Phone */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* YRITYS */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-1">
              Yritys (ei pakollinen)
            </label>
            <input
              type="text"
              name="company"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>

          {/* PUHELIN */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-1">
              Puhelin
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
        </div>

        {/* WORKSITE LOCATION + MAP PICKER */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-1">
            Työmaan osoite tai sijainti
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              name="siteLocation"
              required
              value={siteLocation}
              onChange={(e) => setSiteLocation(e.target.value)}
              placeholder="Esim. katuosoite, paikkakunta tai karttakuvaus"
              className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />

            <button
              type="button"
              onClick={handleOpenMap}
              className="
                inline-flex items-center gap-1 whitespace-nowrap
                rounded-md border border-zinc-300 px-3 py-2 text-[11px] sm:text-xs
                font-semibold uppercase tracking-[0.12em]
                text-zinc-700 hover:bg-zinc-100 transition
              "
            >
              <MapPin className="w-4 h-4" />
              Valitse kartalta
            </button>
          </div>

          <p className="mt-1 text-[11px] text-zinc-500">
            Uusille työmaille voit valita sijainnin suoraan kartalta – tarkat
            koordinaatit auttavat hinnoittelussa.
          </p>

          {coords && (
            <p className="mt-1 text-[11px] text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Sijainti tallennettu ({coords.lat.toFixed(5)},{" "}
              {coords.lng.toFixed(5)}).
            </p>
          )}
        </div>

        {/* MESSAGE FIELD */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-1">
            Viestisi
          </label>
          <textarea
            name="message"
            rows={6}
            required
            placeholder="Esim. betonimäärä, aikataulu, työmaan kuvaus…"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 resize-vertical"
          />
        </div>

        {/* FOOTER SECTION */}
        <div className="pt-2 flex flex-col gap-3">
          <p className="text-[11px] leading-snug text-zinc-500">
            Tämä lomake voidaan suojata esim. Google reCAPTCHA -palvelulla.
          </p>

          <button
            type="submit"
            className="
              hero-cta relative inline-flex items-center justify-start
              py-4 pl-8 pr-16 overflow-hidden font-bold text-base
              text-zinc-900 transition-all duration-150 ease-in-out
              rounded-xl bg-yellow-400 group hover:pl-10 hover:pr-14
              w-full sm:w-auto max-w-xs self-end
              uppercase tracking-wide cursor-pointer
            "
          >
            <span className="absolute bottom-0 left-0 w-full h-1 bg-zinc-900 transition-all duration-150 ease-in-out group-hover:h-full" />

            <span className="absolute right-0 pr-6 duration-200 ease-out group-hover:translate-x-12">
              <ArrowBigRightDash className="w-6 h-6" />
            </span>

            <span className="absolute left-0 pl-4 -translate-x-12 duration-200 ease-out group-hover:translate-x-0">
              <ArrowBigRightDash className="w-6 h-6 text-yellow-400" />
            </span>

            <span
              className={`${scienceGothic.className} relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white`}
            >
              Lähetä
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
            setSiteLocation(`${c.lat.toFixed(6)}, ${c.lng.toFixed(6)}`);
            setIsMapOpen(false);
          }}
        />
      )}
    </div>
  );
}
