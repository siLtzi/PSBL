"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import {
  PSBL_VIEWBOX,
  PSBL_BORDER_PATH,
  PSBL_LETTER_PATHS,
  PSBL_SUBTEXT_PATHS,
} from "./logoPaths";

gsap.registerPlugin(useGSAP);

export default function PsblLogo() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useGSAP(
    () => {
      if (!svgRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Border draw
      const border = svgRef.current.querySelector(
        "#psbl-border"
      ) as SVGPathElement;
      if (border && border.getTotalLength) {
        const len = border.getTotalLength();
        gsap.set(border, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(border, { strokeDashoffset: 0, duration: 0.9 });
      }

      // Letters
      const letters = svgRef.current.querySelectorAll(".logo-letter");
      tl.from(
        letters,
        {
          opacity: 0,
          y: 24,
          stagger: 0.08,
          duration: 0.5,
        },
        "-=0.4"
      );

      // Subtext
      const sub = svgRef.current.querySelector(".logo-sub");
      tl.from(
        sub,
        {
          opacity: 0,
          y: 12,
          duration: 0.45,
        },
        "-=0.2"
      );
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="flex items-center">
      <svg
        ref={svgRef}
        viewBox={PSBL_VIEWBOX}
        // FIX: Added max-w-[70vw] so the logo shrinks on tiny screens instead of pushing width
        className="block h-10 w-auto md:h-14 max-w-[70vw]"
        role="img"
        aria-labelledby="psbl-logo-title"
      >
        <title id="psbl-logo-title">Pohjois-Suomen Betonilattiat – logo</title>

        {/* Border */}
        <path
          id="psbl-border"
          d={PSBL_BORDER_PATH.d}
          fill="none"
          stroke="white"
          strokeWidth={PSBL_BORDER_PATH.strokeWidth}
          style={{ paintOrder: PSBL_BORDER_PATH.paintOrder }}
        />

        {/* Letters */}
        {PSBL_LETTER_PATHS.map((p) => (
          <g key={p.id} className="logo-letter" fill="white">
            <path d={p.d} />
          </g>
        ))}

        {/* Subtext */}
        <g className="logo-sub" fill="#e5e7eb">
          {PSBL_SUBTEXT_PATHS.map((p) => (
            <path key={p.id} d={p.d} />
          ))}
        </g>
      </svg>
    </div>
  );
}