"use client";

import { useEffect, useRef } from "react";
import { barlowCondensed, barlow } from "@/app/fonts";

export type StatItem = { value: number; suffix: string; label: string };

const defaultStats: StatItem[] = [
  { value: 500, suffix: "+", label: "Toteutettua urakkaa" },
  { value: 15, suffix: "+", label: "Vuotta kokemusta" },
  { value: 100, suffix: "%", label: "Laatutakuu" },
  { value: 100000, suffix: "+", label: "Valettua neliötä" },
];

function animateCounter(el: HTMLElement, target: number, suffix: string) {
  const duration = 1800;
  const start = performance.now();
  el.textContent = "0" + suffix;
  const update = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

export default function Stats({ items }: { items?: StatItem[] }) {
  const stats = items?.length ? items : defaultStats;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const target = parseInt(el.dataset.target || "0");
            const suffix = el.dataset.suffix || "";
            animateCounter(el, target, suffix);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRef.current.querySelectorAll("[data-target]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="grid grid-cols-2 lg:grid-cols-4 border-b-[3px] border-[var(--steel)]"
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`
            p-8 md:p-10 bg-[var(--panel)] text-center
            transition-colors duration-300 hover:bg-[var(--steel)]
            ${i < stats.length - 1 ? "border-r border-[var(--steel)]" : ""}
          `}
        >
          <div
            data-target={stat.value}
            data-suffix={stat.suffix}
            className={`
              ${barlowCondensed.className}
              font-black text-[clamp(2.2rem,7vw,3.5rem)] text-[var(--yellow)]
              leading-none uppercase
              [text-shadow:0_0_30px_rgba(240,192,0,0.15)]
            `}
          >
            {stat.value}{stat.suffix}
          </div>
          <div className={`
            ${barlow.className}
            text-[0.6rem] tracking-[2px] uppercase
            text-[var(--mid)] mt-2
          `}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
