"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { barlowCondensed, barlow } from "@/app/fonts";
import { gsap } from "gsap";

export default function Header() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return null;
  }

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".mobile-menu-bg", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(".mobile-link", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: "back.out(1.4)", delay: 0.05 });
    }, menuRef);
    return () => ctx.revert();
  }, [isMenuOpen]);

  const navLinks = [
    { label: "Palvelut", href: "/palvelut", id: "palvelut" },
    { label: "Referenssit", href: "/referenssit", id: "referenssit" },
    { label: "Yhteystiedot", href: "/yhteystiedot", id: "yhteystiedot" },
  ];

  const mobileServices = [
    { label: "Betonilattiatyöt", href: "/palvelut/betonilattiatyot-lattiavalut" },
    { label: "Kuivasirotelattiat", href: "/palvelut/kuivasirotelattiat-mastertoplattiat" },
    { label: "Kuviobetonointi", href: "/palvelut/kuviobetonointi" },
    { label: "Lattiapinnoitukset", href: "/palvelut/lattiapinnoitukset" },
    { label: "Kovabetonointi", href: "/palvelut/kovabetonointi" },
    { label: "Kiillotettu betonilattia", href: "/palvelut/kiillotettu-betonilattia" },
  ];

  return (
    <>
      {/* TOPBAR */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-[1000]
          flex items-center justify-between
          px-8 h-[60px]
          border-b-[3px] border-[var(--yellow)]
          transition-all duration-400
          ${scrolled
            ? "bg-[rgba(13,13,13,0.92)] backdrop-blur-[12px]"
            : "bg-[var(--black)]"
          }
        `}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`
            ${barlowCondensed.className}
            font-black text-[1.4rem] tracking-[4px] uppercase
            text-[var(--yellow)] flex items-center gap-3
          `}
        >
          <div className="w-8 h-8 bg-[var(--yellow)] text-[var(--black)] flex items-center justify-center text-[0.75rem] font-black tracking-[1px]">
            PSBL
          </div>
          <span className="hidden sm:inline">Betonilattiat</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex list-none h-full">
          {navLinks.map((link) => (
            <li key={link.id} className="h-full">
              <Link
                href={link.href}
                className={`
                  ${barlow.className}
                  flex items-center h-full px-6
                  text-[0.7rem] font-semibold tracking-[2px] uppercase
                  text-[var(--mid)] border-l border-[var(--steel)]
                  transition-all duration-200
                  hover:text-[var(--yellow)] hover:bg-[rgba(240,192,0,0.05)]
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/yhteystiedot"
          className={`
            ${barlowCondensed.className}
            hidden md:block
            font-extrabold text-[0.8rem] tracking-[2px] uppercase
            px-6 py-2.5
            bg-[var(--yellow)] text-[var(--black)]
            transition-all duration-200
            hover:bg-[var(--yellow-hot)] hover:shadow-[0_0_25px_rgba(240,192,0,0.3)]
          `}
        >
          Pyydä tarjous
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-50 p-2 text-[var(--off-white)] hover:text-[var(--yellow)] transition-colors"
          aria-label={isMenuOpen ? "Sulje valikko" : "Avaa valikko"}
        >
          {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div ref={menuRef} className="fixed inset-0 z-[999] flex justify-center md:hidden">
          <div className="mobile-menu-bg absolute inset-0 bg-[var(--black)] opacity-0" />
          <div className="relative flex flex-col w-full bg-[var(--black)] border-t-[3px] border-[var(--yellow)] px-6 pt-20 pb-10 overflow-y-auto">
            <nav className={`flex flex-col gap-6 ${barlowCondensed.className}`}>
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="mobile-link text-2xl font-black text-[var(--off-white)] uppercase tracking-[2px] hover:text-[var(--yellow)] transition-colors">
                Etusivu
              </Link>

              <div className="mobile-link flex flex-col gap-3">
                <span className={`${barlow.className} text-xs font-bold text-[var(--mid)] uppercase tracking-[3px] border-b border-[var(--steel)] pb-2`}>
                  Palvelut
                </span>
                <div className="flex flex-col gap-2 pl-1">
                  {mobileServices.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      prefetch={false}
                      onClick={() => setIsMenuOpen(false)}
                      className={`${barlow.className} text-sm font-medium text-[var(--light)] hover:text-[var(--yellow)] transition-all duration-200`}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/referenssit" onClick={() => setIsMenuOpen(false)} className="mobile-link text-2xl font-black text-[var(--off-white)] uppercase tracking-[2px] hover:text-[var(--yellow)] transition-colors">
                Referenssit
              </Link>

              <Link href="/yhteystiedot" onClick={() => setIsMenuOpen(false)} className="mobile-link text-2xl font-black text-[var(--off-white)] uppercase tracking-[2px] hover:text-[var(--yellow)] transition-colors mt-2">
                Yhteystiedot
              </Link>
            </nav>

            <div className={`mt-10 mobile-link ${barlow.className}`}>
              <a href="tel:+358442480482" className="block text-xl font-bold text-[var(--yellow)] mb-1">
                044 2480 482
              </a>
              <a href="mailto:toimisto@psbl.fi" className="block text-sm text-[var(--mid)]">
                toimisto@psbl.fi
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
