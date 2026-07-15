# Asset Requirements

Every image slot the site references, with the spec for a drop-in replacement. Current state
of each is in `ASSET_STATUS.md`; how to swap them is in `CONTENT_GUIDE.md`.

Two things to know first:

1. **Portraits are real image files** in `public/`.
2. **Project "screenshots" are not images yet.** The case-study and home visuals are
   code-drawn CSS schematics. The `image` field on each project in `data/projects.ts` is a
   *key* (e.g. `hermes-system`), not a file path — it maps to a future
   `public/placeholders/<key>.webp` (per the comment in `data/projects.ts`). Adding those
   files is optional polish; the site is complete without them.

---

## Portraits (present)

| Slot | File | Where used | Dimensions | Format | Crop / orientation | Transparency | Mobile alternative |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Hero portrait | `public/portrait.png` | Home hero (`components/home/Hero.tsx`) — tinted into the deep-red field, soft radial mask + contrast/saturate | ~1000×1400 (portrait/vertical), taller than wide | PNG or WebP | Head-and-shoulders, centered; the mask fades edges so no pre-cut needed | No (mask handles the fade) | Same file; recomposes to a centered ~72vw block |
| B&W portrait | `public/portrait-bw.png` | About page + home About preview — grayscale + slight contrast | ~1000×1400, same crop as hero | PNG or WebP | Same crop, desaturated | No | Same file |

Keep both roughly the same vertical shape so layouts stay balanced. Target < ~500 KB each if
re-exporting (current PNGs are larger). A plain studio shot works — the hero applies the oval
fade and contrast automatically.

---

## Project screenshots (optional — currently code schematics)

If/when real screenshots are exported, drop them at the path below and wire them in per
`data/projects.ts`. Until then the designed schematics render and are labelled as placeholders.

| Slot key | File (target) | Project / where | Suggested size | Format | Crop | Transparency | Mobile alternative |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `housing-agent-dashboard` | `public/placeholders/housing-agent-dashboard.webp` | Agentic Housing Arrears — home mockup #01 + case study | 1600×1000 (16:10) | WebP/AVIF | Landscape dashboard; keep decision panel legible | No | Same, scales down |
| `diabetes-research-chart` | `public/placeholders/diabetes-research-chart.webp` | Early Diabetes Prediction — home mockup #02 + `/research` figures | 1600×1000 (16:10) | WebP/AVIF | The published density/feature chart | No | Same |
| `hermes-system` | `public/placeholders/hermes-system.webp` | Hermes — home module grid #03 + case study | 1600×1000 (16:10) | WebP/AVIF | System/module view; readable module labels | No | Same |
| `book-vault` | `public/placeholders/book-vault.webp` | Book Vault — home flow #04 + case study | 1600×1000 (16:10) | WebP/AVIF | Obsidian vault with diagram + citation visible | No | Same |

`next.config.mjs` already serves `image/avif` and `image/webp`. Keep each file under ~500 KB.

---

## Social / Open Graph image (present — generated in code)

| Slot | Source | Where used | Dimensions | Format | Notes |
| --- | --- | --- | --- | --- | --- |
| OG / Twitter card | `app/opengraph-image.tsx` (`next/og` `ImageResponse`, edge runtime) | Link previews (Slack, X, LinkedIn, iMessage) | **1200×630** | PNG (rendered) | Already implemented: ink background, paper/signal type, name + roles + "INTELLIGENCE, DESIGNED." Next's file convention wires the `og:image` / `twitter:image` tags automatically for all routes. To change the artwork, edit that file (it's JSX, not an image). The `openGraph.images` TODO in `layout.tsx` is stale — not needed with the route. |

## Favicon / icons / manifest (missing)

No favicon, app icons, or web manifest exist. When ready, add `app/icon.png` (and optionally
`app/apple-icon.png`) so Next generates the tags. `layout.tsx` notes this TODO.
