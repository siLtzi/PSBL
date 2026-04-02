import Link from "next/link";
import { barlowCondensed, barlow } from "@/app/fonts";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import {
  DIGIPAJA_LOGO_VIEWBOX,
  D,
  DOT,
  DIGIPAJA_WORDMARK_LETTERS,
  DIGIPAJA_OULU_LETTERS,
} from "@/components/dLogoPaths";

export default function Footer() {
  const serviceLinks = [
    { label: "Betonilattiatyöt", href: "/palvelut/betonilattiatyot-lattiavalut" },
    { label: "Kuivasirotelattiat", href: "/palvelut/kuivasirotelattiat-mastertoplattiat" },
    { label: "Kuviobetonointi", href: "/palvelut/kuviobetonointi" },
    { label: "Lattiapinnoitukset", href: "/palvelut/lattiapinnoitukset" },
    { label: "Kovabetonointi", href: "/palvelut/kovabetonointi" },
    { label: "Kiillotettu betonilattia", href: "/palvelut/kiillotettu-betonilattia" },
  ];

  const col1 = serviceLinks.slice(0, 3);
  const col2 = serviceLinks.slice(3);

  return (
    <footer className="bg-[var(--black)] text-[var(--off-white)] border-t-[3px] border-[var(--steel)]">
      {/* Main grid */}
      <div className="px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-[var(--yellow)] flex items-center justify-center">
                <span className={`${barlowCondensed.className} text-[var(--black)] font-black text-sm leading-none`}>P</span>
              </div>
              <span className={`${barlowCondensed.className} font-extrabold text-lg uppercase tracking-[2px] text-[var(--off-white)]`}>
                PSBL
              </span>
            </div>
            <p className={`${barlow.className} text-xs text-[var(--mid)] leading-relaxed mb-4`}>
              Pohjois-Suomen Betonilattiat Oy
              <br />
              Y-tunnus: 3423998-4
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/psbl.fi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center border border-[var(--steel)] text-[var(--mid)] hover:border-[var(--yellow)] hover:text-[var(--yellow)] transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services col 1 */}
          <div>
            <h4 className={`${barlow.className} text-[0.6rem] font-semibold tracking-[3px] uppercase text-[var(--yellow)] mb-5`}>
              Palvelut
            </h4>
            <ul className="space-y-2.5">
              {col1.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className={`${barlow.className} text-xs text-[var(--light)] hover:text-[var(--yellow)] transition-colors duration-200`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services col 2 */}
          <div>
            <h4 className={`${barlow.className} text-[0.6rem] font-semibold tracking-[3px] uppercase text-[var(--yellow)] mb-5`}>
              Lisäpalvelut
            </h4>
            <ul className="space-y-2.5">
              {col2.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className={`${barlow.className} text-xs text-[var(--light)] hover:text-[var(--yellow)] transition-colors duration-200`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`${barlow.className} text-[0.6rem] font-semibold tracking-[3px] uppercase text-[var(--yellow)] mb-5`}>
              Yhteystiedot
            </h4>
            <ul className={`${barlow.className} text-xs text-[var(--light)] space-y-2.5`}>
              <li>
                <a href="mailto:toimisto@psbl.fi" className="hover:text-[var(--yellow)] transition-colors duration-200">
                  toimisto@psbl.fi
                </a>
              </li>
              <li>
                <a href="tel:+358442480482" className="hover:text-[var(--yellow)] transition-colors duration-200">
                  044 2480 482
                </a>
              </li>
              <li className="text-[var(--mid)]">Pohjois-Suomi</li>
            </ul>

            {/* Legal links */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/tietosuojaseloste"
                prefetch={false}
                className={`${barlow.className} text-[0.55rem] tracking-[1px] text-[var(--mid)] hover:text-[var(--yellow)] transition-colors duration-200`}
              >
                Tietosuojaseloste
              </Link>
              <Link
                href="/evastekaytanto"
                prefetch={false}
                className={`${barlow.className} text-[0.55rem] tracking-[1px] text-[var(--mid)] hover:text-[var(--yellow)] transition-colors duration-200`}
              >
                Evästekäytäntö
              </Link>
              <CookieSettingsButton />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--steel)] px-6 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className={`${barlow.className} text-[0.55rem] tracking-[1px] text-[var(--mid)]`}>
          © 2025 Pohjois-Suomen Betonilattiat Oy
        </span>
        <span className={`${barlow.className} text-[0.55rem] tracking-[1px] text-[var(--mid)] flex items-center gap-2`}>
          Toteutus:
          <a
            href="https://digipajaoulu.fi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Digipaja Oulu"
            className="hover:opacity-80 transition"
          >
            <svg
              viewBox={DIGIPAJA_LOGO_VIEWBOX}
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-auto"
              aria-hidden="true"
            >
              {D.map((d, i) => (
                <path key={`d-${i}`} d={d} fill="#F7941D" />
              ))}
              {DOT.map((d, i) => (
                <path key={`dot-${i}`} d={d} fill="#F7941D" />
              ))}
              {DIGIPAJA_WORDMARK_LETTERS.map((letter) =>
                letter.paths.map((d, i) => (
                  <path key={`wm-${letter.id}-${i}`} d={d} fill="currentColor" />
                ))
              )}
              {DIGIPAJA_OULU_LETTERS.map((letter) =>
                letter.paths.map((d, i) => (
                  <path key={`ol-${letter.id}-${i}`} d={d} fill="currentColor" />
                ))
              )}
            </svg>
          </a>
        </span>
      </div>
    </footer>
  );
}
