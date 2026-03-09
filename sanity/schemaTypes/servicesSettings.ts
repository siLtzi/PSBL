import { defineField, defineType } from "sanity";

export default defineType({
  name: "servicesSettings",
  title: "Palvelut",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Otsikko",
      type: "string",
      description: "Otsikko, joka näytetään palveluiden ruudukon yläpuolella (esim. PALVELUT)",
    }),

    defineField({
      name: "heroTitle",
      title: "Hero otsikko",
      type: "string",
      description: "Pääotsikko /palvelut hero-osiossa (esim. Palvelut)",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero alaotsikko",
      type: "string",
      description: "Lyhyt teksti hero-otsikon alla",
    }),

    // The actual services grid items
    defineField({
      name: "services",
      title: "Palvelut",
      type: "array",
      of: [
        defineField({
          name: "service",
          title: "Palvelu",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Otsikko",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Kuva",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "ctaHref",
              title: "Linkki (href)",
              type: "string",
              description:
                "Mihin kortti linkittää, esim. /palvelut/betonilattiatyot-lattiavalut",
            }),
          ],
        }),
      ],
    }),
  ],
});
