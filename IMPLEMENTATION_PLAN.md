# Implementation Plan — Retrospective

A short record of how the site got to its current state, the decisions behind it, and what
remains. This is history + status, not a spec.

---

## Phases executed

1. **Frontend port.** The approved "INTELLIGENCE, DESIGNED." design was ported into the
   Next.js 15 App Router as typed React server components. Content was extracted into
   `data/*.ts` (site, projects, research, capabilities, timeline) so copy is editable without
   touching markup. Design tokens moved into `app/globals.css` `@theme` (Tailwind v4).

2. **3D removal.** An earlier build carried a Three.js "Identity Engine". It was removed
   entirely — the hero became an editorial portrait composition (CSS mask + deep-red field),
   and motion was reduced to a lightweight `ScrollReveal` island plus `motion` on `/work`.
   No route depends on WebGL. *(One stale code comment in `app/page.tsx` still names the
   Identity Engine; harmless, safe to delete.)*

3. **Pages.** Built the full route set: home (9 sections), `/work` (server masthead + client
   filter + creative archive), `/work/[slug]` case studies (SSG via `generateStaticParams`),
   `/research`, `/about`, and a custom 404. Case-study visuals were rendered as designed CSS
   schematics rather than waiting on screenshots.

4. **Contact backend.** Added a real `POST /api/contact`: shared Zod schema
   (`lib/contact/schema.ts`), honeypot + min-fill-time + per-IP rate limiting, and a
   provider abstraction (`dev` / `resend` / `smtp`) behind one interface. Env validation
   (`lib/env.ts`) fails fast per selected provider without leaking values.

5. **SEO & metadata.** Per-route `metadata`, a title template, a generated social image
   (`app/opengraph-image.tsx` via `next/og`, wired to `og:image`/`twitter:image`), generated
   `sitemap.xml` / `robots.txt`, and Person + WebSite JSON-LD.

6. **Tests.** Vitest unit suites (`tests/unit/` — contact schema, rate limiter, project data,
   sitemap/robots; `vitest.config.ts`, node env) and Playwright e2e suites (`tests/e2e/` —
   smoke, nav, pages, work, contact) that run against a production build on port 3210 across
   desktop + mobile viewports. Not executed in the docs pass; run before deploy.

7. **Docs.** This documentation set (README + the handoff/asset/content/env/deploy docs).

---

## Key decisions

| Decision | Why |
| --- | --- |
| Server components + 4 client islands | Minimize shipped JS; keep content on the server. |
| Content in `data/*.ts`, not MDX (yet) | Typed, render-ready, editable without build tooling. A `TODO` notes a possible future move of long case-study bodies to MDX. |
| Designed CSS schematics instead of screenshots | Nothing looks empty pre-assets; real screenshots are a drop-in later. |
| `[ ... ]` placeholder convention | Enforces "verified content only" — no invented metrics/DOIs/dates. |
| Spam checks return *fake* success | Bots get no signal (no 400 that reveals the honeypot/timing trap). |
| Provider abstraction with `dev` default | Zero-config local dev; swap to Resend via env only. |
| In-memory rate limiter behind an interface | Right for one server; upgradeable to a shared store without route changes. |
| Removed 3D | Performance, simplicity, accessibility; the design didn't need it. |

---

## What remains

**Owner-supplied (content / assets / env):**
- Fill placeholders — publication DOI + URL, project years, LinkedIn/GitHub/YouTube,
  hackathon name/date, institution + dates (`CONTENT_GAPS.md`).
- Real project screenshots (optional) → `public/placeholders/` (`ASSET_REQUIREMENTS.md`).
- Production origin (`NEXT_PUBLIC_SITE_URL` + `data/site.ts` `url`) and an email provider.

**Engineering (open):**
- Favicon / app icons / web manifest (none yet). Remove the now-stale `openGraph.images` TODO
  in `layout.tsx` (the OG route already covers it).
- Security headers in `next.config.mjs` (CSP, Referrer-Policy, X-Frame-Options,
  Permissions-Policy).
- Run `npm test` / `npm run test:e2e` in CI and confirm green.
- Implement the SMTP provider (`nodemailer`) if SMTP is needed — currently a stub.
- Remove unused `gsap` / `@gsap/react` deps.

**Optional:**
- Analytics (e.g. Vercel Web Analytics).
- Store-backed rate limiter (Upstash/KV) for serverless.
- Convert portraits to `next/image` for LCP/CLS.
