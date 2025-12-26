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
      description: "Pääotsikko referenssisivun yläosassa (esim. REFERENSSIT).",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero-alateksti",
      type: "string",
      description: "Lyhyt teksti otsikon alla.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero-taustakuva (fallback)",
      type: "image",
      options: { hotspot: true },
      description: "Kuva, joka näytetään, jos videota ei ole asetettu.",
    }),
    defineField({
      name: "heroVideo",
      title: "Hero-video (MP4)",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
      description:
        "Video, joka pyörii taustalla. Suositeltu muoto MP4.",
    }),
  ],
});
