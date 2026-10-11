'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { videoEmbedUrl } from '@/lib/blog';

export default function VideoEmbed({ url, title }: { url?: string; title: string }) {
  const [active, setActive] = useState(false);
  const src = videoEmbedUrl(url);
  if (!src) return <p>Lisää YouTube- tai Vimeo-videon linkki nähdäksesi videon.</p>;
  return <div className="blog-video">
    {active ? <iframe src={src} title={title} allow="fullscreen; picture-in-picture; encrypted-media" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> :
      <button type="button" onClick={() => setActive(true)} className="blog-video-start">
        <Play size={36} aria-hidden="true" />
        <strong>{title}</strong><span>Lataa video</span>
        <small>Video ladataan ulkopuolisesta palvelusta vasta painamalla.</small>
      </button>}
  </div>;
}
