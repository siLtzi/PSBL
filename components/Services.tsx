"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { scienceGothic } from "@/app/fonts";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ServiceItem = {
  title: string;
  imageUrl: string;
  ctaHref: string | null;
};

export type ServicesContent = {
  heading: string;
  services: ServiceItem[];
};

export default function Services({ content }: { content: ServicesContent }) {
  const { heading, services } = content;
  const sectionRef = useRef<HTMLElement>(null);
  
  // 1. SPLIT TEXT LOGIC (The React Way)
  // We split the heading string into an array of characters to animate them individually.
  const headingChars = heading.split("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 2. SEQUENTIAL HEADING ANIMATION
      // Instead of animating the whole block, we stagger the characters
      gsap.from(".service-char", {
        scrollTrigger: {
          trigger: "[data-animate='header']",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 40,          // Comes from below
        rotateX: -90,   // slight 3D rotation flip
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,  // Fast ripple effect between letters
        ease: "back.out(1.7)", // "Pop" effect
      });

      // Animate the Yellow Line (after text starts)
      gsap.from(".service-line", {
        scrollTrigger: {
          trigger: "[data-animate='header']",
          start: "top 85%",
        },
        width: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4, // Wait for text to mostly finish
      });

      // 3. STAGGER ANIMATE CARDS
      gsap.from("[data-animate='card']", {
        scrollTrigger: {
          trigger: "[data-animate='grid']",
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-white text-zinc-900 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[120rem] px-6 sm:px-10 lg:px-16">
        
        {/* Heading Container */}
        <div 
          data-animate="header" 
          className="text-center mb-10 md:mb-12 perspective-[400px]" // Added perspective for 3D flip
        >
          <h2
            aria-label={heading} // Accessibility: Screen readers read the full word
            className={`
              ${scienceGothic.className}
              text-3xl sm:text-4xl md:text-5xl
              font-black tracking-tight text-zinc-900
              inline-flex flex-wrap justify-center gap-[0.05em] /* Gap handles word spacing implicitly */
            `}
          >
            {/* 4. RENDER SPLIT CHARACTERS */}
            {headingChars.map((char, i) => (
              <span 
                key={i} 
                className="service-char inline-block origin-bottom"
              >
                {/* Preserve spaces by replacing empty string with non-breaking space */}
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>

          <div className="service-line mt-4 mx-auto h-1.5 w-20 rounded-full bg-yellow-400" />
        </div>

        {/* Grid */}
        <div 
          data-animate="grid" 
          className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service) => {
            const cardContent = (
              <article className="relative h-full overflow-hidden rounded-xl shadow-[0_14px_30px_rgba(0,0,0,0.12)] group">
                <div className="relative h-56 sm:h-64 md:h-60 lg:h-64">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-all duration-500 group-hover:h-[70%] group-hover:opacity-100" />
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 p-4 sm:p-5 flex flex-col items-center text-center">
                  <h3 className={`${scienceGothic.className} relative inline-block text-lg sm:text-xl font-bold text-white`}>
                    <span className="block transition-opacity duration-500 group-hover:opacity-0" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.85)" }}>
                      {service.title}
                    </span>
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {service.title}
                    </span>
                  </h3>
                </div>
                <div className="absolute bottom-0 left-0 z-40 h-1 w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
              </article>
            );

            if (service.ctaHref) {
              return (
                <Link key={service.title} href={service.ctaHref} data-animate="card" className="block h-full">
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={service.title} data-animate="card" className="block h-full cursor-default">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}