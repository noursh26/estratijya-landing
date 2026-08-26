# UI kit — estratijiya.com (marketing site)

A recreation of Estratijiya's public marketing site: the one product surface the brand
operates today. Built from the live site's own content and section order
(`https://estratijiya.com`, read 25 Aug 2026) plus the brand's visual language as defined
in the company-profile deck.

## Screens / sections

| File | Contains |
| --- | --- |
| `index.html` | Mount point, fonts, bundle, marquee keyframes |
| `copy.js` | Bilingual content dictionary (EN + AR), the site's real copy |
| `SectionsTop.jsx` | `Header`, `Hero`, `About` (01 + 02), `Method` (03), `Services` (04) |
| `SectionsBottom.jsx` | `Audience` (05), `Results` (06), `Partners` (07), `Contact` (08), `Footer` |
| `App.jsx` | Language state, `dir` flipping, in-page scrolling |

## What's interactive

- **Language toggle** — flips the whole document between English (LTR) and Arabic (RTL),
  including the font family and text direction. Arabic copy is taken from the company
  profile, not machine-translated from the English site.
- **Method steps** — tap any of the six step cards to expand its detail; one open at a time.
- **Nav** — smooth-scrolls to the numbered sections and lights the active link.
- **Partners rail** — CSS marquee, paused by `prefers-reduced-motion`.

## Fidelity notes

- The live site's CSS was not readable (no source access, and cross-origin iframes can't be
  captured), so spacing and type sizes come from the design-system tokens rather than being
  measured off production. Section order, copy, and component inventory ARE from the site.
- Hero, vision and contact imagery are stills lifted from the company-profile PDF, not the
  site's own `brand-photos/*.jpg` (those binaries weren't supplied). Swap them when the real
  files arrive: `assets/city.png`, `corridor.png`, `signage.png`, `cover.png`.
- Partner names are set in type — no partner logo files were supplied.
- The site's individual service detail pages (`/services/<slug>`) were not reachable and are
  not recreated; the tiles link back to the grid.
