import { defineArrayMember, defineField, defineType } from 'sanity';
import { BookOpen, FileText, Film, Images, Link, Music } from 'lucide-react';
import { videoEmbedUrl } from '../../lib/blog';

const imageFields = [
  defineField({ name: 'alt', title: 'Mitä kuvassa näkyy?', type: 'string', description: 'Lyhyt kuvaus ruudunlukijaa varten. Esim. Valmis betonilattia Oulun työmaalla.', validation: r => r.required() }),
  defineField({ name: 'caption', title: 'Kuvateksti', type: 'string' }),
];

export const blogBody = defineType({
  name: 'blogBody', title: 'Kirjoituksen sisältö', type: 'array',
  of: [
    defineArrayMember({ type: 'block', title: 'Teksti', styles: [
      { title: 'Tavallinen teksti', value: 'normal' }, { title: 'Väliotsikko', value: 'h2' },
      { title: 'Pieni väliotsikko', value: 'h3' }, { title: 'Lainaus', value: 'blockquote' },
    ], lists: [{ title: 'Luettelo', value: 'bullet' }, { title: 'Numeroitu lista', value: 'number' }],
    marks: { decorators: [{ title: 'Lihavointi', value: 'strong' }, { title: 'Kursivointi', value: 'em' }, { title: 'Alleviivaus', value: 'underline' }, { title: 'Yliviivaus', value: 'strike-through' }],
      annotations: [{ name: 'link', title: 'Linkki', type: 'object', fields: [
        defineField({ name: 'href', title: 'Linkin osoite', type: 'url', description: 'Verkko-osoite, /palvelut, mailto: tai tel: -linkki.', validation: r => r.required().uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }) }),
        defineField({ name: 'blank', title: 'Avaa uuteen välilehteen', type: 'boolean', initialValue: false }),
      ] }],
    } }),
    defineArrayMember({ type: 'image', title: 'Kuva', options: { hotspot: true }, fields: imageFields }),
    defineArrayMember({ name: 'blogGallery', title: 'Kuvagalleria', type: 'object', icon: Images, fields: [
      defineField({ name: 'images', title: 'Kuvat', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: imageFields }], validation: r => r.required().min(2) }),
      defineField({ name: 'caption', title: 'Gallerian kuvateksti', type: 'string' }),
    ], preview: { select: { subtitle: 'caption', media: 'images.0' }, prepare: v => ({ ...v, title: 'Kuvagalleria' }) } }),
    defineArrayMember({ type: 'videoObject', title: 'Lataa videotiedosto' }),
    defineArrayMember({ name: 'blogEmbed', title: 'YouTube- tai Vimeo-video', type: 'object', icon: Film, fields: [
      defineField({ name: 'url', title: 'Videon linkki', type: 'url', description: 'Kopioi videon jakolinkki YouTubesta tai Vimeosta. Upotuskoodia ei tarvita.', validation: r => r.required().custom(v => !v || videoEmbedUrl(v) ? true : 'Lisää toimiva YouTube- tai Vimeo-videon linkki.') }),
      defineField({ name: 'title', title: 'Videon nimi', type: 'string', validation: r => r.required() }),
      defineField({ name: 'caption', title: 'Kuvateksti', type: 'string' }),
    ], preview: { select: { title: 'title', subtitle: 'url' } } }),
    defineArrayMember({ name: 'blogAudio', title: 'Äänitiedosto', type: 'object', icon: Music, fields: [
      defineField({ name: 'title', title: 'Äänitteen nimi', type: 'string', validation: r => r.required() }),
      defineField({ name: 'file', title: 'Äänitiedosto', type: 'file', options: { accept: 'audio/*' }, validation: r => r.required() }),
      defineField({ name: 'transcript', title: 'Äänitteen tekstivastine', type: 'text', description: 'Kirjoita puhe myös tekstinä, jotta sisältö on kaikkien saatavilla.' }),
    ], preview: { select: { title: 'title' } } }),
    defineArrayMember({ name: 'blogAttachment', title: 'Ladattava liite', type: 'object', icon: FileText, fields: [
      defineField({ name: 'title', title: 'Linkin teksti', type: 'string', description: 'Esim. Lataa lattian hoito-ohje (PDF).', validation: r => r.required() }),
      defineField({ name: 'file', title: 'Tiedosto', type: 'file', validation: r => r.required() }),
    ], preview: { select: { title: 'title' } } }),
    defineArrayMember({ name: 'blogLinkCard', title: 'Linkki toiselle sivustolle', type: 'object', icon: Link, fields: [
      defineField({ name: 'title', title: 'Linkin otsikko', type: 'string', validation: r => r.required() }),
      defineField({ name: 'url', title: 'Verkko-osoite', type: 'url', validation: r => r.required().uri({ scheme: ['https', 'http'] }) }),
      defineField({ name: 'description', title: 'Lyhyt kuvaus', type: 'text', rows: 2 }),
    ], preview: { select: { title: 'title', subtitle: 'url' } } }),
    defineArrayMember({ name: 'blogArticleLink', title: 'Linkki omaan blogikirjoitukseen', type: 'object', icon: BookOpen, fields: [
      defineField({ name: 'post', title: 'Valitse kirjoitus', type: 'reference', to: [{ type: 'blogPost' }], validation: r => r.required() }),
    ], preview: { select: { title: 'post.title', media: 'post.mainImage' } } }),
  ],
});

export default defineType({
  name: 'blogPost', title: 'Blogikirjoitus', type: 'document', icon: BookOpen,
  groups: [{ name: 'content', title: '1. Kirjoita', default: true }, { name: 'details', title: '2. Julkaisutiedot' }, { name: 'seo', title: 'Hakukoneet (valinnainen)' }],
  initialValue: () => ({ publishedAt: new Date().toISOString(), author: 'PSBL', category: 'Kuulumiset' }),
  fields: [
    defineField({ name: 'title', title: 'Otsikko', type: 'string', group: 'content', description: 'Kirjoita kiinnostava otsikko. Sen voi vaihtaa myöhemmin.', validation: r => r.required().max(140) }),
    defineField({ name: 'slug', title: 'Kirjoituksen verkko-osoite', type: 'slug', group: 'content', description: 'Paina Generate otsikon kirjoittamisen jälkeen. Osoitteen avulla voit avata esikatselun. Älä muuta osoitetta julkaisun jälkeen.', options: { source: 'title', maxLength: 96 }, validation: r => r.required().custom(v => !v?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v.current) ? true : 'Käytä pieniä kirjaimia a–z, numeroita ja väliviivoja.') }),
    defineField({ name: 'excerpt', title: 'Lyhyt aloitusteksti', type: 'text', rows: 3, group: 'content', description: 'Yksi tai kaksi lausetta. Näkyy blogin etusivulla ja kirjoituksen alussa.', validation: r => r.required().max(320) }),
    defineField({ name: 'mainImage', title: 'Kansikuva', type: 'image', group: 'content', options: { hotspot: true }, fields: imageFields, description: 'Valitse kuva koneelta tai vedä se tähän. Rajauksen kohdistuspisteellä voit valita tärkeimmän kohdan.' }),
    defineField({ name: 'body', title: 'Kirjoitus', type: 'blogBody', group: 'content', description: 'Kirjoita tähän. Lisää-valikosta löydät kuvat, galleriat, videot, äänen, liitteet ja linkkikortit. Muutokset tallentuvat automaattisesti luonnokseen; ne näkyvät lukijoille vasta Publish-painikkeella.', validation: r => r.required().min(1) }),
    defineField({ name: 'author', title: 'Kirjoittajan nimi', type: 'string', group: 'details', validation: r => r.required() }),
    defineField({ name: 'category', title: 'Aihe', type: 'string', group: 'details', options: { list: ['Kuulumiset', 'Työmaalta', 'Vinkit ja oppaat', 'Betonilattiat', 'Ihmiset'] } }),
    defineField({ name: 'publishedAt', title: 'Kirjoituksen päivämäärä', type: 'datetime', group: 'details', description: 'Näytetään lukijalle ja käytetään järjestykseen. Tämä ei ajasta julkaisua: Publish julkaisee heti.', validation: r => r.required() }),
    defineField({ name: 'seoTitle', title: 'Hakukoneotsikko', type: 'string', group: 'seo', description: 'Voit jättää tyhjäksi. Käytämme silloin kirjoituksen otsikkoa.', validation: r => r.max(70).warning() }),
    defineField({ name: 'seoDescription', title: 'Hakukonekuvaus', type: 'text', rows: 2, group: 'seo', description: 'Voit jättää tyhjäksi. Käytämme silloin aloitustekstiä.', validation: r => r.max(160).warning() }),
  ],
  orderings: [{ title: 'Uusimmat ensin', name: 'newest', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', author: 'author', category: 'category', media: 'mainImage' }, prepare: ({ title, author, category, media }) => ({ title: title || 'Uusi kirjoitus', subtitle: [category, author].filter(Boolean).join(' · '), media }) },
});
