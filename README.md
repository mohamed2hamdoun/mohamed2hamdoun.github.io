# Mohamed Hamdoun — Portfolio

A production portfolio for an AI systems developer, applied-AI researcher, and creative
technologist. Editorial, single-brand ("INTELLIGENCE, DESIGNED.") design; content is
strictly verified-only, with explicit `[ ... ]` placeholders wherever a value is not yet
confirmed. Built with the Next.js App Router.

> **No 3D.** An earlier build carried a Three.js "Identity Engine". It was removed. The
> current site is HTML/CSS/SVG only — nothing here needs WebGL.

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js `15.5.4` (App Router, RSC) |
| UI runtime | React `19.1` |
| Language | TypeScript `5.7` (`strict: true`) |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`), tokens in `app/globals.css` `@theme` |
| Fonts | `next/font/google` — Anton, Instrument Sans, Instrument Serif, IBM Plex Mono (self-hosted) |
| Motion | `motion` (Framer Motion successor) — used only in `/work`; plus a custom `ScrollReveal` island |
| Validation | `zod` (contact schema + env validation) |
| Email | Provider abstraction: `dev` (default) / `resend` / `smtp` |
| Deploy target | Vercel |

> **Installed but unused:** `gsap` and `@gsap/react` remain in `package.json` from the
> removed animation layer and are not imported anywhere in `app/`, `components/`, or `lib/`.
> Safe to remove. See `FRONTEND_AUDIT.md`.

---

## Route map

| Route | Source | Rendering | Notes |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | Static (server) | Home — hero, selected work, statement, capabilities, process, research/about previews, creative archive, contact |
| `/work` | `app/work/page.tsx` | Static server + client filter island | Editorial index + creative-archive contact sheet |
| `/work/[slug]` | `app/work/[slug]/page.tsx` | **SSG** via `generateStaticParams` | One page per project |
| `/research` | `app/research/page.tsx` | Static | Publications, methodology, interests, principles |
| `/about` | `app/about/page.tsx` | Static | Bio, timeline, education/research, skills, principles |
| `/api/contact` | `app/api/contact/route.ts` | Dynamic, `runtime = 'nodejs'` | `POST` only |
| `/sitemap.xml` | `app/sitemap.ts` | Generated | Static routes + all project slugs |
| `/robots.txt` | `app/robots.ts` | Generated | Allows `/`, disallows `/api/` |
| `404` | `app/not-found.tsx` | Static | `noindex` |

**Case-study slugs:** `agentic-housing`, `diabetes-research`, `hermes`, `book-vault`.

Every route sets its own `metadata` (title/description); the root layout provides the title
template, Open Graph, Twitter card, and JSON-LD (`components/JsonLd.tsx`).

---

## Folder structure

```
app/
  layout.tsx            Root layout: fonts, metadata, Nav, Footer, ScrollReveal, JsonLd, skip link
  page.tsx              Home (composes components/home/*)
  globals.css           Design tokens (@theme), base styles, keyframes, reveal + reduced-motion CSS
  work/page.tsx         /work index (masthead + archive + <WorkIndex/>)
  work/[slug]/page.tsx  Case study (SSG)
  research/page.tsx     /research
  about/page.tsx        /about (holds the one long bio paragraph in-page)
  api/contact/route.ts  Contact endpoint
  opengraph-image.tsx   next/og social image (1200×630), applies to all routes
  sitemap.ts robots.ts not-found.tsx
components/
  Nav.tsx Footer.tsx ScrollReveal.tsx JsonLd.tsx   (globals)
  home/        9 home-page sections (Hero, SelectedWork, ContactSection, …)
  work/        WorkIndex (client filter/list)
  case-study/  Section, CaseStudyHero, ArchitectureDiagram, ModuleGrid, SpecList, …
  research/    PublicationRow, SchematicFigure
  about/       Timeline, SkillGroups
data/
  site.ts projects.ts research.ts capabilities.ts timeline.ts   (all typed content)
lib/
  env.ts                Zod env validation (getEnv / getContactEnv)
  contact/schema.ts     Shared client+server contact contract + honeypot/min-fill constants
  contact/rate-limit.ts In-memory fixed-window limiter + clientIp()
  contact/provider.ts   dev / resend / smtp email backends
public/
  portrait.png portrait-bw.png     (present)
  placeholders/                     (empty — see ASSET_STATUS.md)
tests/
  unit/                 Vitest logic tests (contact schema, rate-limit, projects, sitemap)
  e2e/                  Playwright specs (smoke, nav, pages, work, contact)
```

Only four components are client islands (`'use client'`): `Nav`, `ScrollReveal`,
`home/ContactSection`, `work/WorkIndex`. Everything else is a server component.

---

## Run it

Requires Node.js 18.18+ (Next 15 minimum); Node 20 LTS recommended.

```bash
npm install
cp .env.example .env.local     # dev works with the defaults as-is
npm run dev                    # http://localhost:3000
```

| Script | Command | Does |
| --- | --- | --- |
| `npm run dev` | `next dev` | Dev server |
| `npm run build` | `next build` | Production build (SSG for case studies) |
| `npm run start` | `next start` | Serve the build |
| `npm run lint` | `next lint` | ESLint (`eslint-config-next`) |
| `npm run typecheck` | `tsc --noEmit` | Strict type check |
| `npm test` | `vitest run` | Unit tests (`tests/unit/`) |
| `npm run test:watch` | `vitest` | Unit tests, watch mode |
| `npm run test:e2e` | `playwright test` | E2E against a production build (`tests/e2e/`) |

> **Testing:** Unit tests (Vitest, node env — `vitest.config.ts`) live in `tests/unit/` and
> cover pure logic: the contact schema, rate limiter, project data, and sitemap/robots. E2E
> tests (Playwright — `playwright.config.ts`) live in `tests/e2e/` and run against a real
> production build (`next build && next start`, port 3210) across a chromium desktop and a
> mobile viewport. Not executed as part of this docs pass — run `npm test` / `npm run test:e2e`
> before deploy.

---

## Editing content

All day-to-day content lives in `data/*.ts` and images in `public/` — you never touch
`components/` or `app/` for normal edits (the one exception: the About bio paragraph, which
lives in `app/about/page.tsx`). Full instructions, including the `[ ... ]` placeholder rule,
are in **`CONTENT_GUIDE.md`**. Outstanding placeholders are catalogued in **`CONTENT_GAPS.md`**.

---

## Contact backend (summary)

`POST /api/contact` is real and validated end to end:

- **Zod** validates the payload (`lib/contact/schema.ts`), shared with the client form.
- **Spam defenses:** hidden `website` honeypot + a minimum fill-time (2.5s) check — both
  return a *fake* success so bots learn nothing — plus a per-IP rate limit.
- **Provider abstraction** (`lib/contact/provider.ts`): `dev` (default, zero config — logs
  redacted metadata and writes the message to `./.dev-inbox/`), `resend` (REST API), or
  `smtp` (stub — needs `nodemailer`).

Full setup: **`ENVIRONMENT.md`** (variables) and **`DEPLOYMENT.md`** (choosing a provider).

---

## Environment

Copy `.env.example` → `.env.local`. Dev mode needs no configuration. Validation
(`lib/env.ts`) is lenient at boot and only enforces what the *selected* email provider
requires, failing fast with a clear developer message. Never commit secrets (`.env*.local`
is git-ignored). See **`ENVIRONMENT.md`**.

---

## Deployment

Target is **Vercel**. Set `NEXT_PUBLIC_SITE_URL` (and `data/site.ts` `url`) to the real
origin, pick an email provider, add its env vars, deploy. Full checklist in
**`DEPLOYMENT.md`**; go-live gate in **`PRODUCTION_CHECKLIST.md`**.

---

## Known limitations

- **Owner content pending** — publication DOI/URL, project years, social links, hackathon
  name/date, institution + dates. All are honest `[ ... ]` placeholders (`CONTENT_GAPS.md`).
- **Project screenshots** render as code-drawn schematics; `public/placeholders/` is empty
  (`ASSET_STATUS.md`, `ASSET_REQUIREMENTS.md`).
- **No favicon or web manifest** yet (a social OG image *is* generated by
  `app/opengraph-image.tsx`; `layout.tsx` still carries a stale TODO about it).
- **SMTP provider is a stub** — only `dev` and `resend` actually send.
- **Rate limiter is in-memory** — correct for one server; needs a shared store (Upstash/KV)
  for multi-instance serverless.
- **No security headers** yet — `next.config.mjs` has a TODO for CSP/Referrer-Policy/etc.
- `gsap` / `@gsap/react` are unused dependencies.
