// "use client" tells Next.js to render this component in the browser, not the server.
// We need this for things like 'useEffect' (animations) and 'useRef' (grabbing HTML elements).
"use client";

import { useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { scienceGothic } from "@/app/fonts";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


// --- SERVER-SIDE CHECK ---
// Next.js runs on the server first. "window" (the browser window) doesn't exist there.
// We check if "window" is not undefined before registering GSAP plugins to prevent crashes.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- TYPE DEFINITIONS (TypeScript) ---
// This acts like a blueprint. We define exactly what shape our data should have.
export type ServiceItem = {
  title: string;
  imageUrl: string;
  ctaHref: string | null; // This can be a string (URL) OR null (no link).
};

export type ServicesContent = {
  heading: string;
  services: ServiceItem[]; // An array (list) of ServiceItems.
};

// --- MAIN COMPONENT ---
// This is the function that builds our section.
// It accepts 'props' (properties): 'content' (data) and 'hideHeading' (settings).
export default function Services({
  content,
  hideHeading = false // Default to false (show the heading) if not specified.
}: {
  content: ServicesContent;
  hideHeading?: boolean; // The '?' means this is optional.
}) {
  // 1. Destructuring: extracting 'heading' and 'services' from the 'content' object
  // so we can use them directly instead of typing content.heading every time.
  const { heading, services } = content;

  // 2. useRef: This creates a "hook" or "reference" to an HTML element.
  // We attach this to the <section> later so GSAP knows exactly where to animate.
  const sectionRef = useRef<HTMLElement>(null);

  // 3. Split Heading: We chop the heading string into a list of individual letters.
  // Example: "Services" -> ["S", "e", "r", "v", "i", "c", "e", "s"]
  // This allows us to animate each letter popping in one by one.
  // Memoized to avoid recalculating on every render.
  const headingChars = useMemo(() => heading.split(""), [heading]);

  // --- ANIMATION LOGIC (useEffect) ---
  // useEffect runs code *after* the component renders (appears on screen).
  // This is the perfect place to start animations.
  useEffect(() => {
    
    // gsap.context: This is a best practice in React.
    // It groups all our animations together so we can easily clean them up later.
    const ctx = gsap.context(() => {

      // A. HEADER ANIMATION (Only run if the header is visible)
      if (!hideHeading) {
        
        // Animate the letters (.service-char)
        gsap.from(".service-char", {
          scrollTrigger: {
            trigger: "[data-animate='header']", // Start when the header div is visible
            start: "top 85%", // Start when the top of the element hits 85% down the viewport
            toggleActions: "play none none reverse", // Play when scrolling down, reverse when scrolling up
          },
          y: 40, // Start 40 pixels lower than final position
          rotateX: -90, // Start rotated 90 degrees (lying flat)
          opacity: 0, // Start invisible
          duration: 0.8, // Take 0.8 seconds to complete
          stagger: 0.03, // Wait 0.03s between each letter (creates the wave effect)
          ease: "back.out(1.7)", // "Overshoot" the target slightly for a bouncy feel
        });

        // Animate the yellow underline (.service-line)
        gsap.from(".service-line", {
          scrollTrigger: {
            trigger: "[data-animate='header']",
            start: "top 85%",
          },
          width: 0, // Start with 0 width (invisible)
          duration: 0.8,
          ease: "power3.out", // Smooth deceleration
          delay: 0.4, // Wait 0.4s before starting (let the text finish first)
        });
      }

      // B. CARD ANIMATION
      // Target all elements with the attribute data-animate="card"
      gsap.from("[data-animate='card']", {
        scrollTrigger: {
          trigger: "[data-animate='grid']", // Start when the grid container is visible
          start: "top 75%", // Trigger slightly earlier than the header
        },
        y: 60, // Slide up from 60px down
        opacity: 0, // Fade in
        duration: 0.8,
        stagger: 0.1, // Each card waits 0.1s after the previous one (cascade effect)
        ease: "power3.out",
      });

    }, sectionRef); // IMPORTANT: We scope the selector to 'sectionRef' so we don't accidentally animate other things on the page.

    // Cleanup: If the user leaves the page, 'revert' kills the animations to save memory.
    return () => ctx.revert();
  }, [hideHeading]); // The dependency array: If 'hideHeading' changes, re-run this setup.

  // --- HTML / JSX RENDERING ---
  // This is what actually gets drawn on the screen.
  return (
    <section
      ref={sectionRef} // We attach our 'hook' here so GSAP can control this section.
      className="relative w-full bg-white text-zinc-900 py-16 md:py-24 contain-layout"
    >
      <div className="mx-auto max-w-[120rem] px-6 sm:px-10 lg:px-16">

        {/* CONDITIONAL RENDERING: 
            This logic means: "If hideHeading is NOT true, then render the div below."
        */}
        {!hideHeading && (
          <div
            data-animate="header" // A custom attribute we use as a trigger for GSAP
            className="text-center mb-10 md:mb-12 perspective-[400px]"
          >
            <h2
              aria-label={heading} // Helps screen readers read the full word, not just individual letters.
              className={`
                ${scienceGothic.className} 
                text-3xl sm:text-4xl md:text-5xl 
                font-black tracking-tight text-zinc-900 
                inline-flex flex-wrap justify-center gap-[0.05em]
              `}
            >
              {/* Map (Loop): Go through each letter and wrap it in a span for animation */}
              {headingChars.map((char, i) => (
                <span
                  key={i} // React needs a unique 'key' for every item in a list.
                  className="service-char inline-block origin-bottom will-change-transform"
                >
                  {/* If the character is a space, use a non-breaking space code (\u00A0) so it doesn't collapse */}
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>

            {/* The yellow decorative line */}
            <div className="service-line mt-4 mx-auto h-1.5 w-20 rounded-full bg-yellow-400 will-change-[width]" />
          </div>
        )}

        {/* Grid Container */}
        <div
          data-animate="grid" // Trigger for the card animations
          className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {/* Map (Loop): Go through the 'services' list and create a card for each one */}
          {services.map((service, index) => {
            
            // We define the card's inner content here so we don't have to write it twice.
            const cardContent = (
              // 'group': This Tailwind class lets child elements react when the PARENT is hovered.
              <article className="relative h-full overflow-hidden rounded-xl shadow-[0_14px_30px_rgba(0,0,0,0.12)] group contain-content">
                
                {/* 1. Image Area */}
                <div className="relative h-56 sm:h-64 md:h-60 lg:h-64">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill // In Next.js, this makes the image fill the container absolutely
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" // Tells browser which image size to download
                    quality={75} // Optimize image quality for faster loading
                    loading={index < 3 ? "eager" : "lazy"} // Eager load first 3 images, lazy load rest
                    decoding="async" // Non-blocking image decode
                    className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-105" // Zoom effect on hover
                  />
                  {/* Dark gradient overlay for readability */}
                  <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  {/* Hover gradient: Hidden (opacity-0) by default, appears on hover */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-all duration-500 will-change-[height,opacity] group-hover:h-[70%] group-hover:opacity-100" />
                </div>

                {/* 2. Text Area */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 p-4 sm:p-5 flex flex-col items-center text-center">
                  <h3 className={`${scienceGothic.className} relative inline-block text-lg sm:text-xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]`}>
                    
                    {/* Hover Swap Effect: 
                        We have two versions of the title. One fades out, one fades in. 
                        This creates a smooth transition effect.
                    */}
                    <span className="block transition-opacity duration-500 group-hover:opacity-0">
                      {service.title}
                    </span>
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
                      {service.title}
                    </span>
                  </h3>
                </div>

                {/* 3. Yellow Bottom Bar (Grows width from 0 to 100% on hover) */}
                <div className="absolute bottom-0 left-0 z-40 h-1 w-0 bg-yellow-400 transition-all duration-300 will-change-[width] group-hover:w-full" />
              </article>
            );

            // LOGIC: If the service has a link (ctaHref), wrap it in a <Link>. Otherwise, just use a <div>.
            return service.ctaHref ? (
              <Link key={service.title} href={service.ctaHref} data-animate="card" className="block h-full will-change-transform">
                {cardContent}
              </Link>
            ) : (
              <div key={service.title} data-animate="card" className="block h-full cursor-default will-change-transform">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}