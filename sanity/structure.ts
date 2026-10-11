import type { StructureResolver } from "sanity/desk";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Sisältö")
    .items([
      S.documentTypeListItem('blogPost').title('Blogikirjoitukset'),
      S.listItem().title('Blogin etusivu').child(
        S.document().schemaType('blogSettings').documentId('blogSettings').title('Blogin etusivu')
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(item => !['blogPost', 'blogSettings'].includes(item.getId() || '')),
    ]);
