"use client";

import Link from "next/link";
import { exo2 } from "@/app/fonts";
import { ArrowBigRightDash } from "lucide-react";

export default function Footer() {
  const serviceLinks = [
    { label: "Betonilattiatyöt", href: "/betonilattiatyot" },
    { label: "Kuivasirote­lattiat", href: "/kuivasirotelattiat" },
    { label: "Kuvio­betonointi", href: "/kuviobetonointi" },
    { label: "Lattia­pinnoitukset", href: "/lattiapinnoitukset" },
    { label: "Kova­betonointi", href: "/kovabetonointi" },
    { label: "Kiillotettu betonilattia", href: "/kiillotettu-betonilattia" },
  ];

  return (
    <footer className="text-zinc-900">
      {/* Top white area */}
      <div className="bg-white border-t border-zinc-200">
        <div
          className={`
            mx-auto max-w-6xl px-4 py-10 md:py-12
            grid gap-10 lg:grid-cols-[1fr_2fr] 
            ${exo2.className}
            text-sm
          `}
        >
          {/* LEFT COLUMN: Company, Contact, Socials, Legal */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-base">
                  Pohjois-Suomen Betonilattiat Oy
                </p>
                <p className="text-zinc-500 text-xs">Y-tunnus: 3423998-4</p>
              </div>

              <div className="space-y-1">
                <a
                  href="mailto:toimisto@psbl.fi"
                  className="block hover:text-zinc-600 transition-colors"
                >
                  toimisto@psbl.fi
                </a>
                <a
                  href="tel:+358442480482"
                  className="block hover:text-zinc-600 transition-colors"
                >
                  044 2480 482
                </a>
              </div>

              {/* Socials */}
              <div className="flex gap-4 items-center">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="group transition-transform hover:scale-110"
                >
                  <img
                    src="/fb.svg"
                    alt="Facebook"
                    className="h-6 w-6"
                  />
                </a>
                <a
                  href="https://www.instagram.com/psbl.fi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="group transition-transform hover:scale-110"
                >
                  <img
                    src="/ig.svg"
                    alt="Instagram"
                    className="h-6 w-6"
                  />
                </a>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex gap-4 text-xs text-zinc-500">
              <Link href="/tietosuojaseloste" className="hover:text-zinc-900 underline underline-offset-2">
                Tietosuojaseloste
              </Link>
              <Link href="/evastekaytanto" className="hover:text-zinc-900 underline underline-offset-2">
                Evästekäytäntö
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Services Grid */}
          <div>
            <p className="font-semibold text-xs tracking-[0.12em] uppercase text-zinc-400 mb-4">
              Palvelut
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceLinks.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className={`
                    relative flex items-center 
                    w-full px-5 py-2.5
                    overflow-hidden font-bold text-xs sm:text-sm
                    text-zinc-900 transition-all duration-300 ease-in-out
                    bg-yellow-400 rounded-lg group
                    shadow-[0_2px_8px_rgba(250,204,21,0.2)] hover:shadow-[0_6px_20px_rgba(250,204,21,0.3)]
                    z-0
                  `}
                >
                  {/* Animation bg (Dark fill rising) */}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 bg-zinc-900 group-hover:h-full -z-10" />

                  {/* 1. Enter Arrow (Coming from LEFT) */}
                  <ArrowBigRightDash 
                    className={`
                      absolute left-3 w-5 h-5 text-yellow-400
                      -translate-x-8 opacity-0
                      group-hover:translate-x-0 group-hover:opacity-100
                      transition-all duration-300 ease-out
                      z-20
                    `} 
                  />

                  {/* 2. The Text (Moves RIGHT) */}
                  <span className={`
                    relative z-10 
                    transition-all duration-300 ease-in-out
                    group-hover:translate-x-6 group-hover:text-white
                  `}>
                    {service.label}
                  </span>

                  {/* 3. Exit Arrow (Leaving to RIGHT) */}
                  <ArrowBigRightDash 
                    className={`
                      absolute right-3 w-5 h-5 text-zinc-900 
                      translate-x-0 opacity-100
                      group-hover:translate-x-8 group-hover:opacity-0
                      transition-all duration-300 ease-in
                      z-20
                    `} 
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom yellow bar */}
      <div className="bg-yellow-400 py-3 border-t border-yellow-500/20">
        <div
          className={`
            mx-auto max-w-6xl px-4
            flex flex-col md:flex-row items-center justify-between gap-2
            ${exo2.className}
            text-xs text-zinc-900
          `}
        >
          <span className="opacity-90">© 2025 Pohjois-Suomen Betonilattiat Oy</span>
          <span className="flex items-center gap-2 opacity-90">
            Toteutus:
            <img
              src="/digipaja.svg"
              alt="Digipaja Oulu"
              className="h-5 w-auto hover:opacity-100 transition cursor-pointer"
            />
          </span>
        </div>
      </div>
    </footer>
  );
}