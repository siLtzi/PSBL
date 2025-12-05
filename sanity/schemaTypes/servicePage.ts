import { defineField, defineType } from "sanity";

export default defineType({
  name: "servicePage",
  title: "Palvelusivu",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Palvelun nimi",
      type: "string",
      description: "Näkyy sivun yläosassa ja selaimen välilehdessä.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Osoite (slug)",
      type: "slug",
      description:
        "Käytetään URL-osoitteessa, esim. betonilattiatyot-lattiavalut.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // HERO
    defineField({
      name: "heroSubtitle",
      title: "Hero-teksti (alaotsikko)",
      type: "string",
      description: "Lyhyt kuvaus hero-kuvan alle.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero-taustakuva",
      type: "image",
      description: "Leveä kuva sivun yläosaan.",
      options: { hotspot: true },
    }),

    // PÄÄTEKSTI + KUVA
    defineField({
      name: "contentTitle",
      title: "Pääotsikko (sisältöosio)",
      type: "string",
      description:
        "Esim. 'Betonilattiat pieniin ja suuriin kohteisiin laatutakuulla'.",
    }),
    defineField({
      name: "contentBody",
      title: "Pääteksti",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Kuvaile palvelua yksityiskohtaisemmin. Näkyy vasemmalla tekstinä.",
    }),
    defineField({
      name: "sideImage",
      title: "Sivukuva päätekstiin",
      type: "image",
      description:
        "Kuva päätekstin oikealle puolelle (valinnainen). Esim. työmaakuva.",
      options: { hotspot: true },
    }),

    // SUOSITUS / TEKNISET TIEDOT
    defineField({
      name: "specsTitle",
      title: "Suositusosion otsikko",
      type: "string",
      description: "Esim. 'Suosittelemamme betonilaatuja'.",
    }),
    defineField({
      name: "specsBody",
      title: "Suositusosio (tekstit)",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Esim. käytetyt betonilaadut, kuivumisajat jne. Näkyy erillisenä laatikkona.",
    }),

    // KELTAINEN SEO-LAATTA
    defineField({
      name: "coverageTitle",
      title: "Alue-osion otsikko",
      type: "string",
      description: "Esim. 'Palvelemme koko Pohjois-Suomen alueella'.",
    }),
    defineField({
      name: "coverageBody",
      title: "Alue-osion teksti",
      type: "text",
      rows: 4,
      description:
        "Lista paikkakunnista tms. Näkyy keltaisessa laatassa sivun alaosassa.",
    }),

    // REFERENSSIT (VALINNAINEN)
    defineField({
      name: "references",
      title: "Referenssikuvat (valinnainen)",
      type: "array",
      description:
        "Työkohteiden kuvia. Jos kuvia ei ole, koko osio piilotetaan automaattisesti.",
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
              title: "Lyhyt kuvaus / tyyppi",
              type: "string",
              description: "Esim. 'Teollisuuskohde', 'Omakotitalo' jne.",
            }),
          ],
        }),
      ],
    }),

    // SEO
    defineField({
      name: "seoTitle",
      title: "SEO-otsikko",
      type: "string",
      description:
        "Valinnainen. Jos tyhjä, käytetään 'Palvelun nimi' -kenttää.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO-kuvaus",
      type: "text",
      rows: 3,
      description:
        "Lyhyt kuvaus hakukoneita varten (näkyy Googlen hakutuloksissa).",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
      media: "heroImage",
    },
  },
});
