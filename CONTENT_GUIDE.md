# Content & Photo Guide

Everything you'll want to change day‑to‑day lives in **two places**:

| What you want to change | Where |
| --- | --- |
| Photos (your portrait, project images) | `public/` folder |
| Text (projects, research, bio, skills, links, metrics) | `data/*.ts` files |

You do **not** need to touch anything in `components/` or `app/` for normal edits.

After any change: save the file, and if the dev server is running (`npm run dev`) the site refreshes automatically. To publish, commit and push (see `DEPLOYMENT.md`).

---

## 1. Changing photos

All images live in the **`public/`** folder. To replace one, drop a new file in with the **same filename** (or change the filename in the data — see below).

### Your portrait

There are two portraits, used in different places:

| File | Where it shows | Recommended |
| --- | --- | --- |
| `public/portrait.png` | Home hero (large, tinted into the red field) | Portrait/vertical, ~1000×1400px, PNG or WebP |
| `public/portrait-bw.png` | About preview + `/about` page (black & white) | Same crop, desaturated, ~1000×1400px |

**To replace:** export your new photo, name it exactly `portrait.png` (and a B&W version `portrait-bw.png`), and copy both into `public/`, overwriting the old ones. Keep them roughly the same shape (taller than wide) so the layout stays balanced.

> Tip: the hero applies a soft oval fade and a slight contrast boost automatically, so a plain studio shot works fine — you don't need to pre‑cut the background.

### Project images

Project case studies currently use **designed schematic placeholders** (built in code, not photo files) so nothing looks empty before you have real screenshots. When you're ready to use real screenshots:

1. Add the image to `public/placeholders/` (e.g. `public/placeholders/hermes-system.webp`).
2. See `ASSET_REQUIREMENTS.md` for the exact filename, size, and crop each slot expects.

**Formats:** prefer **WebP** or **AVIF** for photos (smaller, faster). PNG is fine for the portrait. Keep any single image under ~500 KB if you can.

---

## 2. Editing text / articles

All words on the site come from typed data files in **`data/`**. Open them in any text editor. Each entry is plain text between quotes — edit the text, keep the quotes and commas.

### Which file holds what

| File | Controls |
| --- | --- |
| `data/site.ts` | Your name, roles, tagline, email, location, the 3 hero metrics, social links, nav |
| `data/projects.ts` | The 4 projects + their full case studies + the creative archive |
| `data/research.ts` | Your publication(s), research interests, research principles |
| `data/capabilities.ts` | The "What I Do" areas, the 7 process stages, working principles |
| `data/timeline.ts` | Your About timeline + skills grouped by discipline |

### Editing a project or case study

Open `data/projects.ts`. Each project is a block like this:

```ts
{
  slug: 'hermes',                 // the URL: /work/hermes  — avoid changing once live
  num: '03',
  title: 'HERMES — AI DESIGN INTELLIGENCE PLATFORM',
  shortTitle: 'HERMES',
  category: 'Local AI / Web Generation / Agentic Systems',
  status: 'IN ACTIVE DEVELOPMENT',
  role: 'Concept, architecture, full build',
  description: 'A local-model-powered platform ...',   // <- edit the sentence here
  tech: ['Python', 'Qwen (local)', 'Ollama', 'FastAPI'],  // <- add/remove items
  ...
  caseStudy: {
    summary: '...',      // the long-form case-study text lives here
    context: '...',
    challenge: '...',
    results: '...',
    ...
  },
}
```

- **To fix wording:** change the text between the quotes.
- **To add a technology:** add `'New Tool',` inside the `tech: [ ... ]` list.
- **The `slug` is the web address** (`/work/<slug>`). Changing it changes the URL, so only do it before you've shared the link.

### Editing your publication

Open `data/research.ts`. When your paper's link and DOI are confirmed:

```ts
doi: '[DOI AWAITING VERIFICATION]',   // replace with the real DOI string
link: null,                           // change null to 'https://...'  — the "Read Paper" button then appears automatically
```

### Editing your bio, timeline, and skills

Open `data/timeline.ts` for the timeline entries and skill groups, and `data/capabilities.ts` for principles. The bio paragraph on the About page is in `app/about/page.tsx` if you want to reword it (it's the only long prose kept in a page file).

---

## 3. The `[ ... ]` placeholder rule (important)

Anything wrapped in **square brackets**, like `[ YEAR TBC ]` or `[ AWAITING VERIFIED URL ]`, is a deliberate placeholder for something not yet confirmed. The site styles these in a dim colour so they read as "pending".

**Never replace a placeholder with a guess.** Replace it only with a real, verified value. If you remove the brackets, the text stops looking like a placeholder — so only do that once the value is true. This keeps the site honest (no invented metrics, dates, or links).

---

## 4. Common tasks, quickly

**Add a social link (LinkedIn/GitHub/YouTube):** open `data/site.ts`, find the `socials` list, and set the real URL + `verified: true`:

```ts
{ label: 'LINKEDIN', value: 'linkedin.com/in/you', href: 'https://www.linkedin.com/in/you', verified: true },
```

Unverified links (`href: null`) automatically show as "[ AWAITING VERIFIED URL ]" and aren't clickable — so the site never shows a dead link.

**Change a hero metric:** in `data/site.ts`, edit the `metrics` list. Keep only things that are true (published paper, top‑3 hackathon, years of creative work).

**Add a whole new project:** copy an existing project block in `data/projects.ts`, paste it, and change the `slug` (must be unique), `num`, `title`, and the rest. A case‑study page at `/work/<your-slug>` is generated automatically — you don't create any new files.

**Change your email:** it's in one place — `data/site.ts` → `email`. Everything (nav, contact form fallback, footer) reads from there.

---

## 5. If something breaks

- A red build error usually means a missing quote or comma in a data file. Undo your last edit and re‑do it carefully — every text value needs quotes `'like this'` and a comma after it.
- Content changes never require touching code in `components/` or `app/` (except the one About bio paragraph noted above).
- When in doubt, `git diff` shows exactly what you changed, and `git checkout -- <file>` reverts a file.
