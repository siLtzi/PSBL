import { defineField, defineType } from "sanity";

export default defineType({
  name: "videoObject",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "file",
      title: "Videotiedosto",
      type: "file",
      description: "Lataa video (MP4 tai WebM).",
      options: {
        accept: "video/mp4,video/webm",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Kuvateksti",
      type: "string",
      description: "Valinnainen teksti videon alle.",
    }),
  ],
  preview: {
    select: {
      caption: "caption",
    },
    prepare({ caption }) {
      return {
        title: caption || "Video",
        subtitle: "🎬 Video",
      };
    },
  },
});
