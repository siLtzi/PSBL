import { defineField, defineType } from "sanity";

export default defineType({
  name: "homeSettings",
  title: "Etusivu",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "stats", title: "Tilastot" },
    { name: "ticker", title: "Ticker-nauha" },
  ],
  fields: [
    // ── HERO ──
    defineField({
      name: "titleLine1",
      title: "Pieni otsikko rivi 1",
      type: "string",
      description: "Yläreunan pieni teksti, rivi 1 (esim. POHJOIS-SUOMEN).",
      group: "hero",
    }),
    defineField({
      name: "titleLine2",
      title: "Pieni otsikko rivi 2",
      type: "string",
      description: "Yläreunan pieni teksti, rivi 2 (esim. BETONILATTIAT).",
      group: "hero",
    }),
    defineField({
      name: "heroHeadingLine1",
      title: "Iso otsikko – rivi 1",
      type: "string",
      description: "Ensimmäinen rivi isosta otsikosta (esim. Lapin).",
      group: "hero",
    }),
    defineField({
      name: "heroHeadingLine2",
      title: "Iso otsikko – rivi 2 (korostettu)",
      type: "string",
      description: "Toinen rivi, korostetaan keltaisella (esim. parhaat).",
      group: "hero",
    }),
    defineField({
      name: "heroHeadingLine3",
      title: "Iso otsikko – rivi 3",
      type: "string",
      description: "Kolmas rivi isosta otsikosta (esim. lattiat.).",
      group: "hero",
    }),
    defineField({
      name: "subtitle",
      title: "Alaotsikko",
      type: "string",
      description: "Pienempi teksti otsikon alla.",
      group: "hero",
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Ensisijaisen napin teksti",
      type: "string",
      description: "Teksti pääpainikkeelle (esim. Ota yhteyttä).",
      group: "hero",
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Ensisijaisen napin linkki",
      type: "string",
      description: "Mihin pääpainike vie (esim. /yhteystiedot).",
      group: "hero",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Toissijaisen napin teksti",
      type: "string",
      description: "Teksti toiselle painikkeelle (esim. Palvelut).",
      group: "hero",
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "Toissijaisen napin linkki",
      type: "string",
      description: "Mihin toinen painike vie (esim. /palvelut).",
      group: "hero",
    }),
    defineField({
      name: "heroMessage",
      title: "Hero-viesti",
      type: "string",
      description: "Valinnainen viesti otsikon yläpuolella (esim. 'Emme ota uusia töitä tällä hetkellä'). Jätä tyhjäksi piilottaaksesi.",
      group: "hero",
    }),
    defineField({
      name: "heroVideo",
      title: "Taustavideo (MP4)",
      type: "file",
      description: "Video, joka pyörii taustalla. Suositeltu muoto MP4.",
      options: {
        accept: "video/mp4,video/webm",
      },
      group: "hero",
    }),

    // ── STATS ──
    defineField({
      name: "stats",
      title: "Tilastot",
      type: "array",
      group: "stats",
      description: "Numeraaliset tilastot hero-osion alla (esim. 500+ toteutettua urakkaa).",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Numero",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "suffix",
              title: "Pääte",
              type: "string",
              description: "Esim. +, %, m²",
            }),
            defineField({
              name: "label",
              title: "Kuvaus",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              value: "value",
              suffix: "suffix",
              label: "label",
            },
            prepare({ value, suffix, label }) {
              return {
                title: `${value}${suffix || ""} – ${label}`,
              };
            },
          },
        },
      ],
    }),

    // ── TICKER ──
    defineField({
      name: "tickerItems",
      title: "Ticker-nauha",
      type: "array",
      group: "ticker",
      description: "Sanat jotka pyörivät nauhalla (esim. Lattiavalut, Mastertop, Pohjois-Suomi).",
      of: [{ type: "string" }],
    }),
  ],
});
