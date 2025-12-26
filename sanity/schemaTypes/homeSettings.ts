import { defineField, defineType } from "sanity";

export default defineType({
  name: "homeSettings",
  title: "Etusivu - Hero",
  type: "document",
  fields: [
    defineField({
      name: "titleLine1",
      title: "Otsikko rivi 1",
      type: "string",
      description: "Ensimmäinen rivi isolle otsikolle (esim. POHJOIS-SUOMEN).",
    }),
    defineField({
      name: "titleLine2",
      title: "Otsikko rivi 2",
      type: "string",
      description: "Toinen rivi isolle otsikolle (esim. BETONILATTIAT).",
    }),
    defineField({
      name: "subtitle",
      title: "Alaotsikko",
      type: "string",
      description: "Pienempi teksti otsikon alla.",
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Ensisijaisen napin teksti",
      type: "string",
      description: "Teksti pääpainikkeelle (esim. Ota yhteyttä).",
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Ensisijaisen napin linkki",
      type: "string",
      description: "Mihin pääpainike vie (esim. /yhteystiedot).",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Toissijaisen napin teksti",
      type: "string",
      description: "Teksti toiselle painikkeelle (esim. Palvelut).",
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "Toissijaisen napin linkki",
      type: "string",
      description: "Mihin toinen painike vie (esim. /palvelut).",
    }),

    defineField({
      name: "heroMessage",
      title: "Hero-viesti",
      type: "string",
      description: "Valinnainen viesti, joka näkyy otsikon yläpuolella (esim. 'Emme ota uusia töitä tällä hetkellä'). Jätä tyhjäksi piilottaaksesi.",
    }),

    // ⬇️ NEW: file upload instead of plain string
    defineField({
      name: "heroVideo",
      title: "Taustavideo (MP4)",
      type: "file",
      description: "Video, joka pyörii taustalla. Suositeltu muoto MP4.",
      options: {
        accept: "video/mp4,video/webm", // optional, restricts file picker
      },
    }),
  ],
});
