// Renders scripts/cv-source.html to public/Mohamed-Hamdoun-CV.pdf (A4, selectable text).
// Run: node scripts/build-cv.mjs
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, 'cv-source.html');
const out = join(here, '..', 'public', 'Mohamed-Hamdoun-CV.pdf');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file://' + src.replace(/\\/g, '/'), { waitUntil: 'load' });
await page.pdf({
  path: out,
  format: 'A4',
  printBackground: true,
  margin: { top: '0', bottom: '0', left: '0', right: '0' },
});
await browser.close();
console.log('CV written to', out);
