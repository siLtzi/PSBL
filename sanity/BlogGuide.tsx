'use client';

import { IntentLink } from 'sanity/router';

export default function BlogGuide() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px', lineHeight: 1.7, height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
      <p style={{ fontSize: 13, letterSpacing: 2 }}>PSBL / BLOGI</p>
      <h1 style={{ fontSize: 36, lineHeight: 1.2 }}>Tervetuloa kirjoittamaan.</h1>
      <p>Et tarvitse teknistä osaamista. Kirjoita, lisää kuvat ja tarkista lopputulos esikatselussa.</p>
      <IntentLink intent="create" params={{ type: 'blogPost' }} style={{ display: 'inline-block', background: '#f0c000', color: '#0d0d0d', padding: '12px 22px', fontWeight: 700, textDecoration: 'none' }}>+ Uusi blogikirjoitus</IntentLink>
      <ol style={{ paddingLeft: 24 }}>
        <li><strong>Kirjoita.</strong> Lisää otsikko ja paina verkko-osoitteen vieressä Generate. Kirjoita aloitusteksti ja varsinainen sisältö.</li>
        <li><strong>Lisää kuvat ja muut sisällöt.</strong> Kansikuvan voit vetää suoraan kenttään. Kirjoitus-kentän Lisää-valikosta löydät kuvat, galleriat, videot, äänen ja liitteet. Tekstilinkin saat valitsemalla sanat ja painamalla linkkikuvaketta.</li>
        <li><strong>Katso miltä näyttää.</strong> Avaa kirjoituksen yläosassa oleva sivulinkki esikatseluun. Esikatselu-välilehdellä näet muutokset suoraan sivulla. Klikkaa sivun tekstiä tai kuvaa muokataksesi sitä. Tarkista myös puhelinnäkymä.</li>
        <li><strong>Tarkista julkaisutiedot.</strong> Lisää oma nimesi, valitse aihe ja tarkista päivämäärä. Hakukone-kentät voit jättää tyhjiksi.</li>
        <li><strong>Julkaise.</strong> Paina Publish, kun olet tyytyväinen. Kirjoitus tulee heti näkyviin blogiin. Päivämäärä ei ajasta julkaisua.</li>
      </ol>
      <h2>Luonnos on oma työtilasi</h2>
      <p>Muutokset tallentuvat automaattisesti luonnokseen. Voit poistua ja jatkaa myöhemmin Sisältö → Blogikirjoitukset -kohdasta. Julkaistun kirjoituksen muokkaukset näkyvät lukijoille vasta, kun painat Publish uudelleen. Unpublish poistaa kirjoituksen julkiselta sivulta ja säilyttää sen muokattavana.</p>
      <h2>Hyvä tietää</h2>
      <ul>
        <li>Voit käyttää tavallista editoria Sisältö-välilehdellä tai muokata sivun vieressä Esikatselu-välilehdellä.</li>
        <li>Kerro kuvien kuvauskentässä lyhyesti, mitä kuvassa näkyy. Se auttaa ruudunlukijaa käyttäviä lukijoita.</li>
        <li>YouTube- ja Vimeo-videoihin riittää jakolinkki. Videotiedostot (MP4/WebM), äänitteet ja liitteet voi ladata koneelta.</li>
        <li>Muiden palveluiden sisältöä voi jakaa linkkikortilla. Videon puhe kannattaa kirjoittaa myös tekstiksi.</li>
        <li>Julkaistun kirjoituksen verkko-osoite kannattaa säilyttää, jotta jaetut linkit toimivat jatkossakin.</li>
      </ul>
    </div>
  );
}
