import Link from "next/link";
import { barlowCondensed, ibmPlexMono } from "@/app/fonts";

export default function BottomCta() {
  return (
    <section className="relative bg-[var(--yellow)] text-[var(--black)]">
      {/* Hazard stripe at top */}
      <div className="hazard-stripe-reverse" />

      <div className="py-16 md:py-20 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Heading */}
          <div>
            <div
              className={`${ibmPlexMono.className} text-[0.65rem] font-semibold tracking-[3px] uppercase text-[var(--black)]/60 mb-4 flex items-center gap-3`}
            >
              <span className="text-[var(--black)]/30">{"//"}</span>
              Ota yhteyttä
            </div>
            <h2
              className={`${barlowCondensed.className} font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase tracking-[2px] leading-[0.95]`}
            >
              Tehdäänkö tarjous
              <br />
              urakallesi?
            </h2>
            <p className={`${ibmPlexMono.className} mt-4 text-sm text-[var(--black)]/70 max-w-md leading-relaxed`}>
              Meidän kauttamme saat betonilattiatyön, kuljetuksen ja pumppauksen
              helposti samassa paketissa kiinteällä hinnalla.
            </p>
          </div>

          {/* Right: Contact info + CTA */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <div className={`${ibmPlexMono.className} text-[0.6rem] tracking-[2px] uppercase font-semibold opacity-60`}>Puhelin</div>
                  <a href="tel:+358442480482" className={`${barlowCondensed.className} text-lg font-bold hover:underline`}>044 2480 482</a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className={`${ibmPlexMono.className} text-[0.6rem] tracking-[2px] uppercase font-semibold opacity-60`}>Sähköposti</div>
                  <a href="mailto:toimisto@psbl.fi" className={`${barlowCondensed.className} text-lg font-bold hover:underline`}>toimisto@psbl.fi</a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div className={`${ibmPlexMono.className} text-[0.6rem] tracking-[2px] uppercase font-semibold opacity-60`}>Sijainti</div>
                  <span className={`${barlowCondensed.className} text-lg font-bold`}>Pohjois-Suomi</span>
                </div>
              </div>
            </div>

            <Link
              href="/yhteystiedot"
              className={`${barlowCondensed.className} inline-flex items-center justify-center uppercase font-extrabold text-lg tracking-[2px] bg-[var(--black)] text-[var(--yellow)] px-10 py-4 hover:bg-[var(--dark)] transition-colors duration-300 w-fit`}
            >
              Pyydä tarjous →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}