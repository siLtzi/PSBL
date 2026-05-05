import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutSettings",
  title: "Tietoa meistä",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Otsikko",
      type: "string",
      description: "Pääotsikko 'Tietoa meistä' -osiolle.",
    }),
    defineField({
      name: "lead",
      title: "Ingressi",
      type: "text",
      description: "Johdantoteksti otsikon alla.",
    }),
    defineField({
      name: "body",
      title: "Leipäteksti",
      type: "text",
      description: "Varsinainen sisältöteksti.",
    }),
    defineField({
      name: "ctaLabel",
      title: "Napin teksti",
      type: "string",
      description: "Teksti painikkeelle (esim. Lue lisää).",
    }),
    defineField({
      name: "ctaHref",
      title: "Napin linkki",
      type: "string",
      description: "Mihin painike vie.",
    }),
    defineField({
      name: "imageUrl",
      title: "Kuvan URL",
      type: "string",
      description: "Linkki kuvaan, joka näytetään tekstin vieressä.",
    })
  ]
});
