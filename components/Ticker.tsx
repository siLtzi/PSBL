import { barlowCondensed } from "@/app/fonts";

const defaultItems = [
  "Lattiavalut",
  "Mastertop",
  "Kuviobetoni",
  "Pinnoitukset",
  "Kovabetonointi",
  "Kiillotettu betoni",
  "Pohjois-Suomi",
  "Kiinteä hinta",
];

export default function Ticker({ items }: { items?: string[] }) {
  const resolved = items?.length ? items : defaultItems;
  // Duplicate for seamless loop
  const doubled = [...resolved, ...resolved];

  return (
    <div className="bg-[var(--steel)] py-3 overflow-hidden whitespace-nowrap border-b border-[rgba(240,192,0,0.08)]">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`
              ${barlowCondensed.className}
              font-extrabold text-[0.75rem] tracking-[4px] uppercase
              text-[var(--mid)] px-10
              inline-flex items-center gap-6
            `}
          >
            <span className="w-1.5 h-1.5 bg-[var(--yellow)] shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
