import { defineField, defineType } from "sanity";

export default defineType({
  name: "homeSettings",
  title: "Etusivu - Hero",
  type: "document",
  fields: [
    defineField({ name: "titleLine1", title: "Hero title line 1", type: "string" }),
    defineField({ name: "titleLine2", title: "Hero title line 2", type: "string" }),
    defineField({ name: "subtitle", title: "Hero subtitle", type: "string" }),
    defineField({ name: "primaryCtaLabel", title: "Primary CTA label", type: "string" }),
    defineField({ name: "primaryCtaHref", title: "Primary CTA href", type: "string" }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary CTA label", type: "string" }),
    defineField({ name: "secondaryCtaHref", title: "Secondary CTA href", type: "string" }),

    // ⬇️ NEW: file upload instead of plain string
    defineField({
      name: "heroVideo",
      title: "Hero video (MP4)",
      type: "file",
      options: {
        accept: "video/mp4,video/webm", // optional, restricts file picker
      },
    }),
  ],
});
