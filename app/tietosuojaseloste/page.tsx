import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { barlowCondensed, barlow } from "@/app/fonts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psbl.fi";

export const metadata: Metadata = {
  title: "Tietosuojaseloste – PSBL",
  description:
    "Pohjois-Suomen Betonilattiat Oy:n tietosuojaseloste. Tietoa henkilötietojen käsittelystä, oikeuksistasi rekisteröitynä ja tietoturvasta.",
  alternates: { canonical: `${SITE_URL}/tietosuojaseloste` },
  robots: { index: true, follow: true },
};

export default function TietosuojaselosteRage() {
  const h2 =
    `${barlowCondensed.className} text-xl sm:text-2xl font-black tracking-[2px] uppercase mt-10 mb-3`;
  const h3 =
    `${barlowCondensed.className} text-lg sm:text-xl font-bold uppercase mt-6 mb-2`;
  const p = `${barlow.className} text-sm sm:text-base text-[var(--light)] leading-relaxed mb-3`;
  const li = `${barlow.className} text-sm sm:text-base text-[var(--light)] leading-relaxed`;

  return (
    <main className="bg-[var(--dark)] text-[var(--off-white)] min-h-screen">
      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-[var(--black)] pt-[60px]">
        <div className="py-16 sm:py-20 md:py-24 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <h1
              className={`${barlowCondensed.className} text-3xl sm:text-4xl md:text-5xl font-black tracking-[2px] uppercase`}
            >
              Tietosuojaseloste
            </h1>
            <p className={`${barlow.className} mt-3 text-sm text-[var(--mid)]`}>
              Päivitetty: 8.10.2026
            </p>
          </div>
        </div>
        <div className="hazard-stripe" />
      </section>

      {/* CONTENT */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* 1. Rekisterinpitäjä */}
          <h2 className={h2}>1. Rekisterinpitäjä</h2>
          <p className={p}>
            Pohjois-Suomen Betonilattiat Oy
            <br />
            Y-tunnus: 3423998-4
            <br />
            Sähköposti:{" "}
            <a
              href="mailto:toimisto@psbl.fi"
              className="text-yellow-400 underline underline-offset-2"
            >
              toimisto@psbl.fi
            </a>
            <br />
            Puhelin:{" "}
            <a
              href="tel:+358442480482"
              className="text-yellow-400 underline underline-offset-2"
            >
              044 2480 482
            </a>
          </p>

          {/* 2. Yhteyshenkilö */}
          <h2 className={h2}>2. Yhteyshenkilö tietosuoja-asioissa</h2>
          <p className={p}>
            Tietosuojaa koskevissa asioissa voit olla yhteydessä
            sähköpostitse osoitteeseen{" "}
            <a
              href="mailto:toimisto@psbl.fi"
              className="text-yellow-400 underline underline-offset-2"
            >
              toimisto@psbl.fi
            </a>
            .
          </p>

          {/* 3. Rekisterin nimi ja tarkoitus */}
          <h2 className={h2}>
            3. Henkilötietojen käsittelyn tarkoitus ja oikeusperuste
          </h2>
          <p className={p}>
            Käsittelemme henkilötietoja seuraaviin tarkoituksiin:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li className={li}>
              <strong>Yhteydenottopyyntöjen käsittely:</strong> Kun lähetät
              yhteydenottolomakkeen tai otat yhteyttä sähköpostitse,
              käsittelemme lähettämäsi tiedot tarjouksen laatimista ja
              yhteydenottoa varten.
            </li>
            <li className={li}>
              <strong>Asiakassuhteen hoitaminen:</strong> Urakkasopimusten
              hallinta ja laskutus.
            </li>
          </ul>
          <p className={p}>
            Kun pyydät tarjousta omaa sopimustasi varten, käsittelyn
            oikeusperuste on <strong>sopimusta edeltävien toimenpiteiden
            toteuttaminen pyynnöstäsi</strong> ja asiakassuhteessa{" "}
            <strong>sopimuksen täytäntöönpano</strong>. Muuhun
            yhteydenottopyyntöihin vastaamiseen ja yritysasiakkaiden
            yhteyshenkilöiden tietojen käsittelyyn sovelletaan{" "}
            <strong>oikeutettua etua</strong>, joka on asiakasviestinnän
            ja liiketoiminnan hoitaminen. Oikeutettuun etuun perustuvaa
            käsittelyä voi vastustaa kohdassa 9 kuvatulla tavalla.
          </p>

          {/* 4. Kerättävät tiedot */}
          <h2 className={h2}>4. Kerättävät henkilötiedot</h2>
          <p className={p}>
            Yhteydenottolomakkeesta ja sähköpostiviesteistä voidaan käsitellä
            seuraavia tietoja:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li className={li}>Nimi</li>
            <li className={li}>Sähköpostiosoite</li>
            <li className={li}>Puhelinnumero</li>
            <li className={li}>Yrityksen nimi</li>
            <li className={li}>Työmaan sijainti (osoite ja/tai karttakoordinaatit)</li>
            <li className={li}>Arvioitu neliömäärä (m²)</li>
            <li className={li}>Vapaamuotoinen viesti</li>
          </ul>
          <p className={p}>
            Lomakkeella nimi, sähköpostiosoite, puhelinnumero, työmaan
            osoite tai sijainti ja viesti ovat pakollisia yhteydenoton
            käsittelyä varten. Muut kentät ovat
            vapaaehtoisia. Älä lähetä henkilötunnuksia, terveystietoja tai
            muita tarjouspyynnön kannalta tarpeettomia henkilötietoja.
          </p>

          {/* 5. Tietojen siirto */}
          <h2 className={h2}>5. Tietojen siirrot ja luovutukset</h2>
          <p className={p}>
            Yhteydenottolomakkeen tiedot lähetetään sähköpostiksi{" "}
            <strong>Resend</strong>-palvelun kautta (Resend, Inc., Yhdysvallat).
            Resend toimii henkilötietojen käsittelijänä puolestamme ja
            noudattaa EU:n yleisen tietosuoja-asetuksen (GDPR) vaatimuksia
            vakiosopimuslausekkeiden (SCC) perusteella.
          </p>
          <p className={p}>
            Sähköpostiviestejä käsitellään myös PSBL:n sähköpostipalvelussa
            (Domainhotelli). Sisäisen sovelluksen palveluntarjoajat
            ja tekoälykäsittely kuvataan alla. Tietoja ei myydä eikä luovuteta
            ulkopuolisten omaan markkinointiin. Tietoja voidaan luovuttaa
            viranomaiselle, jos laki sitä edellyttää.
          </p>

          <h3 id="tekoaly" className={`${h3} scroll-mt-24`}>
            5.1 Tekoälyavusteinen tarjouspyyntöjen käsittely
          </h3>
          <p className={p}>
            Käytössämme on sisäinen sovellus tarjouspyyntöjen käsittelyyn.
            Sovelluksessa voidaan käyttää{" "}
            <strong>Anthropicin Claude API -palvelua</strong> tarjouspyynnön
            tekstissä olevien työmaan ja pyydetyn työn tietojen poimintaan
            ja jäsentämiseen. Tekoälykäsittely koskee erikseen valittuja
            viestejä, ei automaattisesti kaikkia yhteydenottoja.
          </p>
          <p className={p}>
            PSBL:n ylläpitäjä valitsee viestin
            ja hyväksyy sen lähettämisen tekoälypalveluun erikseen.
            Pelkkä lomakkeen lähettäminen tai viestin vastaanottaminen ei
            käynnistä tekoälykäsittelyä. Ylläpitäjän hyväksyntä on sisäinen
            työvaihe, ei asiakkaan antama suostumus tai käsittelyn oikeusperuste.
          </p>
          <p className={p}>
            Palveluun lähetettävä teksti voi sisältää viestiin kirjoitettuja
            nimiä, yhteystietoja, työmaan sijaintitietoja ja muita henkilötietoja.
            Tietojen automaattista anonymisointia ei pidä olettaa. Ennen
            lähettämistä on rajattava pois tarpeettomat henkilötiedot ja
            aineisto, jonka luovuttamisen esimerkiksi salassapitosopimus
            estää. Tämä kuvaus koskee tarjouspyyntöjen tekstiä, eikä tarkoita
            lupaa lähettää kaikkia sopimuksia tai sähköpostiliitteitä
            tekoälypalveluun.
          </p>
          <p className={p}>
            Tekoälyn poiminta voi olla virheellinen tai puutteellinen.
            Ihminen tarkistaa ja hyväksyy poimitut tiedot ennen niiden
            käyttämistä tarjouksessa. Hinnat lasketaan erillisellä
            sääntöpohjaisella laskennalla, eivät tekoälyllä. Tarjouksen
            tarkistaa ihminen, eikä tässä työnkulussa tehdä asiakkaaseen
            kohdistuvia yksinomaan automaattisia päätöksiä.
          </p>
          <p className={p}>
            Anthropicin kaupallisten API-ehtojen mukaan asiakkaan sisältöä
            ei käytetä mallien kouluttamiseen. Tämä ei tarkoita, ettei
            palveluntarjoaja säilyttäisi tietoja tai käsittelisi niitä
            EU/ETA-alueen ulkopuolella. Palvelun säilytysaikaa koskevat
            tiedot kuvataan kohdassa 7.
          </p>
          <p className={p}>
            Sisäisen sovelluksen palveluntarjoajia ovat{" "}
            <strong>Vercel</strong> (sovelluksen ja tiedostojen ylläpito),{" "}
            <strong>Neon</strong> (tietokanta EU-alueella),{" "}
            <strong>Resend</strong> (sähköpostien välitys) ja{" "}
            <strong>Anthropic</strong> (tekoälyavusteinen tiedonpoiminta).
            Tietokannan EU-sijainti ei yksin takaa kaiken käsittelyn
            rajoittumista EU/ETA-alueelle. Mahdollisten EU/ETA-alueen
            ulkopuolisten siirtojen kohteita ja sovellettavia suojatoimia
            ei ole vielä yksilöity tässä selosteessa.
            Lisätietoja ja soveltuvien siirtosuojatoimien jäljennöksiä voi
            pyytää kohdassa 2 mainitusta osoitteesta.
          </p>
          <p className={p}>
            Lisätietoja palveluntarjoajan ehdoista:{" "}
            <a
              href="https://www.anthropic.com/legal/commercial-terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 underline underline-offset-2"
            >
              Anthropicin kaupalliset ehdot
            </a>{" "}
            ja{" "}
            <a
              href="https://www.anthropic.com/legal/data-processing-addendum"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 underline underline-offset-2"
            >
              henkilötietojen käsittelysopimus
            </a>
            .
          </p>

          {/* 6. Analytiikka */}
          <h2 className={h2}>6. Verkkosivuston analytiikka</h2>
          <p className={p}>
            Käytämme <strong>Plausible Analytics</strong> -palvelua, joka on
            evästeetön ja yksityisyydensuojaa kunnioittava analytiikkaratkaisu.
            Plausible ei käytä evästeitä, ei kerää henkilötietoja eikä seuraa
            yksittäisiä käyttäjiä sivustojen välillä. Kerättävät tiedot ovat
            täysin anonymisoituja (sivunäkymät, viittaava sivusto, laitteen
            tyyppi, maa).
          </p>
          <p className={p}>
            Analytiikka ladataan vain, jos hyväksyt analytiikkaevästeet
            evästebannerin kautta. Voit myös estää analytiikan
            selaimesi asetuksista.
          </p>
          <p className={p}>
            Lisätietoja:{" "}
            <a
              href="https://plausible.io/data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 underline underline-offset-2"
            >
              plausible.io/data-policy
            </a>
          </p>

          {/* 7. Tietojen säilytys */}
          <h2 className={h2}>7. Tietojen säilytysaika</h2>
          <p className={p}>
            Yhteydenottolomakkeen kautta saadut tiedot säilytetään
            sähköpostilaatikossa niin kauan kuin asiakassuhteen hoitaminen
            sitä edellyttää. Tarpeettomat tiedot poistetaan viimeistään
            kahden (2) vuoden kuluttua yhteydenottohetkestä, ellei
            laki edellytä pidempää säilytysaikaa.
          </p>
          <p className={p}>
            Sisäisen sovelluksen asiakasviestien, poimintatulosten ja
            palveluntarjoajille lähetettävän aineiston säilytysaikoja sekä
            poistokäytäntöjä ei ole vielä vahvistettu tässä selosteessa.
            Sähköpostin säilytysaika ei sellaisenaan kuvaa tekoälypalvelun
            säilytysaikaa.
          </p>

          {/* 8. Tietoturva */}
          <h2 className={h2}>8. Tietojen suojaaminen</h2>
          <p className={p}>
            Kaikki tiedonsiirto sivuston ja palvelimen välillä on suojattu
            SSL/TLS-salauksella (HTTPS). Yhteydenottolomakkeen tiedot
            lähetetään salatun yhteyden kautta Resend-palvelun rajapintaan.
            Pääsy henkilötietoihin on rajattu vain niihin henkilöihin,
            joiden työtehtävät sitä edellyttävät.
          </p>

          {/* 9. Rekisteröidyn oikeudet */}
          <h2 className={h2}>9. Rekisteröidyn oikeudet</h2>
          <p className={p}>
            Sinulla on EU:n yleisen tietosuoja-asetuksen (GDPR) mukaisesti
            seuraavat oikeudet:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li className={li}>
              <strong>Tarkastusoikeus:</strong> Oikeus saada tieto siitä,
              käsitelläänkö henkilötietojasi ja mitä tietoja on tallennettu.
            </li>
            <li className={li}>
              <strong>Oikaisuoikeus:</strong> Oikeus vaatia virheellisen tai
              epätarkan tiedon korjaamista.
            </li>
            <li className={li}>
              <strong>Poisto-oikeus:</strong> Oikeus pyytää henkilötietojesi
              poistamista (&quot;oikeus tulla unohdetuksi&quot;).
            </li>
            <li className={li}>
              <strong>Käsittelyn rajoittaminen:</strong> Oikeus vaatia
              käsittelyn rajoittamista tietyissä tilanteissa.
            </li>
            <li className={li}>
              <strong>Vastustamisoikeus:</strong> Oikeus vastustaa
              henkilötietojesi käsittelyä oikeutetun edun perusteella.
            </li>
            <li className={li}>
              <strong>Siirto-oikeus:</strong> Oikeus saada tietosi
              koneluettavassa muodossa.
            </li>
          </ul>
          <p className={p}>
            Voit käyttää oikeuksiasi ottamalla yhteyttä osoitteeseen{" "}
            <a
              href="mailto:toimisto@psbl.fi"
              className="text-yellow-400 underline underline-offset-2"
            >
              toimisto@psbl.fi
            </a>
            . Vastaamme pyyntöihin viimeistään kuukauden kuluessa.
          </p>

          {/* 10. Valitusoikeus */}
          <h2 className={h2}>10. Valitusoikeus</h2>
          <p className={p}>
            Jos katsot, että henkilötietojesi käsittelyssä rikotaan
            tietosuoja-asetusta, sinulla on oikeus tehdä valitus
            valvontaviranomaiselle:
          </p>
          <p className={p}>
            <strong>Tietosuojavaltuutetun toimisto</strong>
            <br />
            Käyntiosoite: Lintulahdenkuja 4, 00530 Helsinki
            <br />
            Postiosoite: PL 800, 00531 Helsinki
            <br />
            Sähköposti: tietosuoja(at)om.fi
            <br />
            Puhelin: 029 566 6700
            <br />
            <a
              href="https://tietosuoja.fi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 underline underline-offset-2"
            >
              tietosuoja.fi
            </a>
          </p>

          {/* 11. Evästeet */}
          <h2 className={h2}>11. Evästeet</h2>
          <p className={p}>
            Sivustomme evästekäytännöstä kerrotaan tarkemmin erillisessä
            evästekäytäntö-dokumentissa:{" "}
            <Link
              href="/evastekaytanto"
              className="text-yellow-400 underline underline-offset-2"
            >
              Evästekäytäntö →
            </Link>
          </p>

          {/* 12. Muutokset */}
          <h2 className={h2}>12. Muutokset tietosuojaselosteeseen</h2>
          <p className={p}>
            Pidätämme oikeuden päivittää tätä tietosuojaselostetta
            tarvittaessa. Muuttunut versio julkaistaan tällä sivulla
            päivitetyn päivämäärän kanssa. Olennaisista käsittelyn muutoksista
            annetaan tieto myös suoraan asianomaisille asiakkaille silloin,
            kun informointivelvollisuus sitä edellyttää. Pelkkä tämän sivun
            päivittäminen ei korvaa aiemmin saatujen tietojen uutta käyttöä
            koskevaa informointia.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
