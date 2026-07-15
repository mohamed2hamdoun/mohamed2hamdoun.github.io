# Frontend Audit

A short audit of the delivered frontend: what's solid on accessibility and performance, and
the known rough edges. Grounded in the code as built.

---

## Accessibility

| Measure | State | Where |
| --- | --- | --- |
| Landmarks | Good | `<header>`/`<nav aria-label="Primary">`, `<main id="main">`, `<footer>`; sections use `aria-label`/`aria-labelledby`. |
| Skip link | Good | First focusable element in `<body>` jumps to `#main` (`layout.tsx`); slides into view on focus. |
| Focus visibility | Good | Global `:focus-visible` outline in signal red (`globals.css`). |
| Mobile menu | Strong | `role="dialog"`, `aria-modal`, scroll lock, focus moves in on open, **focus trap** on Tab/Shift+Tab, Esc closes, focus restored to the opener on close (`Nav.tsx`). |
| Current-page state | Good | `aria-current="page"` on active nav links; `aria-pressed` on `/work` filter buttons. |
| Reduced motion | Strong | JS + CSS `@media` disable reveals/parallax; `motion` uses `useReducedMotion()`; no-JS `<noscript>` fallback. |
| Form a11y | Good | Labeled inputs, `aria-invalid` + `aria-describedby` on errors, `role="alert"` on messages, `role="status" aria-live="polite"` on success, `aria-live` count on `/work`. |
| Touch targets | Good | `min-h-11`/`min-h-12` (≥44px) on controls. |
| Live region for filter | Good | "SHOWING x / y" is `aria-live="polite"`. |

**Gaps / to check**
- **Hero portrait uses `alt=""`** (decorative — the name is the `<h1>`). Defensible, but
  confirm that's the intent. The About and preview portraits do have descriptive `alt`.
- **Color contrast:** `muted` (#918B82) and especially `faint` (#59554E) on ink are used for
  small mono text; verify against WCAG AA for the smallest sizes (some 9–10px labels are
  borderline decorative).
- **Select control** on the contact form uses `appearance: none` with no custom caret — still
  keyboard-operable, but visually plain.

---

## Performance

| Note | Detail |
| --- | --- |
| Three.js removed | No WebGL/3D bundle. The heaviest former dependency is gone. |
| Server-first | Pages and most sections are RSC; only `Nav`, `ScrollReveal`, `ContactSection`, `WorkIndex` ship JS. |
| Per-route JS | `/work` is the heaviest route — it's the only one that imports the `motion` library (list animation). Other routes stay light. |
| Fonts | `next/font/google`, self-hosted, `display: swap` — no runtime font request, minimal CLS from fonts. |
| Case studies | Statically generated (SSG) — fast, cacheable. |
| Images | AVIF/WebP formats enabled in `next.config.mjs`. |

**Performance rough edges**
- **Portraits use `<img>`** (not `next/image`) **with no `width`/`height`** — potential CLS and
  an unoptimized ~1.8 MB PNG hero (LCP element). Recommend `next/image` or at least intrinsic
  dimensions + a WebP re-export.
- **Unused dependencies:** `gsap` and `@gsap/react` are in `package.json` but imported nowhere
  — dead weight in the dependency tree (not shipped to the client unless imported, but worth
  removing).
- **CreativeArchive marquee** (`reel`, 46s infinite) runs continuously; it's paused under
  reduced motion via the global CSS rule, which is correct.

---

## Known rough edges (non-blocking)

- Stale comment in `app/page.tsx` references an "Identity Engine canvas" island that no longer
  exists (removed with the 3D layer). `layout.tsx` similarly carries a stale `openGraph.images`
  TODO that the `app/opengraph-image.tsx` route already satisfies.
- No favicon or web manifest yet (a social OG image *is* generated in code).
- No security headers yet (`next.config.mjs` TODO).
- SMTP email provider is a stub (`dev` and `resend` work).
- In-memory rate limiter is per-instance on serverless.

None of these affect correctness of the delivered pages; they are polish, hardening, and
owner-content items tracked in `PRODUCTION_CHECKLIST.md`.
