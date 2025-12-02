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
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -1000;
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
          fill="#3c3c3c"
          fillOpacity={1}
          stroke="none"
        />

        {/* NORTH OUTLINE SNAKE (animated) */}
        <path
          d={FI10_PATH}
          fill="none"
          stroke="rgb(215,155,0)"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="north-snake"
          pathLength={1000}
        />
      </g>
    </svg>
  );
}
