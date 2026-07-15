import { test, expect } from '@playwright/test';

// Each test sets its own viewport so it is deterministic under BOTH configured
// projects (desktop + mobile) — the nav swaps layout at the Tailwind `md` breakpoint.

test('desktop nav links route to the main sections', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const primary = page.getByRole('navigation', { name: 'Primary' });

  for (const [label, path] of [
    ['WORK', '/work'],
    ['RESEARCH', '/research'],
    ['ABOUT', '/about'],
  ] as const) {
    await page.goto('/');
    await primary.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${path}/?$`));
  }
});

test('mobile menu opens, Escape closes it, and focus returns to the opener', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const opener = page.getByRole('button', { name: 'Open menu' });
  await expect(opener).toBeVisible();
  await opener.click();

  const menu = page.getByRole('dialog', { name: 'Menu' });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole('link', { name: 'WORK' })).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(opener).toBeFocused();
});
