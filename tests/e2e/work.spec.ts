import { test, expect } from '@playwright/test';

// Slugs + a distinctive h1 substring per case study (kept literal so the e2e suite
// stays independent of the app's module resolution).
const CASES = [
  { slug: 'agentic-housing', h1: /HOUSING ARREARS/i },
  { slug: 'diabetes-research', h1: /DIABETES PREDICTION/i },
  { slug: 'hermes', h1: /HERMES/i },
  { slug: 'book-vault', h1: /BOOK SUMMARIZATION/i },
];

test('index loads and a category filter narrows the visible list', async ({ page }) => {
  await page.goto('/work');
  await expect(page.getByRole('heading', { level: 1, name: /SELECTED WORK/i })).toBeVisible();

  const caseLinks = page.locator('a[href^="/work/"]');
  await expect(caseLinks).toHaveCount(CASES.length);

  const filters = page.getByRole('group', { name: 'Filter projects by category' });
  await filters.getByRole('button', { name: 'RESEARCH', exact: true }).click();

  // only diabetes-research is tagged 'Research'
  await expect(caseLinks).toHaveCount(1);
  await expect(page.locator('a[href="/work/diabetes-research"]')).toBeVisible();
});

test('every case study opens from the index', async ({ page }) => {
  for (const { slug, h1 } of CASES) {
    await page.goto('/work');
    await page.locator(`a[href="/work/${slug}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`/work/${slug}$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(h1);
  }
});

test('direct navigation to a case study renders and survives a reload (SSG)', async ({ page }) => {
  await page.goto('/work/hermes');
  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toHaveText(/HERMES/i);

  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/HERMES/i);
});
