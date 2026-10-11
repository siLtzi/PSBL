import type { Metadata } from 'next';
import { sanityFetch } from '@/sanity/lib/live';
import { blogPostsQuery, blogSettingsQuery } from '@/sanity/blogQueries';
import BlogArchive from '@/components/blog/BlogArchive';
import type { BlogPost } from '@/components/blog/types';

export const metadata: Metadata = {
  title: 'Blogi – Pinnan alta',
  description: 'Tarinoita työmailta, vinkkejä betonilattioihin ja PSBL:n kuulumisia Pohjois-Suomesta.',
  alternates: { canonical: '/blogi/', languages: { 'fi-FI': '/blogi/' } },
  openGraph: { title: 'Blogi – Pinnan alta | PSBL', description: 'Tarinoita työmailta, ajatuksia betonista ja kuulumisia pohjoisesta.', url: '/blogi/', type: 'website' },
};

export default async function BlogPage() {
  const [postsResult, settingsResult] = await Promise.all([sanityFetch({ query: blogPostsQuery }), sanityFetch({ query: blogSettingsQuery })]);
  const posts = postsResult.data as BlogPost[];
  const settings = settingsResult.data as { title?: string; description?: string } | null;
  return <main className="blog-page">
    <section className="blog-hero"><div className="blog-container">
      <div className="blog-eyebrow"><span /> PSBL / Blogi</div>
      <div className="blog-hero-grid"><h1>{settings?.title || 'Pinnan alta.'}</h1><p>{settings?.description || 'Tarinoita työmailta, ajatuksia betonista ja kuulumisia pohjoisesta. Tätä on arki kestävien lattioiden takana.'}</p></div>
      <div className="blog-hero-foot"><span>TYÖMAAT · IHMISET · OSAAMINEN</span><span>POHJOISESTA. OMALLA OTTEELLA.</span></div>
    </div><div className="hazard-stripe" /></section>
    <div className="blog-container blog-archive"><BlogArchive posts={posts} /></div>
  </main>;
}
