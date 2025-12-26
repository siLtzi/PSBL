"use client";
// Required because we use React hooks and GSAP animations.

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// These detect the current URL route.

import { ChevronDown, ArrowBigRightDash, Menu, X } from "lucide-react";
// Icons from lucide-react.

import { exo2, scienceGothic } from "@/app/fonts";
// Project fonts.

import PsblLogo from "@/components/PsblLogo";
// Logo component.

import { gsap } from "gsap";
// GSAP for mobile menu animations.

// -----------------------------------------------------------------------------
// REUSABLE DROPDOWN LINK ITEM (DESKTOP)
// Used inside the "Palvelut" dropdown
// -----------------------------------------------------------------------------
const DropdownItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="
        relative flex items-center w-full 
        py-3 pr-4 overflow-hidden 
        text-xs sm:text-sm font-bold uppercase tracking-wider
        text-zinc-400 
        transition-all duration-300 ease-in-out 
        pl-4 hover:pl-12 hover:text-black
        group/item
      "
    >
      {/* Yellow hover background bar */}
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-400 transition-all duration-300 ease-in-out group-hover/item:h-full" />

      {/* OUT arrow (slides out on hover) */}
      <span className="absolute right-4 transition-all duration-300 group-hover/item:translate-x-10 group-hover/item:opacity-0">
        <ArrowBigRightDash className="w-5 h-5 text-zinc-600" />
      </span>

      {/* IN arrow (slides in on hover) */}
      <span className="absolute left-4 -translate-x-10 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100 z-10">
        <ArrowBigRightDash className="w-5 h-5 text-black" />
      </span>

      {/* Label text */}
      <span className="relative z-10 whitespace-nowrap">{children}</span>
    </Link>
  );
};

// -----------------------------------------------------------------------------
// HEADER COMPONENT
// -----------------------------------------------------------------------------
export default function Header() {
  const pathname = usePathname();
  // Detect current route to highlight active menu items.

  // Hide the site header completely inside Sanity Studio
  if (pathname.startsWith("/studio")) {
    return null;
  }

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------------------------------------------
  // 1. Scroll detection (changes header transparency and shadow)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };

    handleScroll(); // Run immediately on load
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---------------------------------------------------------------------------
  // 2. Lock body scroll when mobile menu is open
  // ---------------------------------------------------------------------------
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  // ---------------------------------------------------------------------------
  // 3. GSAP ANIMATION for mobile menu open
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mobile-menu-bg",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        ".mobile-link",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.06,
          ease: "back.out(1.4)",
          delay: 0.05,
        }
      );
    }, menuRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // Active page flags
  const isHome = pathname === "/";
  const isContact = pathname === "/yhteystiedot";
  const isServices =
    pathname === "/palvelut" || pathname?.startsWith("/palvelut/");
  const isReferences = pathname === "/referenssit"; // 👈 NEW

  // List of services for mobile menu
  const mobileServices = [
    { label: "Betonilattiatyöt", href: "/palvelut/betonilattiatyot-lattiavalut" },
    { label: "Kuivasirotelattiat", href: "/palvelut/kuivasirotelattiat-mastertoplattiat" },
    { label: "Kuviobetonointi", href: "/palvelut/kuviobetonointi" },
    { label: "Lattiapinnoitukset", href: "/palvelut/lattiapinnoitukset" },
    { label: "Kovabetonointi", href: "/palvelut/kovabetonointi" },
    { label: "Kiillotettu betonilattia", href: "/palvelut/kiillotettu-betonilattia" },
  ];

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <>
      {/* MAIN HEADER BAR */}
      <header
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-300 ease-in-out
          max-w-[100vw]
          ${
            scrolled
              ? "bg-black/90 backdrop-blur-md shadow-sm py-2"
              : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4"
          }
        `}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 md:px-10">
          {/* LOGO */}
          <Link
            href="/"
            aria-label="Etusivu"
            className="z-50 relative"
            onClick={() => setIsMenuOpen(false)}
          >
            <PsblLogo />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            className={`
              hidden md:flex items-center gap-8
              text-xs font-bold uppercase tracking-[0.15em]
              ${exo2.className}
            `}
          >
            {/* Etusivu */}
            <Link
              href="/"
              className="group relative pb-1 text-zinc-300 hover:text-white transition-colors"
            >
              Etusivu
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-[2px] bg-yellow-400 origin-left transition-transform duration-200 ${
                  isHome ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>

            {/* Palvelut dropdown */}
            <div className="relative group">
              <button
                type="button"
                className={`flex items-center gap-1 pb-1 transition-colors uppercase tracking-[0.15em] ${
                  isServices ? "text-white" : "text-zinc-300 hover:text-white"
                }`}
              >
                Palvelut
                <ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
              </button>

              <span
                className={`absolute inset-x-0 -bottom-0.5 h-[2px] bg-yellow-400 origin-left transition-transform duration-200 ${
                  isServices
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />

              <div className="absolute right-0 top-full w-72 pt-4 opacity-0 translate-y-4 invisible transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible">
                <div className="rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl">
                  {mobileServices.map((s, i) => (
                    <DropdownItem key={i} href={s.href}>
                      {s.label}
                    </DropdownItem>
                  ))}
                </div>
              </div>
            </div>

            {/* 👇 NEW: Referenssit link */}
            <Link
              href="/referenssit"
              className="group relative pb-1 text-zinc-300 hover:text-white transition-colors"
            >
              Referenssit
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-[2px] bg-yellow-400 origin-left transition-transform duration-200 ${
                  isReferences
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>

            {/* Yhteystiedot */}
            <Link
              href="/yhteystiedot"
              className="group relative pb-1 text-zinc-300 hover:text-white transition-colors"
            >
              Yhteystiedot
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-[2px] bg-yellow-400 origin-left transition-transform duration-200 ${
                  isContact
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          </nav>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-50 p-2 text-white hover:text-yellow-400 transition-colors"
            aria-label={isMenuOpen ? "Sulje valikko" : "Avaa valikko"}
          >
            {isMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </header>

      {/* FULLSCREEN MOBILE MENU (overlay) */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 flex justify-center md:hidden"
        >
          <div className="mobile-menu-bg absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black opacity-0" />

          <div className="relative flex flex-col w-full max-w-sm bg-zinc-950 border-l border-zinc-800 px-6 pt-24 pb-10 overflow-y-auto">
            <nav className={`flex flex-col gap-6 ${scienceGothic.className}`}>
              {/* Home */}
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="mobile-link text-2xl sm:text-3xl font-black text-white uppercase tracking-tight hover:text-yellow-400 transition-colors break-words"
              >
                Etusivu
              </Link>

              {/* Services group */}
              <div className="mobile-link flex flex-col gap-3">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-800 pb-2">
                  Palvelut
                </span>

                <div className={`flex flex-col gap-2 pl-1 ${exo2.className}`}>
                  {mobileServices.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-base font-semibold text-zinc-300 hover:text-white hover:translate-x-1 transition-all duration-200 break-words"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* 👇 NEW: Referenssit (mobile) */}
              <Link
                href="/referenssit"
                onClick={() => setIsMenuOpen(false)}
                className="mobile-link text-2xl sm:text-3xl font-black text-white uppercase tracking-tight hover:text-yellow-400 transition-colors break-words"
              >
                Referenssit
              </Link>

              {/* Contact */}
              <Link
                href="/yhteystiedot"
                onClick={() => setIsMenuOpen(false)}
                className="mobile-link text-2xl sm:text-3xl font-black text-white uppercase tracking-tight hover:text-yellow-400 transition-colors mt-2 break-words"
              >
                Yhteystiedot
              </Link>
            </nav>

            {/* Bottom contact info */}
            <div className="mt-10 mobile-link">
              <a
                href="tel:+358442480482"
                className={`block text-xl font-bold text-yellow-400 mb-1 ${exo2.className}`}
              >
                044 2480 482
              </a>
              <a
                href="mailto:toimisto@psbl.fi"
                className={`block text-sm text-zinc-400 ${exo2.className}`}
              >
                toimisto@psbl.fi
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
