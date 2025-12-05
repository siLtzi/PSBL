import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutSettings",
  title: "Tietoa meistä",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string"
    }),
    defineField({
      name: "lead",
      title: "Lead paragraph",
      type: "text"
    }),
    defineField({
      name: "body",
      title: "Body paragraph",
      type: "text"
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string"
    }),
    defineField({
      name: "ctaHref",
      title: "CTA href",
      type: "string"
    }),
    defineField({
      name: "imageUrl",
      title: "Image URL",
      type: "string"
    })
  ]
});
