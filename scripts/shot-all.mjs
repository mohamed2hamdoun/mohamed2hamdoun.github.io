import { chromium } from '@playwright/test';

const OUT = process.env.SHOT_DIR || '.';
const BASE = process.env.SHOT_BASE || 'http://localhost:3202';

async function revealAll(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 250));
  });
}

const routes = [
  ['work', '/work'],
  ['case-hermes', '/work/hermes'],
  ['research', '/research'],
  ['about', '/about'],
];

const browser = await chromium.launch();
try {
  const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  for (const [name, path] of routes) {
    await d.goto(BASE + path, { waitUntil: 'load', timeout: 60000 });
    await d.waitForTimeout(1200);
    await revealAll(d);
    await d.screenshot({ path: `${OUT}/route-${name}-full.png`, fullPage: true });
  }
  await d.close();

  // mobile spot-checks
  const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
  for (const [name, path] of [['work', '/work'], ['case-hermes', '/work/hermes'], ['about', '/about']]) {
    await m.goto(BASE + path, { waitUntil: 'load', timeout: 60000 });
    await m.waitForTimeout(1000);
    await m.screenshot({ path: `${OUT}/m-${name}-top.png` });
  }
  await m.close();
  console.log('all shots done');
} finally {
  await browser.close();
}
