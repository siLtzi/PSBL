import { defineField, defineType } from "sanity";

export default defineType({
  name: "homeSettings",
  title: "Home settings",
  type: "document",
  fields: [
    defineField({ name: "logoText", title: "Logo text", type: "string" }),
    defineField({ name: "titleLine1", title: "Hero title line 1", type: "string" }),
    defineField({ name: "titleLine2", title: "Hero title line 2", type: "string" }),
    defineField({ name: "subtitle", title: "Hero subtitle", type: "string" }),
    defineField({ name: "primaryCtaLabel", title: "Primary CTA label", type: "string" }),
    defineField({ name: "primaryCtaHref", title: "Primary CTA href", type: "string" }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary CTA label", type: "string" }),
    defineField({ name: "secondaryCtaHref", title: "Secondary CTA href", type: "string" }),
    defineField({ name: "videoUrl", title: "Hero video URL or path", type: "string" })
  ]
});
