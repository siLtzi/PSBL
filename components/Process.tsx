"use client";

import { useEffect, useRef, useState } from "react";
import { barlowCondensed, barlow } from "@/app/fonts";

const steps = [
  { num: "01", name: "Yhteydenotto", desc: "Kerro meille urakastasi puhelimitse tai lomakkeella. Palaamme asiaan arkipäivän kuluessa." },
  { num: "02", name: "Kartoitus ja tarjous", desc: "Käymme läpi kohteen tiedot ja toimitamme kiinteähintaisen tarjouksen." },
  { num: "03", name: "Toteutus", desc: "Hoidamme lattiatyön sovitussa aikataulussa valmiiksi asti." },
  { num: "04", name: "Luovutus", desc: "Tarkastamme työn laadun ja luovutamme lattian takuulla." },
];

export default function Process() {
  const [activeCount, setActiveCount] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    if (!mq.matches) return;

    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Highlight all steps up to and including this one
            setActiveCount((prev) => Math.max(prev, i + 1));
          }
        },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="py-20 px-6 md:px-12 border-t-[3px] border-[var(--steel)]" id="prosessi">
      <div className="mb-16">
        <div className={`${barlow.className} text-[0.65rem] font-semibold tracking-[3px] uppercase text-[var(--yellow)] mb-4 flex items-center gap-3`}>
          <span className="text-[var(--concrete-gray)]">{"//"}</span>
          Prosessi
        </div>
        <h2 className={`${barlowCondensed.className} font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase tracking-[2px] leading-[0.95] text-[var(--off-white)]`}>
          Näin urakka<br />etenee.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[3px]">
        {steps.map((step, i) => {
          const isActive = i < activeCount;
          return (
            <div
              key={step.num}
              ref={(el) => { stepRefs.current[i] = el; }}
              className={`
                p-8 md:p-10
                border-t-[3px] border-[var(--yellow)]
                border-l-[3px]
                transition-all duration-400
                relative
                ${isActive
                  ? "bg-[var(--steel)] border-l-[var(--yellow)]"
                  : "bg-[var(--panel)] border-l-transparent hover:bg-[var(--steel)] hover:border-l-[var(--yellow)]"
                }
              `}
            >
              <div className={`
                ${barlowCondensed.className} font-black text-[3.5rem] leading-none mb-4
                transition-colors duration-400
                ${isActive ? "text-[rgba(240,192,0,0.45)]" : "text-[rgba(240,192,0,0.15)]"}
              `}>
                {step.num}
              </div>
              <div className={`${barlowCondensed.className} font-extrabold text-[1.3rem] uppercase tracking-[1.5px] text-[var(--off-white)] mb-3`}>
                {step.name}
              </div>
              <div className="text-[0.85rem] text-[var(--mid)] leading-[1.7]">
                {step.desc}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
