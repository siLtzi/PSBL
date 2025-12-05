"use client";

import { exo2, scienceGothic } from "@/app/fonts";
import { ArrowBigRightDash } from "lucide-react";

type ContactFormProps = {
  heading: string;
  intro: string;
};

export default function ContactForm({ heading, intro }: ContactFormProps) {
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
        onSubmit={(e) => {
          e.preventDefault();
          alert("Kiitos viestistä!");
        }}
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

        {/* WORKSITE LOCATION */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-1">
            Työmaan osoite tai sijainti
          </label>
          <input
            type="text"
            name="siteLocation"
            required
            placeholder="Esim. katuosoite, paikkakunta tai Google Maps -linkki"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
          />
          <p className="mt-1 text-[11px] text-zinc-500">
            Anna mahdollisimman tarkka sijainti – osoite tai suora linkki
            karttaan auttaa meitä hinnoittelemaan työn oikein.
          </p>
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

          {/* ---------------------------------------------------------------- */}
          {/*           Animated PSBL CTA Button         */}
          {/* ---------------------------------------------------------------- */}
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
            {/* Hover background grow */}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-zinc-900 transition-all duration-150 ease-in-out group-hover:h-full" />

            {/* Arrow sliding OUT */}
            <span className="absolute right-0 pr-6 duration-200 ease-out group-hover:translate-x-12">
              <ArrowBigRightDash className="w-6 h-6" />
            </span>

            {/* Arrow sliding IN */}
            <span className="absolute left-0 pl-4 -translate-x-12 duration-200 ease-out group-hover:translate-x-0">
              <ArrowBigRightDash className="w-6 h-6 text-yellow-400" />
            </span>

            {/* Button label */}
            <span className={`${scienceGothic.className} relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white`}>
              Lähetä
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
