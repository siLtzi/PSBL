import { defineType, defineField } from "sanity";

export default defineType({
  name: "servicesSettings",
  title: "Services section",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        defineField({
          name: "serviceItem",
          type: "object",
          title: "Service item",
          fields: [
            { name: "title", title: "Title", type: "string" },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            { name: "ctaLabel", title: "CTA label", type: "string" },
            { name: "ctaHref", title: "CTA href", type: "string" },
          ],
        }),
      ],
    }),
  ],
});
