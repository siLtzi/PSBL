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
  ],
});
