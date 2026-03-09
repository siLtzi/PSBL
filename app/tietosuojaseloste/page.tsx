import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { exo2, scienceGothic } from "@/app/fonts";

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
    `${scienceGothic.className} text-xl sm:text-2xl font-black tracking-tight mt-10 mb-3`;
  const h3 =
    `${scienceGothic.className} text-lg sm:text-xl font-bold mt-6 mb-2`;
  const p = `${exo2.className} text-sm sm:text-base text-zinc-300 leading-relaxed mb-3`;
  const li = `${exo2.className} text-sm sm:text-base text-zinc-300 leading-relaxed`;

  return (
    <main className="bg-black text-zinc-50 min-h-screen">
      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 pt-28 sm:pt-32 text-center">
          <h1
            className={`${scienceGothic.className} text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase`}
          >
            Tietosuojaseloste
          </h1>
          <p className={`${exo2.className} mt-3 text-sm text-zinc-400`}>
            Päivitetty: 9.3.2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 md:py-16 bg-zinc-950">
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
              yhteydenottolomakkeen, tallennamme lähettämäsi tiedot tarjouksen
              laatimista ja yhteydenottoa varten.
            </li>
            <li className={li}>
              <strong>Asiakassuhteen hoitaminen:</strong> Urakkasopimusten
              hallinta ja laskutus.
            </li>
          </ul>
          <p className={p}>
            Käsittelyn oikeusperuste on <strong>oikeutettu etu</strong>{" "}
            (yhteydenottopyyntöihin vastaaminen ja liiketoiminnan hoitaminen)
            sekä tarvittaessa <strong>sopimuksen täytäntöönpano</strong>.
          </p>

          {/* 4. Kerättävät tiedot */}
          <h2 className={h2}>4. Kerättävät henkilötiedot</h2>
          <p className={p}>
            Yhteydenottolomakkeen kautta voidaan kerätä seuraavia tietoja:
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
            Kaikki kentät ovat vapaaehtoisia. Et ole velvollinen antamaan
            henkilötietojasi, mutta yhteydenottoomme vastaaminen edellyttää
            vähintään nimen ja yhteystiedon.
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
            Tietoja ei luovuteta muille kolmansille osapuolille, ellei laki
            sitä edellytä.
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
            päivitetyn päivämäärän kanssa. Suosittelemme tutustumaan
            tietosuojaselosteeseen säännöllisesti.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
