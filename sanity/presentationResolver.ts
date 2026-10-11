import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: [
    { route: '/blogi/:slug', filter: '_type == "blogPost" && slug.current == $slug' },
    { route: '/blogi', filter: '_type == "blogSettings" && _id == "blogSettings"' },
  ],
  locations: {
    blogPost: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: doc => doc?.slug ? {
        locations: [
          { title: doc.title || 'Kirjoitus', href: `/blogi/${doc.slug}/` },
          { title: 'Blogin etusivu', href: '/blogi/' },
        ],
      } : { message: 'Kirjoita otsikko ja luo verkko-osoite Generate-painikkeella, niin voit esikatsella kirjoitusta.', tone: 'caution' },
    }),
    blogSettings: defineLocations({ locations: [{ title: 'Blogin etusivu', href: '/blogi/' }] }),
  },
};
