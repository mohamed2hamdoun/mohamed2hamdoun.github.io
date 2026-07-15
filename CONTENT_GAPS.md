# Content Gaps

Every unverified / placeholder value in the site, grouped by file, with what's needed to fill
it. Rule: **never replace a placeholder with a guess** — only with a real, verified value
(see `CONTENT_GUIDE.md` §3). Removing the brackets is what publishes a value, so only do it
once it's true.

Placeholders are the literal `[ ... ]` strings below.

---

## `data/site.ts`

| Field | Current placeholder | Needed to fill |
| --- | --- | --- |
| `socials` → LinkedIn | `value: '[ AWAITING VERIFIED URL ]'`, `href: null`, `verified: false` | Real LinkedIn URL → set `value`, `href`, `verified: true`. Unlinked entries render dim and non-clickable. |
| `socials` → GitHub | `[ AWAITING VERIFIED URL ]` | Real GitHub URL → same as above. |
| `socials` → YouTube | `[ AWAITING VERIFIED URL ]` | Real YouTube channel URL → same as above. |
| `site.url` | `'https://mohamedhamdoun.com'` (TODO to confirm) | Confirm the real production origin before launch — used for `metadataBase`, canonical/OG URLs, and as the sitemap/robots fallback. Keep in sync with `NEXT_PUBLIC_SITE_URL`. |

Once the three social URLs are verified, also add `sameAs: [linkedin, github, youtube]` to the
Person node in `components/JsonLd.tsx` (TODO noted there).

---

## `data/projects.ts`

| Project | Field | Current placeholder | Needed to fill |
| --- | --- | --- | --- |
| `agentic-housing` | `year` | `'[YEAR TBC]'` | The project/hackathon year. |
| `agentic-housing` | `caseStudy.results` | `…[DEMO METRICS AWAITING VERIFICATION — do not publish timing claims until measured.]` | Measured timing/throughput figures, *only if measured*. Do not invent. |
| `diabetes-research` | `year` | `'[YEAR TBC]'` | Publication year. |
| `diabetes-research` | `caseStudy.results` | `[EXPERIMENTAL FIGURES AWAITING AUTHOR-SUPPLIED VALUES — chart placeholders must be replaced with the published figures. Do not invent metric values.]` | The published accuracy/AUC/etc. figures from the paper. |
| `hermes` | `year` | `'ONGOING'` | Leave as-is until a completion year applies (not a bracket placeholder). |
| `book-vault` | `year` | `'ONGOING'` | Same as Hermes. |
| `book-vault` | `caseStudy.results` | `…[SAMPLE VAULT SCREENSHOTS AWAITING EXPORT — placeholders shown.]` | Exported sample-vault screenshots (see `ASSET_REQUIREMENTS.md`). |
| All four | `image` | key only (no file) | Optional real screenshots at `public/placeholders/<key>.webp`. |

### Creative archive (`data/projects.ts` → `archive`)

| Item | Placeholder note | Needed |
| --- | --- | --- |
| Short-form film edit | `[CLIP AWAITING EXPORT]` | Exported clip / still. |
| Motion graphics package | `[REEL AWAITING EXPORT]` | Motion reel export. |
| YouTube production | `[THUMBNAILS AWAITING SELECTION]` | Selected thumbnails. |
| Interface experiment | `[SCREEN RECORDING NEEDED]` | Screen recording / capture. |
| 3D / WebGL study | `[RENDER NEEDED]` | A render still. |
| Cinematic color study | `[STILLS AWAITING GRADE]` | Graded stills. |

---

## `data/research.ts`

| Field | Current placeholder | Needed to fill |
| --- | --- | --- |
| `publications[0].doi` | `'[DOI AWAITING VERIFICATION]'` | The paper's real DOI string. |
| `publications[0].link` | `null` | A verified paper URL → the "Read Paper" button appears automatically when non-null. |

Verified as stated: title, journal (`Algorithms`), status (`PUBLISHED`), methods. Do **not**
add citation counts, impact factor, accuracy, or AUC unless sourced from the paper.

---

## `app/about/page.tsx` (in-page facts)

| Field | Current placeholder | Needed to fill |
| --- | --- | --- |
| Education → Institution | `[ INSTITUTION — TBC ]` | The university/college name. |
| Education → Dates | `[ DATES — TBC ]` | Enrollment dates. |
| Research → DOI / Link | `DOI — [ AWAITING VERIFICATION ] · LINK — [ PENDING ]` | Same DOI/URL as `data/research.ts`; update both. |

---

## `app/research/page.tsx`

| Field | Current placeholder | Needed to fill |
| --- | --- | --- |
| Figure & table register STATUS column | `[ PENDING ]` (all rows) | The published figures/tables (FIG.01–03, TBL.01), once verified against the paper. |

---

## Cross-cutting / metrics

- **Hackathon identity.** `agentic-housing.status` = `AWARDED — TOP 3, CHALLENGE CATEGORY`
  and the home metric = `TOP 3 · HACKATHON CHALLENGE CATEGORY`, but the **hackathon name and
  date** are not stated anywhere. Add them (project `year`, and optionally the event name in
  the case-study context) when confirmed.
- **Hero metrics** (`data/site.ts` → `metrics`) are all verified claims (1 paper, top-3
  hackathon, 4+ years creative). Keep only true values.
