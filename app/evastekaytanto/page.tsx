import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { barlowCondensed, barlow } from "@/app/fonts";
import CookieSettingsButton from "@/components/CookieSettingsButton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psbl.fi";

export const metadata: Metadata = {
  title: "Evästekäytäntö – PSBL",
  description:
    "Pohjois-Suomen Betonilattiat Oy:n evästekäytäntö. Tietoa evästeiden ja analytiikan käytöstä sivustollamme.",
  alternates: { canonical: `${SITE_URL}/evastekaytanto` },
  robots: { index: true, follow: true },
};

export default function EvastekaytantoPage() {
  const h2 =
    `${barlowCondensed.className} text-xl sm:text-2xl font-black tracking-[2px] uppercase mt-10 mb-3`;
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
              Evästekäytäntö
            </h1>
            <p className={`${barlow.className} mt-3 text-sm text-[var(--mid)]`}>
              Päivitetty: 9.3.2026
            </p>
          </div>
        </div>
        <div className="hazard-stripe" />
      </section>

      {/* CONTENT */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Intro */}
          <p className={p}>
            Tällä sivulla kerromme, miten psbl.fi-sivusto käyttää evästeitä
            ja vastaavia teknologioita. Kunnioitamme yksityisyyttäsi ja
            noudatamme EU:n yleistä tietosuoja-asetusta (GDPR) sekä
            sähköisen viestinnän tietosuojalakia.
          </p>

          {/* 1. Mitä evästeet ovat */}
          <h2 className={h2}>1. Mitä evästeet ovat?</h2>
          <p className={p}>
            Evästeet (cookies) ovat pieniä tekstitiedostoja, jotka
            verkkosivusto tallentaa selaimessasi. Niitä käytetään tyypillisesti
            sivuston toiminnan varmistamiseen, käyttökokemuksen parantamiseen
            ja kävijätilastojen keräämiseen.
          </p>

          {/* 2. Sivustomme evästeet */}
          <h2 className={h2}>2. Sivustollamme käytettävät evästeet</h2>
          <p className={p}>
            <strong>
              Sivustomme ei aseta evästeitä tavallisille kävijöille.
            </strong>{" "}
            Emme käytä Google Analyticsia, Facebook-pikseliä tai muita
            kolmannen osapuolen seurantatyökaluja, jotka asettavat evästeitä.
          </p>

          {/* Table */}
          <div className="overflow-x-auto mb-6">
            <table className={`${barlow.className} w-full text-sm border-collapse`}>
              <thead>
                <tr className="border-b border-[var(--steel)] text-left">
                  <th className="py-3 pr-4 text-[var(--mid)] font-semibold">
                    Teknologia
                  </th>
                  <th className="py-3 pr-4 text-[var(--mid)] font-semibold">
                    Tyyppi
                  </th>
                  <th className="py-3 pr-4 text-[var(--mid)] font-semibold">
                    Asettaa evästeitä?
                  </th>
                  <th className="py-3 text-[var(--mid)] font-semibold">
                    Tarkoitus
                  </th>
                </tr>
              </thead>
              <tbody className="text-[var(--light)]">
                <tr className="border-b border-[var(--steel)]">
                  <td className="py-3 pr-4 font-medium">Plausible Analytics</td>
                  <td className="py-3 pr-4">Analytiikka</td>
                  <td className="py-3 pr-4">
                    <span className="text-green-400 font-semibold">Ei</span>
                  </td>
                  <td className="py-3">
                    Anonymisoitu kävijätilastointi ilman evästeitä
                  </td>
                </tr>
                <tr className="border-b border-[var(--steel)]">
                  <td className="py-3 pr-4 font-medium">localStorage</td>
                  <td className="py-3 pr-4">Välttämätön</td>
                  <td className="py-3 pr-4">
                    <span className="text-[var(--yellow)] font-semibold">
                      Paikallinen tallennus
                    </span>
                  </td>
                  <td className="py-3">
                    Evästeasetustesi muistaminen (hyväksy / hylkää)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 3. Plausible */}
          <h2 className={h2}>3. Plausible Analytics -analytiikka</h2>
          <p className={p}>
            Käytämme <strong>Plausible Analytics</strong> -palvelua
            verkkosivustomme kävijätilastointiin. Plausible on eurooppalainen,
            yksityisyydensuojaa kunnioittava analytiikkaratkaisu, joka:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li className={li}>
              <strong>Ei käytä evästeitä</strong> tai muita
              selaimen tallennusteknologioita
            </li>
            <li className={li}>
              <strong>Ei kerää henkilötietoja</strong> — IP-osoitetta ei
              tallenneta eikä yksittäisiä käyttäjiä voida tunnistaa
            </li>
            <li className={li}>
              <strong>Ei seuraa</strong> käyttäjiä sivustojen välillä
            </li>
            <li className={li}>
              Kerää vain anonymisoituja tilastoja: sivunäkymät, viittaava
              sivusto, laitteen tyyppi, selain ja maa
            </li>
            <li className={li}>
              Palvelimet sijaitsevat <strong>EU:ssa</strong> (Saksa)
            </li>
          </ul>
          <p className={p}>
            Plausible-analytiikka ladataan sivustollamme vain, jos hyväksyt
            sen evästebannerin kautta. Vaikka Plausible ei teknisesti vaadi
            suostumusta (koska se ei käytä evästeitä eikä kerää
            henkilötietoja), haluamme antaa sinulle täyden hallinnan.
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

          {/* 4. Välttämätön tallennus */}
          <h2 className={h2}>4. Välttämätön paikallinen tallennus</h2>
          <p className={p}>
            Ainoa sivuston käyttämä tallennus on selaimen{" "}
            <strong>localStorage</strong>, johon tallennetaan evästeasetustesi
            valinta (&quot;hyväksy kaikki&quot; tai &quot;vain
            välttämättömät&quot;). Tämä on EU:n sähköisen viestinnän
            tietosuojadirektiivin mukaan sallittua ilman erillistä
            suostumusta, koska tallennus on{" "}
            <strong>välttämätöntä</strong> sivuston suostumustyökalun
            toiminnan kannalta.
          </p>

          {/* 5. Suostumuksen hallinta */}
          <h2 className={h2}>5. Suostumuksen hallinta</h2>
          <p className={p}>
            Voit milloin tahansa muuttaa evästeasetuksiasi. Klikkaa alla
            olevaa painiketta avataksesi evästevalintaikkunan uudelleen:
          </p>
          <div className="mb-6">
            <CookieSettingsButton />
          </div>
          <p className={p}>
            Vaihtoehtoisesti voit tyhjentää selaimesi paikallisen tallennuksen
            (localStorage), jolloin evästeikkuna näytetään uudelleen
            seuraavalla käynnillä.
          </p>

          {/* 6. Kolmannet osapuolet */}
          <h2 className={h2}>6. Kolmannen osapuolen palvelut</h2>
          <p className={p}>
            Sivustollamme käytetään seuraavia ulkoisia palveluita, jotka
            eivät aseta evästeitä:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li className={li}>
              <strong>Sanity.io</strong> — Sisällönhallintajärjestelmä. Kuvat
              ladataan Sanityn CDN:stä (cdn.sanity.io). Ei evästeitä.
            </li>
            <li className={li}>
              <strong>Vercel</strong> — Hosting-palvelu. Vercel saattaa
              käsitellä teknisiä lokitietoja (IP-osoite palvelinpyynnöissä),
              mutta ei aseta kolmannen osapuolen evästeitä.
            </li>
          </ul>

          {/* 7. Oikeutesi */}
          <h2 className={h2}>7. Oikeutesi</h2>
          <p className={p}>
            Sinulla on oikeus kieltäytyä kaikista ei-välttämättömistä
            teknologioista. Sivustomme toimii täysin normaalisti ilman
            analytiikkaa. Evästeasetuksesi eivät vaikuta sivuston
            sisältöön tai toiminnallisuuteen millään tavalla.
          </p>

          {/* 8. Yhteystiedot */}
          <h2 className={h2}>8. Yhteystiedot</h2>
          <p className={p}>
            Jos sinulla on kysyttävää evästekäytännöstämme, ota yhteyttä:
          </p>
          <p className={p}>
            Pohjois-Suomen Betonilattiat Oy
            <br />
            Sähköposti:{" "}
            <a
              href="mailto:toimisto@psbl.fi"
              className="text-yellow-400 underline underline-offset-2"
            >
              toimisto@psbl.fi
            </a>
          </p>

          {/* Link to privacy policy */}
          <div className="mt-8 pt-8 border-t border-[var(--steel)]">
            <p className={p}>
              Katso myös:{" "}
              <Link
                href="/tietosuojaseloste"
                className="text-yellow-400 underline underline-offset-2"
              >
                Tietosuojaseloste →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
