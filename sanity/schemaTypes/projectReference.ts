import { defineField, defineType } from "sanity";

export default defineType({
  name: "projectReference",        // 👈 IMPORTANT: not "reference"
  title: "Referenssikohde",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Kohteen nimi",
      type: "string",
      description: "Esim. 'Teollisuushalli, Rovaniemi 2024'.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Osoite (slug)",
      type: "slug",
      description:
        "Käytetään mahdollisissa yksittäissivuissa, esim. 'teollisuushalli-rovaniemi-2024'.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tag",
      title: "Kohdetyyppi (tagi)",
      type: "string",
      description: "Esim. 'Teollisuuskohde', 'Omakotitalo', 'Liiketila'…",
    }),

    defineField({
      name: "location",
      title: "Sijainti",
      type: "string",
      description: "Esim. 'Rovaniemi', 'Oulu', 'Kempele'…",
    }),

    defineField({
      name: "year",
      title: "Valmistumisvuosi",
      type: "number",
      description: "Esim. 2024",
    }),

    defineField({
      name: "sizeM2",
      title: "Pinta-ala (m²)",
      type: "number",
      description: "Esim. 350",
    }),

    defineField({
      name: "mainImage",
      title: "Pääkuva",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "gallery",
      title: "Lisäkuvat (valinnainen)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),

    defineField({
      name: "excerpt",
      title: "Lyhyt kuvaus",
      type: "text",
      rows: 3,
      description: "Lyhyt yhteenveto, näkyy referenssiruudussa.",
    }),

    defineField({
      name: "body",
      title: "Laajempi kuvaus (valinnainen)",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Käytetään jos joskus teet yksittäisiä casestudy-sivuja kohteille.",
    }),

    defineField({
      name: "featured",
      title: "Nosta etusivulle",
      type: "boolean",
      description:
        "Jos päällä, voidaan näyttää etusivun referenssiosiossa tai stripissä.",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "mainImage",
    },
  },
});
