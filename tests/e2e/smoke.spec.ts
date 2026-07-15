import { test, expect } from '@playwright/test';

// Benign resource noise (headless chromium usually skips favicon entirely, but a
// headed run may 404 it — that is not an app error). Everything else counts.
const ignore = /favicon\.ico|Failed to load resource/i;

test('home loads with a visible h1 and no console/page errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !ignore.test(msg.text())) {
      errors.push(`console.error: ${msg.text()}`);
    }
  });

  await page.goto('/');
  await page.waitForLoadState('load');

  await expect(page.locator('h1').first()).toBeVisible();
  await expect(page.locator('h1').first()).toContainText('MOHAMED');

  expect(errors, errors.join('\n')).toEqual([]);
});
