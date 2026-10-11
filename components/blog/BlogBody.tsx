import Link from 'next/link';
import { PortableText, stegaClean, type PortableTextComponents } from 'next-sanity';
import { ArrowUpRight, Download } from 'lucide-react';
import { safeLink } from '@/lib/blog';
import BlogImage from './BlogImage';
import VideoEmbed from './VideoEmbed';
import type { BlogImageValue, BlogPost } from './types';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => <figure><BlogImage value={value} />{value.caption && <figcaption>{value.caption}</figcaption>}</figure>,
    blogGallery: ({ value }) => <figure><div className="blog-gallery">{value.images?.map((image: BlogImageValue) => <figure key={image._key}><BlogImage value={image} />{image.caption && <figcaption>{image.caption}</figcaption>}</figure>)}</div>{value.caption && <figcaption>{value.caption}</figcaption>}</figure>,
    videoObject: ({ value }) => {
      const src = safeLink(stegaClean(value.fileUrl));
      return src ? <figure><video src={src} controls playsInline preload="metadata" aria-label={stegaClean(value.caption || 'Video')} />{value.caption && <figcaption>{value.caption}</figcaption>}</figure> : null;
    },
    blogEmbed: ({ value }) => <figure><VideoEmbed url={stegaClean(value.url)} title={stegaClean(value.title || 'Video')} />{value.caption && <figcaption>{value.caption}</figcaption>}</figure>,
    blogAudio: ({ value }) => {
      const src = safeLink(stegaClean(value.fileUrl));
      return src ? <figure className="blog-audio"><strong>{value.title}</strong><audio src={src} controls preload="metadata" aria-label={stegaClean(value.title || 'Äänite')} />{value.transcript && <details><summary>Lue tekstivastine</summary><p style={{ whiteSpace: 'pre-wrap' }}>{value.transcript}</p></details>}</figure> : null;
    },
    blogAttachment: ({ value }) => {
      const href = safeLink(stegaClean(value.fileUrl));
      return href ? <a className="blog-link-card" href={href} target="_blank" rel="noopener noreferrer"><Download aria-hidden="true" /><span><small>LADATTAVA LIITE</small><strong>{value.title || 'Avaa liite'}</strong></span><ArrowUpRight aria-hidden="true" /></a> : null;
    },
    blogLinkCard: ({ value }) => {
      const href = safeLink(stegaClean(value.url));
      return href ? <a className="blog-link-card" href={href} target="_blank" rel="noopener noreferrer"><span><small>MUUALTA VERKOSTA</small><strong>{value.title}</strong>{value.description && <span>{value.description}</span>}</span><ArrowUpRight aria-hidden="true" /></a> : null;
    },
    blogArticleLink: ({ value }) => value.post?.slug ? <Link className="blog-link-card" href={`/blogi/${encodeURIComponent(stegaClean(value.post.slug))}/`}><span><small>LUE MYÖS</small><strong>{value.post.title || 'Blogikirjoitus'}</strong>{value.post.excerpt && <span>{value.post.excerpt}</span>}</span><ArrowUpRight aria-hidden="true" /></Link> : null,
  },
  marks: {
    link: ({ children, value }) => {
      const href = safeLink(stegaClean(value?.href), true);
      return href ? <a href={href} target={value?.blank ? '_blank' : undefined} rel={value?.blank ? 'noopener noreferrer' : undefined}>{children}</a> : <>{children}</>;
    },
  },
};

export default function BlogBody({ value }: { value: BlogPost['body'] }) {
  return <div className="blog-prose">{value && <PortableText value={value} components={components} />}</div>;
}
