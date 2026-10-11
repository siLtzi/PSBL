# PSBL:n blogi

## Kirjoittajalle

1. Avaa sivuston `/studio/` ja kirjaudu omalla Sanity-tunnuksella.
2. Avaa **Kirjoittajan ohje → Uusi blogikirjoitus**, tai **Sisältö → Blogikirjoitukset**.
3. Kirjoita otsikko ja luo verkko-osoite **Generate**-painikkeella. Lisää aloitusteksti, kansikuva ja kirjoitus. Kuvien kuvauskenttä kertoo ruudunlukijan käyttäjälle, mitä kuvassa näkyy.
4. Lisää sisältökentän valikosta kuvia, kuvagalleria, MP4/WebM-video, YouTube/Vimeo-linkki, äänite, ladattava tiedosto tai linkkikortti. Teksti tukee väliotsikoita, lainauksia, luetteloita ja linkkejä. Oma blogikirjoitus voidaan valita artikkelilinkiksi.
5. Avaa kirjoituksen yläosan sivulinkki **Esikatselu**-näkymään. Klikkaa esikatselun tekstejä ja kuvia avataksesi niiden kentät. Muutokset päivittyvät sivulle automaattisesti. Tarkista myös esikatselun puhelinnäkymä.
6. Tarkista **Julkaisutiedot**: kirjoittaja, aihe ja päivämäärä. Päivämäärä järjestää kirjoitukset; se ei ajasta julkaisua.
7. Paina **Publish** julkaistaksesi. Automaattisesti tallennetut luonnokset näkyvät vain kirjautuneen kirjoittajan esikatselussa. Julkaistun kirjoituksen muutokset julkaistaan samalla painikkeella. **Unpublish** poistaa kirjoituksen lukijoilta säilyttäen muokattavan sisällön.

Tavallinen Sanity-editori on käytettävissä **Sisältö**-välilehdellä. Blogin otsikon ja esittelytekstin voi vaihtaa kohdasta **Blogin etusivu**. Julkaistun kirjoituksen verkko-osoitetta ei kannata muuttaa, sillä vanhat linkit eivät siirry automaattisesti uuteen osoitteeseen.

## Käyttöönotto ylläpitäjälle

- Olemassa olevat `NEXT_PUBLIC_SANITY_PROJECT_ID` ja `NEXT_PUBLIC_SANITY_DATASET` määrittävät projektin. `NEXT_PUBLIC_SITE_URL` on tuotannon osoite.
- Aseta palvelimen `SANITY_API_READ_TOKEN` Sanityn **Viewer**-oikeuden tokeniksi. Sen pitää saada lukea luonnoksia. Älä käytä kirjoitusoikeuden tokenia: `next-sanity` välittää tämän luku-tokenin selaimelle kirjautuneen esikatselun aikana live-päivityksiä varten. Älä nimeä sitä `NEXT_PUBLIC_`-muuttujaksi.
- Sanity Manage → API → CORS origins: salli sivuston oikea tuotanto-osoite ja paikallinen kehitysosoite, credentials käytössä. Tässä työssä testipalvelin on `http://localhost:3005`; se puuttui sallituista osoitteista selaintestissä. Sisäänrakennettu Studio käyttää `/studio/`-osoitetta.
- Kutsu kirjoittaja Sanity-projektiin omalla tunnuksella ja sisällön muokkaukseen/julkaisuun sopivalla roolilla. Studio-valikot eivät ole käyttöoikeusrajoja. Vain blogiin rajattavat oikeudet vaativat projektissa käytettävissä olevat mukautetut roolit; tavallinen Editor voi muokata myös muuta sivuston sisältöä.
- Blogi ei tarvitse sisältömigraatiota tai esimerkkikirjoitusten julkaisua. Ensimmäiseen julkaisuun asti `/blogi/` näyttää suunnitellun tyhjän tilan. Blogin etusivun asetukset ovat valinnaiset.
- Julkaisut tulevat näkyviin Live Content API:n kautta. Sivukartta päivittyy viiden minuutin välein ja hakee vain julkaistut kirjoitukset. Ulkoiset videosoittimet ladataan vasta lukijan klikkauksesta.

## Hyväksymiskoe oikealla kirjoittajatunnuksella

1. Luo luonnos ja verkko-osoite. Lisää jokaista haluttua mediatyyppiä sekä tekstilinkki.
2. Avaa esikatselu. Varmista että uusi luonnos avautuu, kentän muutos päivittyy ja sivun tekstiä klikkaamalla pääsee oikeaan kenttään.
3. Avaa sama osoite yksityisessä selainikkunassa: julkaisematon kirjoitus ei saa näkyä.
4. Julkaise kirjoitus, varmista kortti blogissa sekä artikkelisivu. Testaa haku, aihesuodatus, mediasoittimet ja puhelinnäkymä.
5. Muokkaa julkaistua kirjoitusta: lukijalle näkyy vanha sisältö, esikatselussa uusi. Julkaise uudelleen ja varmista päivitys. Poista testikirjoituksen julkaisu lopuksi.

Esikatselun asetukset perustuvat [Sanityn Presentation-resolvereihin](https://www.sanity.io/docs/visual-editing/presentation-resolver-api) ja projektin `next-sanity` Live Content API -integraatioon. Todellinen luonnos-/julkaisukoe tarvitsee kirjautuneen Sanity-käyttäjän; sitä ei korvaa paikallinen komponenttitesti.
