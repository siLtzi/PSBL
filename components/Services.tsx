"use client";

import Image from "next/image";
import Link from "next/link";
import { barlowCondensed, barlow } from "@/app/fonts";

export type ServiceItem = {
  title: string;
  imageUrl: string;
  ctaHref: string | null;
  hotspot?: { x: number; y: number } | null;
};

export type ServicesContent = {
  heading: string;
  services: ServiceItem[];
};

export default function Services({
  content,
  hideHeading = false,
}: {
  content: ServicesContent;
  hideHeading?: boolean;
}) {
  const { heading, services } = content;

  const padded = (idx: number) => String(idx + 1).padStart(2, "0");

  return (
    <section
      className="py-20 px-6 md:px-12 border-t-[3px] border-[var(--steel)]"
      id="palvelut"
    >
      {!hideHeading && (
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className={`${barlow.className} text-[0.65rem] font-semibold tracking-[3px] uppercase text-[var(--yellow)] mb-4 flex items-center gap-3`}>
              <span className="text-[var(--concrete-gray)]">{"//"}</span>
              Palvelut
            </div>
            <h2 className={`${barlowCondensed.className} font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase tracking-[2px] leading-[0.95] text-[var(--off-white)]`}>
              {heading || "Mitä me tehdään."}
            </h2>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[3px]">
        {services.map((service, index) => {
          const inner = (
            <div className="relative overflow-hidden aspect-square bg-[var(--black)] cursor-pointer group">
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                quality={75}
                loading={index < 3 ? "eager" : "lazy"}
                className="object-cover grayscale-30 brightness-[0.68] contrast-[1.05] transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-[0.78] group-hover:scale-106"
                style={service.hotspot ? { objectPosition: `${service.hotspot.x * 100}% ${service.hotspot.y * 100}%` } : undefined}
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/72 via-black/26 to-black/8 transition-colors duration-300 group-hover:from-black/58 group-hover:via-black/18 group-hover:to-black/0" />

              {/* Hover border */}
              <div className="absolute inset-0 border-0 border-[var(--yellow)] transition-all duration-300 pointer-events-none z-[3] group-hover:border-2" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 z-[2]">
                <div className={`${barlowCondensed.className} font-black text-[4.5rem] text-[rgba(240,192,0,0.12)] leading-none self-end transition-colors duration-400 group-hover:text-[rgba(240,192,0,0.25)]`}>
                  {padded(index)}
                </div>
                <div>
                  <div className={`${barlow.className} text-[0.55rem] tracking-[2px] uppercase text-[var(--yellow)] mb-1.5`}>
                    Palvelu
                  </div>
                  <div className={`${barlowCondensed.className} font-extrabold text-[1.5rem] uppercase tracking-[1.5px] text-[var(--off-white)] leading-[1.1]`}>
                    {service.title}
                  </div>
                </div>
              </div>

              {/* Yellow bottom stripe */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--yellow)] z-[4] scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
            </div>
          );

          return service.ctaHref ? (
            <Link key={service.title} href={service.ctaHref} className="block">
              {inner}
            </Link>
          ) : (
            <div key={service.title}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}