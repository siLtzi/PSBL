// sanity/schemas/contactSettings.ts
import { defineField, defineType } from "sanity";

export const contactSettings = defineType({
  name: "contactSettings",
  title: "Yhteystiedot-sivu",
  type: "document",
  fields: [
    // ---------------- HERO ----------------
    defineField({
      name: "heroMediaType",
      title: "Hero-taustan tyyppi",
      type: "string",
      options: {
        list: [
          { title: "Kuva", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      validation: (Rule) => Rule.required(),
      description: "Valitse käytetäänkö hero-taustana kuvaa vai videota.",
    }),

    defineField({
      name: "heroImage",
      title: "Hero-taustakuva",
      type: "image",
      options: { hotspot: true },
      description: "Leveä kuva yhteystiedot-sivun hero-alueelle.",
      hidden: ({ parent }) => parent?.heroMediaType !== "image",
    }),

    defineField({
      name: "heroVideo",
      title: "Hero-taustavideo",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
      description: "Lataa MP4 / WebM -video hero-taustaksi.",
      hidden: ({ parent }) => parent?.heroMediaType !== "video",
    }),

    defineField({
      name: "heroTitle",
      title: "Hero-otsikko",
      type: "string",
      description: 'Esim. "YHTEYSTIEDOT".',
    }),

    defineField({
      name: "heroSubtitle",
      title: "Hero-alaotsikko",
      type: "string",
      description: 'Lyhyt teksti otsikon alle. Esim. "Ota yhteyttä jo tänään…" ',
    }),

    // ---------------- VASEN PALSTA: johdanto ----------------
    defineField({
      name: "introTitle",
      title: "Johdannon otsikko",
      type: "string",
      description:
        'Esim. "PALVELEMME KOKO POHJOIS-SUOMEN ALUEELLA".',
    }),

    defineField({
      name: "introBody",
      title: "Johdannon teksti",
      type: "text",
      rows: 4,
      description:
        "Lyhyt kuvaus yhteydenotosta ja palvelualueesta. Näkyy otsikon alla.",
    }),

    // ---------------- YRITYSTIEDOT ----------------
    defineField({
      name: "company",
      title: "Yritystiedot",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Yrityksen nimi",
          type: "string",
        }),
        defineField({
          name: "businessId",
          title: "Y-tunnus",
          type: "string",
        }),
        defineField({
          name: "location",
          title: "Paikkakunta / alue",
          type: "string",
          description: 'Esim. "Rovaniemi / Pohjois-Suomi".',
        }),
        defineField({
          name: "email",
          title: "Sähköpostiosoite",
          type: "string",
        }),
        defineField({
          name: "phone",
          title: "Puhelinnumero",
          type: "string",
        }),
      ],
    }),

    // ---------------- LASKUTUSTIEDOT ----------------
    defineField({
      name: "billing",
      title: "Laskutustiedot",
      type: "object",
      fields: [
        defineField({
          name: "eInvoiceAddress",
          title: "Verkkolaskuosoite",
          type: "string",
        }),
        defineField({
          name: "operatorName",
          title: "Välittäjä / operaattori",
          type: "string",
        }),
        defineField({
          name: "operatorCode",
          title: "Operaattoritunnus",
          type: "string",
          description: "Esim. 003721291126.",
        }),
      ],
    }),

    // ---------------- OIKEAN PALSTAN LOMAKE-OTSIKKO ----------------
    defineField({
      name: "formTitle",
      title: "Lomakkeen otsikko",
      type: "string",
      description: 'Esim. "LÄHETÄ VIESTI".',
    }),

    defineField({
      name: "formIntro",
      title: "Lomakkeen esittelyteksti",
      type: "text",
      rows: 3,
      description:
        'Esim. "Täytäthän kaikki kentät, niin osaamme vastata sinulle mahdollisimman hyvin."',
    }),
  ],
});
