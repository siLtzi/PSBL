"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { X } from "lucide-react";
import { barlowCondensed } from "@/app/fonts";
import type { LatLng } from "./ContactForm";
import { psblPinSvg } from "./pin";

type Props = {
  initialCoords: LatLng | null;
  onCancel: () => void;
  onConfirm: (coords: LatLng) => void;
};

// ---- TS escape hatch for react-leaflet props ----
const AnyMapContainer = MapContainer as any;
const AnyTileLayer = TileLayer as any;
const AnyMarker = Marker as any;

// Simple marker icon so it shows up correctly
const markerIcon = new L.Icon({
  iconUrl: "data:image/svg+xml;base64," + btoa(psblPinSvg),
  iconRetinaUrl: "data:image/svg+xml;base64," + btoa(psblPinSvg),
  iconSize: [24, 36],
  iconAnchor: [12, 36],
});

// Catch map clicks and call onSelect
function ClickableMarker({ onSelect }: { onSelect: (coords: LatLng) => void }) {
  useMapEvents({
    click(e: any) {
      onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function LocationMapModal({
  initialCoords,
  onCancel,
  onConfirm,
}: Props) {
  const [tempCoords, setTempCoords] = useState<LatLng | null>(initialCoords);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-2xl bg-[var(--panel)] border border-[var(--steel)] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--steel)]">
          <h3
            className={`${barlowCondensed.className} text-lg font-black tracking-tight uppercase text-[var(--off-white)]`}
          >
            Valitse työmaan sijainti kartalta
          </h3>
          <button
            type="button"
            onClick={onCancel}
            className="button-snappy p-1 hover:bg-[var(--steel)] text-[var(--mid)] hover:text-[var(--off-white)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="h-80">
          <AnyMapContainer
            center={
              tempCoords ? [tempCoords.lat, tempCoords.lng] : [64.5, 26.0]
            }
            zoom={tempCoords ? 13 : 5}
            className="h-full w-full"
          >
            <AnyTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap -tekijät"
            />

            {tempCoords && (
              <AnyMarker
                position={[tempCoords.lat, tempCoords.lng]}
                icon={markerIcon}
              />
            )}

            <ClickableMarker onSelect={setTempCoords} />
          </AnyMapContainer>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--steel)] bg-[var(--dark)]">
          <p className="text-[11px] text-[var(--mid)]">
            Klikkaa karttaa valitaksesi sijainnin. Vahvista, kun paikka näyttää
            oikealta.
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="button-snappy text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mid)] hover:text-[var(--off-white)]"
            >
              Peruuta
            </button>
            <button
              type="button"
              disabled={!tempCoords}
              onClick={() => tempCoords && onConfirm(tempCoords)}
              className={`
                ${barlowCondensed.className}
                button-snappy
                text-xs font-bold uppercase tracking-[2px]
                px-5 py-2
                ${
                  tempCoords
                    ? "bg-[var(--yellow)] text-[var(--black)] hover:brightness-110"
                    : "bg-[var(--steel)] text-[var(--mid)] cursor-not-allowed"
                }
              `}
            >
              Hyväksy sijainti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
