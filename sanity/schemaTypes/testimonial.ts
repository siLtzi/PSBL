import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Asiakasarvostelu",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nimi",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Paikkakunta",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Yritys",
      type: "string",
    }),
    defineField({
      name: "projectType",
      title: "Työn tyyppi",
      type: "string",
      description: "Esim. Omakotitalon lattiavalu, Teollisuushallin pinnoitus",
    }),
    defineField({
      name: "quote",
      title: "Arvostelu",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Arvosana (1–5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5).integer(),
    }),
    defineField({
      name: "approved",
      title: "Hyväksytty näytettäväksi",
      type: "boolean",
      initialValue: false,
      description: "Vain hyväksytyt arvostelut näkyvät sivustolla.",
    }),
    defineField({
      name: "date",
      title: "Päivämäärä",
      type: "date",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "quote",
      approved: "approved",
    },
    prepare({ title, subtitle, approved }) {
      return {
        title: `${approved ? "✅" : "⏳"} ${title}`,
        subtitle: subtitle?.slice(0, 80),
      };
    },
  },
  orderings: [
    {
      title: "Uusimmat ensin",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
