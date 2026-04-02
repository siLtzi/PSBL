"use client";

import { barlowCondensed, barlow } from "@/app/fonts";
import FinlandMap from "./FinlandMap";

export type AboutContent = {
  headline: string;
  lead: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
};

export default function About({ content }: { content: AboutContent }) {
  const { headline, lead, body, imageUrl } = content;

  const listItems = [
    "Kaikki valutyöt avaimet käteen",
    "Kuljetus & pumppaus sisältyy hintaan",
    "Kiinteä hinnoittelu — ei yllätyksiä",
    "Koko Pohjois-Suomen alue",
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
      {/* Left: Finland Map */}
      <div className="relative overflow-hidden group flex items-center justify-center bg-[var(--black)] min-h-[400px] p-10 md:p-16">
        <FinlandMap className="w-full max-w-[360px] h-auto" />

        {/* Corner brackets */}
        <div className="absolute top-8 left-8 w-[50px] h-[50px] border-t-[3px] border-l-[3px] border-[var(--yellow)] z-[2] transition-all duration-400 group-hover:w-[65px] group-hover:h-[65px]" />
        <div className="absolute bottom-8 right-8 w-[50px] h-[50px] border-b-[3px] border-r-[3px] border-[var(--yellow)] z-[2] transition-all duration-400 group-hover:w-[65px] group-hover:h-[65px]" />
      </div>

      {/* Right: Content */}
      <div className="p-10 md:p-16 lg:p-20 flex flex-col justify-center bg-[var(--panel)] border-l-0 lg:border-l-[3px] border-t-[3px] lg:border-t-0 border-[var(--steel)]">
        <div className={`${barlow.className} text-[0.65rem] font-semibold tracking-[3px] uppercase text-[var(--yellow)] mb-4 flex items-center gap-3`}>
          <span className="text-[var(--concrete-gray)]">{"//"}</span>
          Yritys
        </div>

        <h2 className={`${barlowCondensed.className} font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase tracking-[2px] leading-[0.95] text-[var(--off-white)]`}>
          {headline || "Ammattitaitoa joka kestää."}
        </h2>

        <div className={`${barlow.className} text-[1.05rem] leading-[1.8] text-[var(--light)] mt-8 max-w-[480px]`}>
          <strong className="text-[var(--off-white)] font-semibold">{lead}</strong>
          {" "}
          {body}
        </div>

        <div className="mt-8 flex flex-col gap-2.5">
          {listItems.map((item, i) => (
            <div
              key={i}
              className={`
                ${barlow.className}
                flex items-center gap-3
                text-[0.8rem] font-medium text-[var(--light)]
                transition-colors duration-200 hover:text-[var(--off-white)]
                group/item
              `}
            >
              <span className="w-[10px] h-[3px] bg-[var(--yellow)] shrink-0 transition-all duration-300 group-hover/item:w-[18px]" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}