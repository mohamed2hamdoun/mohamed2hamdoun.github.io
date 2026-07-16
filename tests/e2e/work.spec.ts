import { test, expect } from '@playwright/test';

// Slugs + a distinctive h1 substring per case study. Hrefs carry a trailing slash
// (next.config trailingSlash: true, for clean GitHub Pages routing).
const CASES = [
  { slug: 'agentic-housing', h1: /HOUSING ARREARS/i },
  { slug: 'diabetes-research', h1: /DIABETES PREDICTION/i },
  { slug: 'hermes', h1: /HERMES/i },
  { slug: 'book-vault', h1: /BOOK SUMMARIZATION/i },
];

const caseLink = (page: import('@playwright/test').Page, slug: string) =>
  page.locator(`a[href="/work/${slug}/"]`);

test('index loads and a category filter narrows the visible list', async ({ page }) => {
  await page.goto('/work/');
  await expect(page.getByRole('heading', { level: 1, name: /SELECTED WORK/i })).toBeVisible();

  // all four flagship case studies are linked
  for (const { slug } of CASES) {
    await expect(caseLink(page, slug).first()).toBeVisible();
  }

  const filters = page.getByRole('group', { name: 'Filter projects by category' });
  await filters.getByRole('button', { name: 'RESEARCH', exact: true }).click();

  // only diabetes-research is tagged 'Research' — the others leave the list
  await expect(caseLink(page, 'diabetes-research').first()).toBeVisible();
  await expect(caseLink(page, 'hermes')).toHaveCount(0);
  await expect(caseLink(page, 'agentic-housing')).toHaveCount(0);
});

test('every case study opens from the index', async ({ page }) => {
  for (const { slug, h1 } of CASES) {
    await page.goto('/work/');
    await caseLink(page, slug).first().click();
    await expect(page).toHaveURL(new RegExp(`/work/${slug}/?$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(h1);
  }
});

test('direct navigation to a case study renders and survives a reload (SSG)', async ({ page }) => {
  await page.goto('/work/hermes/');
  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toHaveText(/HERMES/i);

  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/HERMES/i);
});
