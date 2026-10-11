import Footer from '@/components/Footer';
import './blog.css';
import { draftMode } from 'next/headers';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return (await draftMode()).isEnabled ? { robots: { index: false, follow: false } } : {};
}

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();
  return <>{isEnabled && <div className="blog-preview-banner"><span>Esikatselu · Näet myös julkaisemattomat muutokset</span><a href="/api/draft-mode/disable/">Sulje esikatselu</a></div>}{children}<Footer /></>;
}
