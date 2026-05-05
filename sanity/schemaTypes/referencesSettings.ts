import { defineField, defineType } from "sanity";

export default defineType({
  name: "referencesSettings",
  title: "Etusivu – Referenssit",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Otsikko",
      type: "string",
      description: "Esim. 'Viimeisimmät referenssit'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Ingressi / kuvausteksti",
      type: "text",
      rows: 3,
      description: "Lyhyt kuvaus referensseistä (valinnainen).",
    }),
    defineField({
      name: "items",
      title: "Referenssit",
      type: "array",
      description:
        "Työkohteiden kuvia. Jos lista on tyhjä, osio piilotetaan automaattisesti.",
      of: [
        defineField({
          name: "referenceItem",
          title: "Referenssi",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Kuva",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Kuvateksti",
              type: "string",
              description: "Esim. 'Teollisuushalli, Rovaniemi 2024'.",
            }),
            defineField({
              name: "tag",
              title: "Tyyppi / lyhyt kuvaus",
              type: "string",
              description: "Esim. 'Teollisuuskohde', 'Omakotitalo' jne.",
            }),
            defineField({
              name: "location",
              title: "Sijainti (valinnainen)",
              type: "string",
              description: "Esim. 'Oulu', 'Rovaniemi'.",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
  },
});
