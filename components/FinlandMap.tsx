"use client";

import { FI01_PATH, FI10_PATH } from "./finlandPaths";

type FinlandMapProps = {
  className?: string;
};

export default function FinlandMap({ className }: FinlandMapProps) {
  return (
    <svg
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <style>{`
  /* SNAKE SEGMENT AROUND NORTH */
  .north-snake {
    stroke-dasharray: 5,5;
    stroke-dashoffset: 0;
    animation: north-snake-loop 100s linear infinite;
  }

  @keyframes north-snake-loop {
    from { stroke-dashoffset: 0; }
    to   { stroke-dashoffset: -1000; }
  }

  /* ---------------------------------- */
  /* BLIP / PULSE MARKER (centered)     */
  /* ---------------------------------- */

  .blip-ring,
  .blip-dot {
    /* Important for SVG so scaling is around the circle center */
    transform-box: fill-box;
    transform-origin: 50% 50%;
  }

  .blip-ring {
    animation: blip-pulse 1.6s ease-out infinite;
  }

  .blip-dot {
    animation: blip-breathe 1.6s ease-in-out infinite;
  }

  /* Outer ring: grows & fades */
  @keyframes blip-pulse {
    0% {
      opacity: 0.9;
      transform: scale(0.6);
    }
    70% {
      opacity: 0;
      transform: scale(1.8);
    }
    100% {
      opacity: 0;
      transform: scale(1.8);
    }
  }

  /* Inner dot: gentle breathing instead of jumping */
  @keyframes blip-breathe {
    0%, 100% {
      transform: scale(1);
    }
    40% {
      transform: scale(1.12);
    }
  }
`}</style>

      <g id="features">
        {/* SOUTH / REST OF FINLAND */}
        <path
          d={FI01_PATH}
          fill="#323232"
          fillOpacity={1}
          stroke="#000000"
          strokeWidth={0}
          strokeDasharray="none"
          strokeOpacity={1}
        />

        {/* NORTH FILL (static) */}
        <path
          d={FI10_PATH}
          fill="rgba(213, 213, 0, 0.74)"
          fillOpacity={1}
          stroke="none"
        />

        {/* NORTH OUTLINE SNAKE (animated) */}
        <path
          d={FI10_PATH}
          fill="none"
          stroke="#ff6464ff"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="north-snake"
          pathLength={1000}
        />
      </g>

      {/* ---------------------------------- */}
      {/* BLIP MARKER – adjust translate(x,y) */}
      {/* ---------------------------------- */}
      <g transform="translate(520 410)">
        {/* Outer pulsing ring */}
        <circle
          className="blip-ring"
          r={32}
          fill="none"
          stroke="#ff0000"
          strokeWidth={8}
        />

        {/* Solid red dot with small inner circle */}
        <circle className="blip-dot" r={18} fill="#ff0000" />
        <circle r={7} fill="none" stroke="#ffd500" strokeWidth={4} />
      </g>
    </svg>
  );
}
