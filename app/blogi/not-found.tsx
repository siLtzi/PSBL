import Link from 'next/link';

export default function NotFound() {
  return <main className="blog-page blog-container blog-empty" style={{ paddingTop: 160 }}><span className="blog-eyebrow">404 / Blogi</span><h1>Kirjoitusta ei löytynyt.</h1><p>Kirjoitus on voitu poistaa tai sitä ei ole vielä julkaistu.</p><Link href="/blogi/" className="blog-button">Takaisin blogiin</Link></main>;
}
