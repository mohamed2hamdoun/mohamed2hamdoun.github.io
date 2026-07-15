import { chromium } from '@playwright/test';

const OUT = process.env.SHOT_DIR || '.';
const BASE = process.env.SHOT_BASE || 'http://localhost:3300';

const routes = [
  ['home', '/'],
  ['work', '/work'],
  ['case-housing', '/work/agentic-housing'],
  ['case-diabetes', '/work/diabetes-research'],
  ['case-book', '/work/book-vault'],
  ['research', '/research'],
  ['about', '/about'],
];

async function revealAll(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 200));
  });
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const report = [];

for (const [name, path] of routes) {
  await page.goto(BASE + path, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(800);
  await revealAll(page);

  // per-section diagnostics: any section with tiny text, or elements still hidden
  const diag = await page.evaluate(() => {
    const secs = Array.from(document.querySelectorAll('section, article, footer'));
    const out = secs.map((s) => {
      const label = s.getAttribute('aria-label') || s.id || s.tagName.toLowerCase();
      const text = (s.innerText || '').replace(/\s+/g, ' ').trim();
      return { label, len: text.length, head: text.slice(0, 70) };
    });
    // elements still invisible after reveal
    const hidden = Array.from(document.querySelectorAll('[data-reveal]:not(.is-visible)')).length;
    // empty-ish blocks
    const emptyImgs = Array.from(document.querySelectorAll('img')).filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute('src'));
    return { out, hidden, emptyImgs };
  });

  report.push(`\n===== ${name} (${path}) =====  stillHidden=${diag.hidden}  brokenImgs=${JSON.stringify(diag.emptyImgs)}`);
  diag.out.forEach((s) => report.push(`  [${String(s.len).padStart(5)}] ${s.label} :: ${s.head}`));

  await page.screenshot({ path: `${OUT}/audit-${name}.png`, fullPage: true });
}

await browser.close();
console.log(report.join('\n'));
