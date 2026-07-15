# Asset Status

Current state of every visual asset. Specs for replacements are in `ASSET_REQUIREMENTS.md`.

Legend: **PRESENT** = real file shipped · **PLACEHOLDER** = renders as a code-drawn schematic
(no image file, labelled as pending) · **MISSING** = referenced/expected but absent.

| Asset | Path | Status | Notes |
| --- | --- | --- | --- |
| Hero portrait | `public/portrait.png` | **PRESENT** | ~1.8 MB PNG. Rendered with radial mask + contrast/saturate in the home hero. Consider re-exporting to WebP < 500 KB. |
| B&W portrait | `public/portrait-bw.png` | **PRESENT** | ~0.8 MB PNG. Used on `/about` and the home About preview (grayscale). |
| Housing agent dashboard | `public/placeholders/housing-agent-dashboard.webp` | **PLACEHOLDER** | Rendered as a CSS decision-dashboard schematic in `SelectedWork` + the case study. No image file. |
| Diabetes research chart | `public/placeholders/diabetes-research-chart.webp` | **PLACEHOLDER** | Rendered as a CSS density-bar chart; `/research` shows a figure register with `[ PENDING ]` rows. No image file. |
| Hermes system | `public/placeholders/hermes-system.webp` | **PLACEHOLDER** | Rendered as the CSS module grid (implemented/experimental/planned). No image file. |
| Book vault | `public/placeholders/book-vault.webp` | **PLACEHOLDER** | Rendered as a CSS book→vault flow diagram. No image file. |
| Creative archive frames | — | **PLACEHOLDER** | Home marquee + `/work` contact sheet use hatched CSS frames; notes read `[CLIP AWAITING EXPORT]`, etc. (`data/projects.ts` → `archive`). |
| OG / social image | `app/opengraph-image.tsx` | **PRESENT (generated)** | 1200×630, rendered by `next/og` in code (not a file). Auto-wired to `og:image`/`twitter:image` for all routes. Edit the JSX to change it. |
| Favicon / app icons / manifest | (none) | **MISSING** | No `app/icon.*`, apple icon, or manifest. |

## Notes

- **`public/placeholders/` exists but is empty.** That is expected — the placeholder visuals
  are drawn in code, not loaded from files.
- **Broken auto-cutout was discarded.** An earlier automated background-removal export
  (`portrait-cutout`) was a broken/failed export and was **not** copied into this repo. Do not
  reference it — the hero uses `portrait.png` with a CSS mask instead, so no cutout is needed.
