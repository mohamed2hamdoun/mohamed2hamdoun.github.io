# Deployment

Target platform: **Vercel**. The app is a standard Next.js 15 App Router project — no custom
server, no special build step.

---

## Commands

| Step | Command |
| --- | --- |
| Install | `npm install` |
| Dev | `npm run dev` |
| Build | `npm run build` |
| Start (self-host) | `npm run start` |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Unit tests | `npm test` (Vitest — `tests/unit/`) |
| E2E tests | `npm run test:e2e` (Playwright — builds + serves on :3210, `tests/e2e/`) |

On Vercel the build command is `next build` and output is auto-detected. Case-study routes are
statically generated (`generateStaticParams`).

---

## 1. Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (see `ENVIRONMENT.md` for
the full table). At minimum for production:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your real origin, e.g. `https://mohamedhamdoun.com` |
| `EMAIL_PROVIDER` | `resend` (recommended) |
| `RESEND_API_KEY` | From Resend |
| `CONTACT_TO_EMAIL` | Where enquiries should land |
| `CONTACT_FROM_EMAIL` | A verified sender on your domain |

Also update `url` in `data/site.ts` to the same origin (it drives `metadataBase`/OG URLs).

---

## 2. Choose & configure an email provider

The default `dev` provider does **not** send email — it only writes to `./.dev-inbox/`. Pick a
real provider for production.

### Resend (recommended quickstart)

1. Create a Resend account and API key.
2. Verify your sending domain in Resend (so `CONTACT_FROM_EMAIL` can use it). For a first test
   you may use `onboarding@resend.dev` as the from address.
3. Set `EMAIL_PROVIDER=resend`, `RESEND_API_KEY=…`, `CONTACT_FROM_EMAIL=…`,
   `CONTACT_TO_EMAIL=…`.
4. Deploy and submit the contact form once to confirm delivery.

The integration is dependency-free (`fetch` to `https://api.resend.com/emails` with a Bearer
key) and sets `reply_to` to the sender's email so you can reply directly.

### SMTP (note)

`EMAIL_PROVIDER=smtp` is a **stub**. `lib/contact/provider.ts` validates `SMTP_HOST` /
`SMTP_USER` / `SMTP_PASSWORD` but returns "not implemented" — to enable it, add `nodemailer`
to dependencies and complete the `sendMail` call marked with a `TODO` in that file. Until then,
use `resend`.

---

## 3. Rate limiting (serverless caveat)

The limiter (`lib/contact/rate-limit.ts`) is an **in-memory fixed-window** limiter. On Vercel's
serverless runtime each instance has its own memory, so the effective limit is per-instance,
not global — acceptable as a light abuse guard, but not a hard cap. For a shared, reliable
limit, implement a store-backed limiter (Upstash Redis / Vercel KV) behind the existing
`RateLimiter` interface; the route code doesn't change (there's a `TODO` for `UpstashLimiter`).
Tune `CONTACT_RATE_LIMIT_MAX` / `CONTACT_RATE_LIMIT_WINDOW` regardless.

---

## 4. Domain setup

1. Add your domain in **Vercel → Settings → Domains** and follow the DNS instructions.
2. Set `NEXT_PUBLIC_SITE_URL` and `data/site.ts` `url` to the final `https://` origin.
3. Redeploy so `sitemap.xml`, `robots.txt`, canonical URLs, and JSON-LD emit the real origin.
4. If using Resend, verify the same domain there for `CONTACT_FROM_EMAIL`.

---

## 5. Analytics (optional)

None is installed. If you want it, Vercel Web Analytics / Speed Insights is the least-effort
option (add `@vercel/analytics` and mount its component in `app/layout.tsx`). Whatever you
add, remember the `next.config.mjs` security-headers TODO — a CSP would need to allow the
analytics origin.

---

## 6. Post-deployment verification

- [ ] Every route loads and **survives a hard refresh**: `/`, `/work`, `/work/agentic-housing`
      (and the other three slugs), `/research`, `/about`, plus a random 404.
- [ ] `/{origin}/sitemap.xml` and `/{origin}/robots.txt` render with the **production** origin.
- [ ] View source: canonical/OG/Twitter tags and JSON-LD use the production origin.
- [ ] Submit the contact form → confirm the email arrives (check `CONTACT_TO_EMAIL`).
- [ ] Submit twice quickly / rapidly repeat → confirm rate-limit / spam handling behaves.
- [ ] Mobile: open the menu, tab through it, close with Esc.
- [ ] `prefers-reduced-motion` on: content is fully visible, no reveal/parallax motion.
- [ ] No console errors on any route.
- [ ] No secrets in the client bundle or the repo.

Full go-live gate: `PRODUCTION_CHECKLIST.md`.
