import { defineField, defineType } from "sanity";

export default defineType({
  name: "referencesPageSettings",          // 👈 must match query _type
  title: "Referenssit – sivuasetukset",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero-otsikko",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero-alateksti",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero-taustakuva (fallback)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroVideo",
      title: "Hero-video (MP4)",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
      description:
        "Lataa suoraan MP4-video. Tätä käytetään taustalla, jos asetettu.",
    }),
  ],
});
