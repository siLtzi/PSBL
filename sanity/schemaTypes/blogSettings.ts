import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'blogSettings', title: 'Blogin etusivu', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Otsikko', type: 'string', initialValue: 'Pinnan alta.', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Esittelyteksti', type: 'text', rows: 3, initialValue: 'Tarinoita työmailta, ajatuksia betonista ja kuulumisia pohjoisesta. Tätä on arki kestävien lattioiden takana.' }),
  ],
  preview: { prepare: () => ({ title: 'Blogin etusivu' }) },
});
