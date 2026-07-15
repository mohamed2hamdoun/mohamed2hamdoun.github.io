import { chromium } from '@playwright/test';

const OUT = process.env.SHOT_DIR || '.';
const URL = process.env.SHOT_URL || 'http://localhost:3200/';

// Scroll the whole page in steps so IntersectionObserver reveals fire, then return to top.
async function revealAll(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });
}

const browser = await chromium.launch();
try {
  // desktop
  const d = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await d.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await d.waitForTimeout(2500);
  await d.screenshot({ path: `${OUT}/home-desktop-top.png` });
  await revealAll(d);
  await d.screenshot({ path: `${OUT}/home-desktop-full.png`, fullPage: true });
  await d.close();

  // tablet
  const t = await browser.newPage({ viewport: { width: 768, height: 1024 }, deviceScaleFactor: 1 });
  await t.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await t.waitForTimeout(2000);
  await t.screenshot({ path: `${OUT}/home-tablet-top.png` });
  await t.close();

  // mobile
  const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
  await m.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await m.waitForTimeout(2000);
  await m.screenshot({ path: `${OUT}/home-mobile-top.png` });
  await revealAll(m);
  await m.screenshot({ path: `${OUT}/home-mobile-full.png`, fullPage: true });
  await m.close();

  console.log('shots done');
} finally {
  await browser.close();
}
