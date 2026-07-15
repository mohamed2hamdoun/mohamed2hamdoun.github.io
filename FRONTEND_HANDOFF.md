# Frontend Architecture Reference

The backend (contact API, env validation, SEO generation) is done. This document is the
reference for the **frontend**: structure, tokens, responsive rules, and the animation
system. It reflects the code as built.

Design north star: **INTELLIGENCE, DESIGNED.** — one restrained editorial system. Do not
introduce cyan/purple/neon, glassmorphism, or a second visual language.

---

## 1. Project structure

- **Server components by default.** Pages and section components render on the server.
- **Four client islands only** (`'use client'`): `Nav`, `ScrollReveal`, `home/ContactSection`,
  `work/WorkIndex`. This keeps per-route JS small; everything else ships zero JS.
- **Content is data-driven** — sections read typed data from `data/*.ts`. Markup rarely
  hard-codes copy (a few home mockups inline their own labels for fidelity; see §6).

```
components/
  Nav.tsx            client — fixed header, desktop links, mobile full-screen menu (focus-trapped)
  Footer.tsx         server — global footer (rendered once in layout)
  ScrollReveal.tsx   client — the single motion island (reveal + parallax + underline)
  JsonLd.tsx         server — Person + WebSite structured data
  home/*             Hero, SelectedWork, Statement, Capabilities, Process,
                     ResearchPreview, AboutPreview, CreativeArchive, ContactSection(client)
  work/WorkIndex.tsx client — category filter + animated list (motion/react)
  case-study/*       Section, CaseStudyHero, MetaBar, ArchitectureDiagram, DecisionList,
                     ModuleGrid, SpecList, ResultBlock, StatusBadge, Bracketed, NextProject
  research/*         PublicationRow, SchematicFigure
  about/*            Timeline, SkillGroups
```

---

## 2. Design tokens & fonts

Tokens live in `app/globals.css` under `@theme` (Tailwind v4). They are the single source of
truth — reference them via Tailwind utilities (`bg-ink`, `text-signal`) or
`var(--color-*)`.

| Token | Value | Role |
| --- | --- | --- |
| `--color-ink` | `#080808` | Primary background |
| `--color-paper` | `#F1E9DA` | Primary text / inverted sections |
| `--color-signal` | `#E5242A` | Accent (single strong red) |
| `--color-deep-red` | `#25090B` | Portrait field / depth |
| `--color-muted` | `#918B82` | Secondary text |
| `--color-ink-2` / `--color-ink-3` | `#0D0D0D` / `#111111` | Derived surfaces |
| `--color-faint` | `#59554E` | Dim mono placeholder text on ink |
| `--color-paper-ink` | `#3A362F` | Body text on paper sections |
| `--color-line-paper` | `rgba(241,233,218,.14)` | Hairline on ink |
| `--color-line-ink` | `rgba(8,8,8,.2)` | Hairline on paper |

**Fonts** (bound to next/font CSS variables in `app/layout.tsx`, all `display: swap`):

| Family | Var / utility | Use |
| --- | --- | --- |
| Anton | `--font-display` / `font-display` | Oversized headlines |
| Instrument Sans | `--font-body` / `font-body` | Body copy |
| Instrument Serif | `--font-serif` / `font-serif` | Italic leads / accents |
| IBM Plex Mono | `--font-mono` / `font-mono` | Labels, metadata, technical text |

Each has a system fallback so a failed font load never breaks the layout.

---

## 3. Responsive rules

- **Mobile-first Tailwind.** The primary breakpoint is `md:` (768px): mobile stacks
  vertically, desktop switches to overlapping/multi-column editorial layouts. Hero, About
  hero, and SelectedWork all recompose at `md:`. `lg:` (1024px) is used in `WorkIndex` (filter
  toolbar row) and the project-row grid.
- **Fluid everything.** Type and spacing use `clamp()` throughout (e.g.
  `clamp(52px,11vw,168px)` headlines, `clamp(16px,3vw,40px)` gutters). Layouts use
  `flex-wrap` + `flex-[1_1_…]` + `minmax()` grids rather than fixed breakpoints.
- **1920px cap (large screens).** In `globals.css`, `body { max-width: 1920px; margin-inline:
  auto }` and `html { background: var(--color-ink) }` fill the gutters — so 2560px+ monitors
  get symmetric ink margins instead of stretched, sparse sections. The fixed header re-applies
  the same cap via the `.frame-cap` class so its content stays aligned to the body frame.
- **Fixed nav offset.** Header is `h-14` (56px). `html { scroll-padding-top: 72px }` and
  per-section top padding (e.g. `pt-14`, `scroll-mt-[72px]`) keep anchored content clear of it.
- **Touch targets.** Interactive controls use `min-h-11`/`min-h-12` (≥44px).

---

## 4. Animation system

Two mechanisms, both reduced-motion aware.

### a) `ScrollReveal` island (`components/ScrollReveal.tsx`)

One tiny client effect drives every animated element on the page, so section markup stays in
server components. It re-runs on route change (`usePathname` dep) because the root layout does
not remount during SPA navigation.

| Hook | Attribute | Behavior |
| --- | --- | --- |
| Reveal | `data-reveal` | Fade + `translateY(26px)` → visible when it enters the viewport (IntersectionObserver, threshold `0.12`). CSS transition defined in `globals.css`; JS just toggles `.is-visible`. |
| Underline | `data-underline` | A child of a revealed element; its `width` sweeps to `100%` ~350ms after the parent reveals (statement section). |
| Parallax | `data-parallax="0.12"` | On scroll, `translate3d(0, -scrollY*factor, 0)` via `requestAnimationFrame`. The factor is read from the attribute value. |

**Reduced motion / no-JS:**
- If `prefers-reduced-motion: reduce`, all reveals are made visible immediately and parallax
  is skipped (JS check + a CSS `@media` block that forces `data-reveal` visible).
- A `<noscript>` block in `layout.tsx` `<head>` forces `[data-reveal]{opacity:1}` and
  `[data-underline]{width:100%}` so content is fully visible without JavaScript.
- A `requestAnimationFrame` safety pass reveals anything already in view right after
  mount/navigation, so above-the-fold content never stays hidden.

### b) `motion` package (`motion/react`)

Used in exactly one place: **`components/work/WorkIndex.tsx`**, for the filtered project list
(`AnimatePresence` + `motion.ul`/`motion.li` layout crossfade). It calls `useReducedMotion()`
and disables layout animation + enter/exit transitions when reduced motion is requested. This
is why `/work` carries the motion library and other routes do not.

### c) CSS keyframes (`globals.css`)

- `ie-blink` — the "available" status dot (`.animate-blink`).
- `reel` — the Creative Archive marquee (`.animate-reel`, 46s linear loop).

---

## 5. Route intentions

| Route | Intent |
| --- | --- |
| `/` | Narrative landing: who → work → philosophy → capabilities → process → research/about hooks → creative archive → contact. |
| `/work` | Filterable index of the four flagship projects + a deliberately secondary creative archive. |
| `/work/[slug]` | Full case study: hero, summary, context, challenge, constraints, architecture, decisions, domain block (modules/components/methods/features), results, limitations, lessons, next project. SSG. |
| `/research` | Publication-led record, methodology, figure register (placeholders), interests, principles. |
| `/about` | First-person bio, timeline, education/research facts, skills by discipline, working principles. |

---

## 6. Mock vs. real data

- **Real, typed content** comes from `data/*.ts` (identity, projects, research, capabilities,
  timeline). The About bio paragraph is the one piece of prose kept in a page file
  (`app/about/page.tsx`).
- **Designed schematics, not images.** The home `SelectedWork` mockups and the case-study
  visuals (architecture diagrams, density-bar chart, Hermes module grid, book-vault flow) are
  CSS/`div` compositions rendered in code — there are **no screenshot image files**. Slots are
  labelled in-place (e.g. `[ CHART PLACEHOLDER — PUBLISHED FIGURES PENDING ]`). See
  `ASSET_REQUIREMENTS.md` for where real screenshots will eventually go.
- **Placeholders are intentional.** Any `[ ... ]` string is unverified content styled dim.
  Never replace with a guess. Catalogue: `CONTENT_GAPS.md`.

---

## 7. Contact form behavior (now real)

`home/ContactSection.tsx` is a client state machine (`idle | loading | success | error`):

- Client-side validation (name, email regex, message ≥10 chars) before submit.
- On submit, `POST /api/contact` with a hidden `website` honeypot and a `startedAt` timestamp
  (stamped on mount) for the server's min-fill-time check.
- Maps server responses back to the UI: `429` → "too many messages"; `400` + `fieldErrors` →
  highlights the offending fields; other failures → a generic message with a mailto fallback.
- Honeypot input is off-screen (`srOnly`, `aria-hidden`, `tabIndex={-1}`).
- Success state offers "SEND ANOTHER"; a mailto link is always shown as a fallback.

Full server pipeline is in `README.md` / `DEPLOYMENT.md`.

---

## 8. Components that may need future optimization

- **`home/ContactSection.tsx`** — large single client component with substantial inline
  styles; a candidate for extraction/splitting if it grows.
- **`home/SelectedWork.tsx`** — long, bespoke per-project markup (verbatim from the approved
  design). Fine as-is, but heavy to edit; real screenshots would simplify it.
- **Portraits use `<img>`, not `next/image`** (with `@next/next/no-img-element` disabled
  inline). Deliberate — the hero relies on CSS mask/filter — but converting to `next/image`
  (or at least adding `width`/`height`) would improve LCP and avoid CLS. See `FRONTEND_AUDIT.md`.

---

## 9. Testing

- **Unit** (`tests/unit/`, Vitest, node env): pure logic — contact schema, rate limiter,
  project data, sitemap/robots. Config: `vitest.config.ts` (aliases `@/*` to the root).
- **E2E** (`tests/e2e/`, Playwright): runs against a production build on port 3210, across a
  chromium desktop and a mobile (390px) viewport that trips the `md` breakpoint for the menu.
  Config: `playwright.config.ts`.

## 10. Unfinished / notes

- Stale comment in `app/page.tsx` still references an "Identity Engine canvas" client island —
  that component was removed with the 3D layer and does not exist. Harmless; worth deleting.
- `gsap` / `@gsap/react` are installed but unused.
- A social OG image is generated (`app/opengraph-image.tsx`); no favicon or web manifest yet.
  `layout.tsx` still carries a now-stale TODO about adding `openGraph.images` (unnecessary —
  the file-based route wires it automatically).
