# SEO Documentatie — Studio H20

Laatste update: maart 2026
Domein: [studioh20.nl](https://studioh20.nl)

---

## Wat is geïmplementeerd

### 1. Hoofdpagina — `index.html`

**Title tag**
```
Podcast Studio Huren in Purmerend | 4-Camera Live | Studio H20
```

**Meta description**
```
Professionele podcaststudio in Purmerend. 4-camera live-geschakeld, eigen technicus,
direct bruikbare aflevering na opname. Geen nabewerking nodig. Bekijk tarieven.
```

**Canonical**
```
https://studioh20.nl/
```

**Open Graph tags** — voor sociale media previews (LinkedIn, WhatsApp, Facebook):
- `og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:locale`

**Twitter Card** — `summary_large_image`

**JSON-LD — LocalBusiness schema**
- Type: `LocalBusiness`
- Naam, beschrijving, URL
- Adres: Spinnekop 2, 1444 GN Purmerend
- Geo-coördinaten: 52.5022, 4.9561
- Prijsrange: `€€`
- `areaServed`: Purmerend, Hoorn, Zaandam, Alkmaar, Amsterdam Noord, Noord-Holland
- `hasOfferCatalog` met de 4 losse tarieven (Gratis Pilot, 1u, 2u, Halve Dag)

---

### 2. Zes Statische Satellietpagina's

Elke pagina heeft:
- Unieke title + meta description
- Eigen canonical URL (niet verwijzend naar hoofdpagina)
- JSON-LD LocalBusiness schema
- H1 met doelzoekterm
- 350–450 woorden unieke, locatiespecifieke content
- USP-blok (4-camera, technicus, reistijd, gratis parkeren)
- CTA knop → `studioh20.nl`
- Minimale navigatie (logo + boekknop)
- Branded styling passend bij hoofdsite

| URL | H1 | Doelzoekterm |
|---|---|---|
| `/podcast-studio-purmerend/` | Podcast Studio Huren in Purmerend | podcast studio purmerend |
| `/podcast-studio-hoorn/` | Podcast Studio Huren in Hoorn | podcast studio hoorn |
| `/podcast-studio-zaandam/` | Podcast Studio Huren bij Zaandam | podcast studio zaandam |
| `/podcast-studio-alkmaar/` | Podcast Studio Huren regio Alkmaar | podcast studio alkmaar |
| `/podcast-studio-amsterdam-noord/` | Podcast Studio bij Amsterdam Noord | podcast studio amsterdam noord |
| `/podcast-studio-noord-holland/` | Professionele Podcast Studio Noord-Holland | podcast studio noord-holland |

---

### 3. `sitemap.xml`

Locatie: `https://studioh20.nl/sitemap.xml`

Bevat alle 7 URL's (hoofdpagina + 6 satellietpagina's) met `changefreq: monthly`.

**Actie vereist:** indienen bij Google Search Console via:
Search Console → Sitemaps → URL invoeren → Verzenden

---

### 4. `robots.txt`

Locatie: `https://studioh20.nl/robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://studioh20.nl/sitemap.xml
```

Alle pagina's zijn toegankelijk voor crawlers. Sitemap-verwijzing is opgenomen.

---

### 5. `llms.txt` — AI Crawlers

Locatie: `https://studioh20.nl/llms.txt`

Gestructureerde beschrijving van Studio H20 in markdown-formaat, geoptimaliseerd voor AI-zoekmachines zoals Perplexity, ChatGPT (browsing) en Gemini. Bevat:
- Bedrijfsbeschrijving
- Overzicht van diensten met prijzen en links
- Locatie en bereikbaarheid per stad
- USP's in stikpuntvorm
- Link naar boekingspagina

---

## Nog te doen

### Google Search Console
- [ ] Domein verifiëren op Search Console
- [ ] Sitemap indienen: `https://studioh20.nl/sitemap.xml`
- [ ] Core Web Vitals monitoren na live-gang

### Google Business Profile
- [ ] Profiel aanmaken voor Studio H20
  - Categorie: Recording Studio / Video Production Studio
  - Adres: Spinnekop 2, 1444 GN Purmerend
  - Openingstijden invullen
  - Foto's toevoegen zodra beeldmateriaal beschikbaar is
  - Link naar `studioh20.nl` toevoegen

### Alt-teksten afbeeldingen
- [ ] Alt-teksten toevoegen aan alle afbeeldingen in de React-componenten zodra definitief beeldmateriaal beschikbaar is

### Sectie-id's op hoofdpagina
De volgende id's zijn aanwezig en vindbaar voor Google op sectieniveau:

| Sectie-id | Huidige inhoud |
|---|---|
| `#faciliteiten` | Features / Apparatuur sectie |
| `#werkwijze` | Protocol / Werkwijze sectie |
| `#prijzen` | Interactief tarieven menu |
| `#boeken` | Boekingsformulier |

Overweeg later `#locatie` toe te voegen als er een locatie/kaart sectie wordt gebouwd.

### Blog (maand 2+)
Geplande blogposts voor informationale zoektermen:

| Onderwerp | URL | Doelzoekterm |
|---|---|---|
| Podcast starten voor je bedrijf | `/blog/podcast-starten-bedrijf` | hoe start ik een podcast voor mijn bedrijf |
| Video podcast vs audio | `/blog/video-podcast-vs-audio` | voordelen video podcast |
| Live schakelen uitgelegd | `/blog/live-schakelen-podcast` | waarom podcast live schakelen |
| Beste studio Noord-Holland | `/blog/beste-podcast-studio-noord-holland` | beste podcast studio noord-holland |

---

## Bestandsoverzicht

```
/
├── index.html                          ← Meta tags, JSON-LD, OG tags
├── public/
│   ├── robots.txt                      ← Crawl-instructies + sitemap-link
│   ├── sitemap.xml                     ← Alle 7 URL's
│   ├── llms.txt                        ← AI-crawler beschrijving
│   ├── podcast-studio-purmerend/
│   │   └── index.html
│   ├── podcast-studio-hoorn/
│   │   └── index.html
│   ├── podcast-studio-zaandam/
│   │   └── index.html
│   ├── podcast-studio-alkmaar/
│   │   └── index.html
│   ├── podcast-studio-amsterdam-noord/
│   │   └── index.html
│   └── podcast-studio-noord-holland/
│       └── index.html
```
