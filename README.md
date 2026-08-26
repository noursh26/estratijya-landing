# Estratijiya — landing experience

A cinematic single-page site for Estratijiya, built strictly against the tokens in
`Estratijiya Design System/`. Deep teal grounds, cool paper, one mint accent, one
typeface.

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # tsc -b && vite build
pnpm preview
```

## Where things are

| Path | What |
| --- | --- |
| `src/styles/tokens.css` | Brand tokens, copied verbatim from the design system. **Change colours here, nowhere else.** |
| `src/content.ts` | Every word on the page, in one file |
| `src/lib/motion.ts` | Shared GSAP setup, the named `brand` ease, masked-line reveals, magnetic controls |
| `src/lib/useLenis.ts` | The single smooth-scroll engine, driven off the GSAP ticker |
| `src/components/` | One file per section |
| `src/components/fx/` | `DirectionField` — the pointer-reactive tick field behind the hero |
| `docs/video-prompts.md` | Production brief for the three films |
| `public/assets/units/` | Section photography (Unsplash — see `CREDITS.md`) |

## The page, in order

| # | Section | The motion |
| --- | --- | --- |
| — | Header | A wordmark and one word. No ground, no blur — it inverts to ink over paper |
| — | Preloader | Counted load, then a six-column curtain lifting in sequence |
| 01 | Hero | Three lines and a film. Masked reveal, pointer-reactive tick field, scrubbed sink |
| — | Marquee | Velocity-reactive band — speeds and skews with the scroll |
| 01 | Diagnosis | Five full-screen symptom panels; the photograph and the claim swap on scroll |
| 02 | Method | A deck. The stack waits on the right; each move is dealt left and blooms to full bleed |
| — | Statement | A framed clip expanding to full bleed while the claim assembles |
| 03 | What we build | The dial — seven divisions on an invisible wheel, hub off-screen left |
| 04 | The work | Vertical scroll drives a horizontal rail of picture-led cards |
| 05 | Principles | Line-by-line lighting, counter-running values band |
| 06 | Difference | Hairline rows; the hovered row floats its photograph beside the cursor |
| 07 | Invitation | A draggable dial of working sessions, with inertia and detents |
| 08 | Closing | Scrubbed parallax, magnetic CTA, footer |

## The deck (section 02)

`src/components/Method.tsx` splits the pinned range three ways. `LEAD` opens on
an empty stage and flies the deck in from the right. `plateau()` then remaps
scroll to deck position with a rest at every whole step — `HOLD` is the share of
each step spent settled, so the move itself happens in a short window and a
scroll cannot easily stop halfway through it. The card that arrives is not what
you read: `--merge` resolves away its corners, shadow and hairline as it reaches
the hand-off, and it cross-dissolves into a full-bleed frame whose edges are
masked out into the ground.

## The dial (section 03)

The wheel is never drawn. `src/components/BuildDial.tsx` places each division on
the circumference of an imaginary circle whose hub sits off the left edge, so only
the right half is ever on screen. A unit swings down from the top, reaches full
size at three o'clock while its copy writes itself in on the right, then shrinks
and drops away as the next one arrives.

Everything is driven by two constants at the top of the file:

```ts
const SWEEP = 58   // degrees from the active slot to the edge of visibility
const GAP   = 50   // angular distance between two consecutive divisions
```

plus `geometry()`, which returns the hub position, radius and disc size for a
given viewport. The disc is sized to overrun the stage on three sides; its rim is
a feathered radial mask rather than a crop, so none of that reads as cut. Scroll
snapping gives the dial detents, so one division always owns the centre of the
screen rather than resting between two.

## Motion rules

Copy is kept to the minimum a section can carry: the dial gives each division a
name and one line, the method gives each move one sentence, and the hero is three
lines and nothing else. Where a section needed weight it was given a photograph,
not a paragraph.

The design system asks for calm, short motion. This build keeps its *easing* —
`cubic-bezier(.16,1,.3,1)`, registered as the named GSAP ease `brand`; no bounce,
no overshoot, no spring anywhere — while extending the *choreography* to the scale
the brief called for. Everything respects `prefers-reduced-motion`: pins, scrubs,
canvases and the preloader all shut off, and the dial falls back to a plain stack.

## Replacing the films

Three stand-in clips are in `public/assets/video/`. They are deliberately held
back — see `docs/video-prompts.md` for the brief and the single CSS rule to delete
once the final films land.
