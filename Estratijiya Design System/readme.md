# Estratijiya — Design System

**Estratijiya** (استراتيجية, "strategy") is a business-growth consultancy based in Dubai, UAE.
It is not an agency selling services from a menu: it diagnoses a company, writes the strategy,
builds the operating systems, executes with the client's own team, and measures the result.
The positioning line is *"Your growth. Our system."* — and, on the English cover of the
company profile, *"Every growth starts with Estratijiya."*

The brand speaks Arabic first and English second. Both are first-class: every surface in this
system ships bilingual, RTL and LTR, from the same token set and the same typeface.

## Products & surfaces

| Surface | Status | Where it lives here |
| --- | --- | --- |
| **estratijiya.com** — bilingual marketing site (single long page + service detail pages) | Live | `ui_kits/website/` |
| **Company profile deck** — 11-slide Arabic sales/credentials deck | Supplied as PDF | `ui_kits/deck/` |
| Client-facing documents (studies, plans, SOPs) | Referenced in copy, none supplied | not built |

Five (deck) / seven (site) service divisions are named across the material: Strategy &
Studies, Operations / Building the System, Sales, Marketing & Brand, IT & AI, Supervision &
Execution, Personal Branding.

## Sources this system was built from

- `uploads/Str profile (1).pdf` — the 11-page Arabic company profile, Adobe Illustrator 25.2,
  16:9. **Primary visual source**: colours, slide layouts, imagery and tone were taken from it.
  A copy readable by tooling sits at `uploads/str-profile.pdf`; the raster stills extracted
  from its pages are in `assets/` (`cover`, `city`, `corridor`, `stairs`, `puzzle`, `folder`,
  `signage`).
- `uploads/company profile (1).docx` — the same profile as an editable Arabic script, page by
  page. **Primary copy source.** Plain-text extraction: `scraps/company-profile.txt`.
- Brand files supplied directly by the user: `logo-green/white/dark.png`,
  `icon-only-green/white/dark.png`, `favicon.png`, `apple-touch-icon.png`, and the four
  **IBM Plex Sans Arabic** weights (Regular/Medium/SemiBold/Bold) — the same binaries the
  estratijiya.com build ships (they arrived with build hashes in the filename).
- `https://estratijiya.com` — read 25 Aug 2026 for the live site's section order, English
  copy, service inventory and client list. **The site's CSS and its own brand photography
  were not accessible** (no repo, and cross-origin pages can't be captured here), so
  measurements in the website UI kit come from this system's tokens rather than production.

No GitHub repository, Figma file or codebase was provided.

---

## CONTENT FUNDAMENTALS

**The voice is a diagnostician's.** Short, declarative, unhurried. It never oversells and it
never hedges. Sentences frequently arrive as a claim followed by its consequence, split by a
comma or an em dash — this two-part shape is the brand's signature rhythm:

> نبدأ من السبب، لا من الطلب. — "We start from the cause, not from the request."
> لا نبيع خدمات، نجد الناقص، ونبنيه. — "We don't sell services; we find what's missing and build it."
> فالنتيجة عندنا تُقاس، لا تُوصَف. — "Results here are measured, not described."

**Person.** Arabic uses the first-person plural throughout (نُشخّص، نُخطّط، ننفّذ، نقيس —
"we diagnose, we plan, we execute, we measure") and addresses the client directly as **you**
(أرقامك، شركتك، فريقك). English follows: *we* + *you*, never "the client" or "users". Never
"I". The founder is never named in body copy.

**Casing.** English headings are sentence case with terminal full stops — the full stop is
deliberate and load-bearing: *"Growth is no accident. It's strategy."* Only the wordmark and
the footer signature are uppercase (`ESTRATIJIYA · DUBAI`). Eyebrow labels are set in
uppercase via CSS, but written sentence case in source. Arabic uses no case, but the same
short-sentence discipline; Arabic numerals appear in Eastern form (٠١، ٤٠) in deck contexts
and Western form on the web.

**Sentence length.** Headlines 3–12 words. Ledes one or two sentences. Body paragraphs rarely
exceed three sentences. Ellipses (…) are used sparingly, always to mark a turn in thought:
*"نبدأ من حيث لا يُرى العمل… لننتهي عند ما يراه العميل."*

**What the copy does and doesn't do.**

- **Numbers are earned.** Metrics appear only where the brand actually measured
  ("15+ roles", "five hiring stages", "Office 501"). Never round vanity figures, never "10x".
- **No superlatives, no adjectives of praise.** "Full client-management automation" — not
  "world-class automation".
- **Concrete nouns over abstractions.** Files, owners, deadlines, HubSpot, Zoho, SOPs.
- **Questions as section openers** (لماذا تتعثر الشركات؟ / من هي استراتيجية؟ / كيف نعمل؟) —
  then answered immediately in the next line.
- **Sections are numbered** 01…08. The numeral is part of the voice, not decoration: it
  signals that the argument is sequential and ordered.
- **No emoji. Ever.** None appear in any source material. Not in headings, not in UI, not in
  social copy examples.
- **No exclamation marks.** None in the entire corpus.
- **Calls to action are plain and small-commitment:** "Let's talk", "See How We Work",
  "Message us on WhatsApp", جلسة تشخيصٍ مجانية ("a free diagnosis session"), ثم تقرّر أنت
  ("then you decide").

**Tone check.** If a sentence could appear in a generic agency deck, it is wrong. If it
states plainly what was found, who owns it, and when it is due, it is right.

---

## VISUAL FOUNDATIONS

**The palette is two colours and a paper.** A very deep teal-green ink (`--teal-900 #031B1C`)
for full-bleed grounds and covers; a slightly lighter deep teal (`--teal-700 #0A3538`) for
alternating content sections; and a cool off-white paper (`--paper-100 #EDF4F1`) for
text-heavy pages. Against those, one accent: **growth mint `--green-500 #64D893`**, sampled
directly from the supplied logo. Mint appears as eyebrow labels, section numerals, primary
buttons, hairline outlines and the occasional full band or filled card — never as a large
background wash behind body text. Two grounds maximum per document.

There are **no gradients as decoration**. The only gradients in the system are ink protection
scrims (`--scrim-bottom`, `--scrim-start`) laid under type on photography. No bluish-purple
anything; no colour-shifted glows.

**Type is one family, four weights.** IBM Plex Sans Arabic covers Arabic and Latin with one
voice — slightly technical, open apertures, no personality quirks. 700 for display and
headings, 600 for buttons and card titles, 500 for eyebrows and nav, 400 for body. Display
type is tracked in (`-0.02em`) and set tight (1.08–1.22 line height); Arabic body is set
loose (1.75) because the script needs the air. The Latin wordmark in the logo is **lettering,
not type** — never re-set "ESTRATIJIYA" in a live font.

**Layout.** A 1240px container with a 64px desktop gutter, and a 4px spacing grid. Sections
are numbered and stack full-width, alternating paper and teal — the alternation is the page's
rhythm. Vertical section padding is generous (128px). Two- and three-column grids only; the
brand never uses more than three columns of cards. Images are either **full-bleed halves of a
split** (portrait 4:5 panels beside text) or **edge-bleeds cropped off the bottom or side of
a slide**. The sticky site header is the only fixed element; it starts transparent over the
hero and fades to `rgba(3,27,28,.86)` + a 14px backdrop blur after 40px of scroll.

**Backgrounds.** Solid colour, or photography with a scrim. No repeating patterns, no
textures, no noise, no hand-drawn illustration. The one recurring graphic device is the logo
mark itself, blown up and set at low opacity (~18%) as a watermark inside a green band or on
printed collateral — never rotated, never cropped mid-stroke.

**Imagery.** Cool, desaturated 3-D renders and architectural photography, tinted teal-green,
with a hard directional light. Recurring subjects: **a lone figure seen from behind**, facing
a path, a doorway, a staircase or a city; architecture with long clean planes; a single object
(puzzle piece, target, folder) rendered in mint on teal. No smiling stock, no groups around
laptops, no grain, no warm tones, no colour photography of people's faces.

**Corners and cards.** 16px on cards, 24px on media panels, 12px on inputs, full pills on
every action. A card on paper is white with a 1px `rgba(3,27,28,.10)` hairline and a soft
neutral shadow (`0 2px 8px rgba(3,27,28,.06)`); on hover it deepens to
`0 8px 24px rgba(3,27,28,.08)` and its border turns mint. A card on teal has **no shadow at
all** — it is a 4% white wash plus a light hairline, because shadows don't read on the dark
ground. The deck's cards go further: a mint 1px outline on a 24px radius with no fill.
Never a coloured left-border accent stripe.

**Borders.** Hairlines do the separating work: `1px` at 10% ink on paper, 16% paper on teal.
Value lists, footer link groups and deliverable rows are separated by these rules rather than
by boxes. The only 2px border is a focus ring.

**Elevation.** Four soft, neutral, straight-down shadows and one mint glow
(`--shadow-accent-glow`) reserved for a primary CTA sitting on a dark photo. Nothing else
glows.

**Transparency & blur.** Used in exactly two places: the sticky header (blur behind a 86%
ink) and photographic scrims. Cards, modals and panels are opaque. Never frosted glass as
decoration.

**Motion.** Calm and short. 160ms for colour/hover, 240ms for size and expansion, 720ms for
scroll reveals (fade + 24px rise). Easing is `cubic-bezier(.16,1,.3,1)` on entrances and
`cubic-bezier(.4,0,.2,1)` on colour. **No bounce, no overshoot, no spring, no parallax.** The
partner rail is the one continuous animation — a linear marquee.

**States.**

- *Hover:* primary buttons darken one step (mint 500 → 600); outline buttons pick up a 4–8%
  wash of the foreground colour; cards raise their shadow and turn their hairline mint; nav
  links grow a 1px mint underline from the start edge; card arrows nudge 3px in the reading
  direction. Never opacity-fade a control on hover.
- *Press:* `scale(.98)` plus one further colour step (mint 600 → 700). No shadow change.
- *Focus:* 2px mint outline, 2px offset — mint 400 on dark grounds.
- *Disabled:* 40% opacity, `not-allowed`. No greying-out to a different hue.
- *Selected/expanded:* mint 1px border plus a 10% mint wash — the pattern for the open method
  step.

---

## ICONOGRAPHY

**The brand has almost no iconography, and that is intentional.** Nothing in the supplied
material uses an icon library, an icon font, or a sprite sheet. The visual load is carried by
type, numerals, hairlines and photography.

What actually appears:

- **The logo mark** (`assets/icon-green|white|dark.png`) — three green strokes rising past a
  dot, a stylised figure in motion. Used as favicon, app icon, and as a large low-opacity
  watermark. It is the only piece of brand illustration.
- **Numerals as icons.** Circled two-digit numbers (01…08, ١…٤) open sections and steps. This
  is the brand's substitute for a pictogram set — use it.
- **Unicode glyphs as micro-affordances.** The arrow `→` after "Learn more", `↗` for
  off-site/WhatsApp links, `·` as a separator in lists of services and in the footer
  signature, `✓` inside the mint tick of a checklist, `…` in prose. Nothing else.
- **Bullet squares/dots** (`▪`, `·`) in the deck's division lists.
- **No emoji**, anywhere, in any language.
- **No SVG icon set was supplied and none was invented.** The contact block in the profile PDF
  does show four small line glyphs (chat, mail, phone, globe) drawn as vectors inside the
  Illustrator file — those were not extractable as reusable assets.

**If you need icons** (a dashboard, a settings screen, anything genuinely UI-dense): use
[Lucide](https://lucide.dev) at `stroke-width="1.5"`, `currentColor`, 20 or 24px, square
caps off. **This is a flagged substitution — Lucide is not the brand's icon set, because the
brand does not have one.** Ask before shipping it in client-facing work, and never mix two
icon families. Prefer a numeral or a word first.

---

## Intentional additions

Everything in `components/` maps to something the site or deck actually renders. Three
exceptions, added because consumers need them and the source implies them:

- **`Divider`** — the source uses hairline rules constantly (values list, footer, deliverable
  rows) but as ad-hoc borders; this makes it a component.
- **`SectionHeader`** — a composition of the numeral + eyebrow + heading + lede pattern that
  repeats identically in all eight site sections.
- **Status colours** (`--status-success/warning/danger`) — the brand defines none. These are
  derived from the palette and flagged in `guidelines/color-status.card.html`. Confirm before
  using them in anything client-facing.

**Not built, because the source has no counterpart:** form inputs, selects, checkboxes,
radios, switches, tabs, dialogs, toasts, tooltips, avatars, tables. The site has no forms —
contact happens via `mailto:` and WhatsApp. Ask before inventing them.

---

## Index

**Root**

| File | What it is |
| --- | --- |
| `readme.md` | This document — context, sources, content and visual foundations, iconography, index |
| `SKILL.md` | Agent-skill front matter, so this folder works as a portable Claude skill |
| `styles.css` | The only stylesheet consumers link; nothing but `@import` lines |
| `thumbnail.html` | Homepage tile for the design system |

**`tokens/`** — `fonts.css` (four `@font-face` rules), `colors.css`, `typography.css`,
`spacing.css`, `radius.css`, `elevation.css`, `motion.css`, `base.css` (reset + bidi defaults).

**`assets/`** — `logo-green|white|dark.png`, `icon-green|white|dark.png`, `favicon.png`,
`apple-touch-icon.png`, `fonts/IBMPlexSansArabic-{Regular,Medium,SemiBold,Bold}.ttf`, and the
brand stills `cover.png`, `city.png`, `corridor.png`, `stairs.png`, `puzzle.png`,
`folder.png`, `signage.png`.

**`components/`** — 16 components in three groups:

- `core/` — **Button**, **Card**, **Divider**, **Eyebrow**, **Logo**, **SectionNumber**
- `content/` — **CheckList**, **DeliverableCard**, **PartnerChip**, **ServiceCard**,
  **StatBlock**, **StepCard**, **ValueRow**
- `navigation/` — **LangToggle**, **NavLink**, **SectionHeader**

Each has a `.jsx` implementation, a `.d.ts` props contract and a `.prompt.md` usage note;
each directory has one `*.card.html` specimen.

**`guidelines/`** — 23 specimen cards feeding the Design System tab, grouped **Colors**
(green, teal, paper, surfaces, text on paper, text on teal, status, scrims), **Type**
(display, headings, body, labels, Arabic, weights), **Spacing** (space scale, section rhythm,
radii, elevation, motion) and **Brand** (logo lockups, mark, photography, card anatomy).

**`ui_kits/`**

- `website/` — the bilingual estratijiya.com recreation (`index.html`, `copy.js`,
  `SectionsTop.jsx`, `SectionsBottom.jsx`, `App.jsx`, `README.md`).
- `deck/` — the 11-slide company-profile template, one 1280×720 HTML per slide type
  (`01-title` … `11-contact`) plus `slides.css`.

**`scraps/`** — working files: extracted profile text, the PDF render harness. Not part of
the system.

## Caveats

- The **live site's stylesheet was never readable**, so the website kit is a faithful
  reconstruction of structure, copy and brand language — not a pixel-measured clone.
- Brand photography here is **re-rendered from the PDF at ~924px wide**. Fine for mockups,
  too small for production or print. Ask the brand for the original JPGs
  (`/assets/brand-photos/*.jpg` on the live site).
- No Latin display font was supplied. IBM Plex Sans Arabic carries Latin too, and the
  wordmark is an asset, so nothing is missing — but if the brand uses a separate Latin
  headline face on the web, it isn't captured here.
- Eastern-Arabic numerals in the deck are transcribed by hand from the PDF; check them.
