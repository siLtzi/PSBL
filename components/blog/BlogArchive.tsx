'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Search } from 'lucide-react';
import { stegaClean } from 'next-sanity';
import { formatBlogDate } from '@/lib/blog';
import BlogImage from './BlogImage';
import type { BlogPost } from './types';
import { blogEditingAttribute } from '@/sanity/lib/blogEditing';

function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const slug = stegaClean(post.slug);
  return <article className={`blog-card${featured ? ' blog-card-featured' : ''}`}>
    <Link href={`/blogi/${encodeURIComponent(slug)}/`} className="blog-card-link">
      <div className="blog-card-image" data-sanity={blogEditingAttribute(post._id, 'mainImage')}>{post.mainImage?.asset ? <BlogImage value={post.mainImage} cover priority={featured} /> : <div className="blog-image-placeholder" aria-hidden="true"><span>PSBL<span className="blog-dot">.</span></span><small>PINNAN ALTA</small></div>}{featured && <span className="blog-feature-label">Uusin kirjoitus</span>}</div>
      <div className="blog-card-copy">
        <div className="blog-meta"><span>{post.category || 'Blogi'}</span>{post.publishedAt && <time dateTime={stegaClean(post.publishedAt)}>{formatBlogDate(stegaClean(post.publishedAt))}</time>}</div>
        <h2>{post.title || 'Uusi kirjoitus'}</h2>
        {post.excerpt && <p>{post.excerpt}</p>}
        <div className="blog-card-bottom"><span>{post.author || 'PSBL'}</span><span className="blog-read">Lue kirjoitus <ArrowUpRight size={20} aria-hidden="true" /></span></div>
      </div>
    </Link>
  </article>;
}

export default function BlogArchive({ posts }: { posts: BlogPost[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Kaikki');
  const [limit, setLimit] = useState(9);
  const categories = Array.from(new Set(posts.map(p => stegaClean(p.category)).filter((c): c is string => Boolean(c))));
  const filtered = posts.filter(post => (category === 'Kaikki' || stegaClean(post.category) === category) && stegaClean([post.title, post.excerpt, post.author, post.category].join(' ')).toLocaleLowerCase('fi').includes(search.trim().toLocaleLowerCase('fi')));
  const defaultView = category === 'Kaikki' && !search.trim();
  if (!posts.length) return <section className="blog-empty"><span className="blog-eyebrow">Uusi luku alkaa tästä</span><h2>Tarinoita on tulossa.</h2><p>Työmaiden kuulumiset ja parhaat vinkit löytävät pian tiensä tänne. Sillä välin voit tutustua työmme jälkeen.</p><Link className="blog-button" href="/referenssit/">Katso referenssit <ArrowRight size={18} aria-hidden="true" /></Link></section>;
  return <>
    <div className="blog-toolbar">
      <div className="blog-filters" aria-label="Suodata aiheen mukaan">{['Kaikki', ...categories].map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setLimit(9); }}>{item}</button>)}</div>
      <label className="blog-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Hae kirjoituksia</span><input type="search" placeholder="Hae kirjoituksia…" value={search} onChange={event => { setSearch(event.target.value); setLimit(9); }} /></label>
    </div>
    <p className="blog-result-count" role="status">{filtered.length} {filtered.length === 1 ? 'kirjoitus' : 'kirjoitusta'}</p>
    {defaultView && filtered[0] && <PostCard post={filtered[0]} featured />}
    <div className="blog-grid">{filtered.slice(defaultView ? 1 : 0, limit).map(post => <PostCard key={post._id} post={post} />)}</div>
    {!filtered.length && <div className="blog-empty"><h2>Kirjoituksia ei löytynyt.</h2><p>Kokeile toista hakusanaa tai aihetta.</p><button className="blog-button" type="button" onClick={() => { setSearch(''); setCategory('Kaikki'); }}>Näytä kaikki kirjoitukset</button></div>}
    {filtered.length > limit && <button className="blog-button blog-load-more" type="button" onClick={() => setLimit(limit + 9)}>Näytä lisää kirjoituksia <ArrowRight size={18} aria-hidden="true" /></button>}
  </>;
}
