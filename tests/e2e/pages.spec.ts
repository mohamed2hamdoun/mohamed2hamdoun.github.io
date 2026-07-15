import { test, expect } from '@playwright/test';

test('research page loads with its h1', async ({ page }) => {
  await page.goto('/research');
  await expect(page.getByRole('heading', { level: 1, name: 'RESEARCH' })).toBeVisible();
});

test('about page loads with its h1', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { level: 1, name: 'ABOUT' })).toBeVisible();
});

test('unknown routes render the 404 page', async ({ page }) => {
  for (const path of ['/work/does-not-exist', '/nonsense']) {
    await page.goto(path);
    await expect(page.getByRole('link', { name: /RETURN HOME/i })).toBeVisible();
  }
});
