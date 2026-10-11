import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { stegaClean } from 'next-sanity';
import { sanityFetch } from '@/sanity/lib/live';
import { blogPostQuery } from '@/sanity/blogQueries';
import { urlFor } from '@/sanity/lib/image';
import { formatBlogDate } from '@/lib/blog';
import BlogBody from '@/components/blog/BlogBody';
import BlogImage from '@/components/blog/BlogImage';
import type { BlogPost } from '@/components/blog/types';
import { blogEditingAttribute } from '@/sanity/lib/blogEditing';

type Props = { params: Promise<{ slug: string }> };
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://psbl.fi';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await sanityFetch({ query: blogPostQuery, params: await params, stega: false });
  const post = data as BlogPost | null;
  if (!post) return { title: 'Kirjoitusta ei löytynyt', robots: { index: false, follow: false } };
  const title = post.seoTitle || post.title || 'Blogi';
  const description = post.seoDescription || post.excerpt;
  const url = `/blogi/${encodeURIComponent(post.slug)}/`;
  const images = post.mainImage?.asset ? [{ url: urlFor(post.mainImage).width(1200).height(630).fit('crop').url(), width: 1200, height: 630, alt: post.mainImage.alt || title }] : [{ url: '/og-image.png' }];
  return {
    title, description,
    alternates: { canonical: url, languages: { 'fi-FI': url } },
    ...((await draftMode()).isEnabled ? { robots: { index: false, follow: false } } : {}),
    openGraph: { title, description, url, type: 'article', publishedTime: post.publishedAt, modifiedTime: post._updatedAt, authors: post.author ? [post.author] : undefined, images },
    twitter: { card: 'summary_large_image', title, description, images },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { data } = await sanityFetch({ query: blogPostQuery, params: await params });
  const post = data as BlogPost | null;
  if (!post) notFound();
  const clean = stegaClean(post);
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: clean.title,
    description: clean.excerpt, datePublished: clean.publishedAt, dateModified: clean._updatedAt,
    mainEntityOfPage: `${siteUrl}/blogi/${encodeURIComponent(clean.slug)}/`,
    author: { '@type': clean.author && clean.author !== 'PSBL' ? 'Person' : 'Organization', name: clean.author || 'PSBL' },
    publisher: { '@type': 'Organization', name: 'Pohjois-Suomen Betonilattiat Oy' },
    image: clean.mainImage?.asset ? urlFor(clean.mainImage).width(1600).url() : undefined,
  };
  return <main className="blog-page blog-article">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <article>
      <header className="blog-article-header blog-container">
        <Link className="blog-back" href="/blogi/"><ArrowLeft size={17} aria-hidden="true" /> Kaikki kirjoitukset</Link>
        <div className="blog-eyebrow"><span /> {post.category || 'Blogi'}</div>
        <h1>{post.title || 'Uusi kirjoitus'}</h1>
        {post.excerpt && <p className="blog-lead">{post.excerpt}</p>}
        <div className="blog-byline"><span className="blog-author-mark" aria-hidden="true">P.</span><span>{post.author || 'PSBL'}</span>{clean.publishedAt && <time dateTime={clean.publishedAt}>{formatBlogDate(clean.publishedAt)}</time>}</div>
      </header>
      {post.mainImage?.asset && <figure className="blog-article-cover blog-container" data-sanity={blogEditingAttribute(post._id, 'mainImage')}><BlogImage value={post.mainImage} priority />{post.mainImage.caption && <figcaption>{post.mainImage.caption}</figcaption>}</figure>}
      <div className="blog-reading-column"><div data-sanity={blogEditingAttribute(post._id, 'body')}><BlogBody value={post.body} /></div><div className="blog-article-end"><span className="blog-eyebrow">PSBL / Pinnan alta</span><Link className="blog-button" href="/blogi/">Lisää luettavaa <ArrowRight size={18} aria-hidden="true" /></Link></div></div>
    </article>
  </main>;
}
