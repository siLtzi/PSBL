'use client';

export default function BlogError({ reset }: { reset: () => void }) {
  return <main className="blog-page blog-container blog-empty" style={{ paddingTop: 160 }}><h1>Kirjoitusten lataaminen ei onnistunut.</h1><p>Yhteydessä on hetkellinen häiriö. Kokeile hetken kuluttua uudelleen.</p><button type="button" className="blog-button" onClick={reset}>Yritä uudelleen</button></main>;
}
