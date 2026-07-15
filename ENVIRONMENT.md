# Environment Variables

All variables, whether they're required, and how validation works. Template: `.env.example`.
Copy it to `.env.local` for development. **Never commit real secrets.**

Validation lives in `lib/env.ts` (Zod). It is intentionally lenient at boot so the app runs
in dev with zero config, and enforces per-provider requirements only when the contact route
runs (`getContactEnv()`).

---

## Variables

| Variable | Required? | Default (if unset) | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended for prod | falls back to `data/site.ts` `url` | Public origin for `sitemap.xml`, `robots.txt`, and JSON-LD base URL. |
| `EMAIL_PROVIDER` | No | `dev` | `dev` \| `resend` \| `smtp`. Selects the contact backend. |
| `CONTACT_TO_EMAIL` | No | `mohamed2hamdoun@gmail.com` | Inbox that receives enquiries. |
| `CONTACT_FROM_EMAIL` | No | `onboarding@resend.dev` | From address on sent mail. |
| `RESEND_API_KEY` | **Yes, if `EMAIL_PROVIDER=resend`** | — | Resend API key. |
| `SMTP_HOST` | **Yes, if `EMAIL_PROVIDER=smtp`** | — | SMTP server host. |
| `SMTP_PORT` | No | `587` | SMTP port. |
| `SMTP_USER` | **Yes, if `EMAIL_PROVIDER=smtp`** | — | SMTP username. |
| `SMTP_PASSWORD` | **Yes, if `EMAIL_PROVIDER=smtp`** | — | SMTP password. |
| `CONTACT_RATE_LIMIT_MAX` | No | `5` | Max messages per IP per window. |
| `CONTACT_RATE_LIMIT_WINDOW` | No | `600` | Rate-limit window, in **seconds**. |

> **`NEXT_PUBLIC_SITE_URL` vs `data/site.ts` `url`:** `metadataBase` (canonical/OG absolute
> URLs) is built from the hardcoded `site.url` in `data/site.ts`, while `sitemap.ts`,
> `robots.ts`, and `JsonLd.tsx` prefer `NEXT_PUBLIC_SITE_URL` and fall back to `site.url`. For
> a clean launch, set **both** to the same real origin.

---

## Per-provider requirements

| Provider | Extra vars required | Sends real email? |
| --- | --- | --- |
| `dev` (default) | none | No — logs redacted metadata and writes the message to `./.dev-inbox/` |
| `resend` | `RESEND_API_KEY` | Yes (Resend REST API) |
| `smtp` | `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD` | **No — stub.** The env is validated, but `lib/contact/provider.ts` returns "not implemented" until `nodemailer` is wired in. |

---

## How validation works (`lib/env.ts`)

- **`getEnv()`** parses `process.env` against a Zod schema and caches the result. On failure it
  throws a single, clear, developer-facing message listing each bad key —
  e.g. `[env] Invalid environment configuration — CONTACT_TO_EMAIL: Invalid email`. Values are
  never echoed. Most fields are optional; `EMAIL_PROVIDER` must be one of the three literals;
  numeric limits are coerced and must be positive integers.
- **`getContactEnv()`** builds on `getEnv()` and enforces what the *selected* provider needs:
  - `resend` without `RESEND_API_KEY` → `[env] EMAIL_PROVIDER=resend requires RESEND_API_KEY`
  - `smtp` without host/user/password → `[env] EMAIL_PROVIDER=smtp requires SMTP_HOST, SMTP_USER, SMTP_PASSWORD`
  It returns a typed config (to, from, resend key, smtp block, rate-limit block).
- **In the route** (`app/api/contact/route.ts`), a misconfiguration is caught and returned to
  the visitor as a generic 500 — the specific reason is only logged server-side.

**Fail-fast in practice:** a misconfigured provider surfaces on the first contact `POST` (and
in server logs), not silently. Test it in dev before shipping.

---

## Local dev defaults

`.env.example` ships ready for local development:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EMAIL_PROVIDER=dev
CONTACT_TO_EMAIL=mohamed2hamdoun@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
CONTACT_RATE_LIMIT_MAX=5
CONTACT_RATE_LIMIT_WINDOW=600
```

With these, the contact form works immediately — submissions land in `./.dev-inbox/`
(git-ignored) and only redacted metadata is logged.

---

## Secrets hygiene

- `.env`, `.env*.local`, and `.env.production` are git-ignored (see `.gitignore`). Keep real
  keys there or in Vercel's Environment Variables UI.
- `*.pem` and editor folders are also ignored.
- `lib/env.ts` reads server-only secrets — never import it into a client component.
- Never paste keys into `data/*.ts`, commits, or issues.
