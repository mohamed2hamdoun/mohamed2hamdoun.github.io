import { test, expect } from '@playwright/test';

// The homepage contact form composes a mailto: link (works on static hosting,
// no server). Submitting a valid form assigns window.location to a mailto URL —
// headless Chromium has no mail handler so nothing navigates, and the success
// ("EMAIL READY") state renders deterministically.

test('empty submit shows inline validation alerts', async ({ page }) => {
  await page.goto('/');
  const form = page.getByRole('form', { name: 'Contact form' });

  await form.getByRole('button', { name: 'COMPOSE MESSAGE' }).click();

  await expect(form.getByRole('alert').first()).toBeVisible();
  await expect(form.getByText(/PLEASE ADD YOUR NAME/i)).toBeVisible();
});

test('valid submit shows the email-ready state', async ({ page }) => {
  await page.goto('/');
  const form = page.getByRole('form', { name: 'Contact form' });

  await form.getByLabel(/^name/i).fill('Jane Tester');
  await form.getByLabel(/^email/i).fill('jane@example.com');
  await form.getByLabel(/^message/i).fill('I would like to discuss a real project with enough detail.');

  await form.getByRole('button', { name: 'COMPOSE MESSAGE' }).click();

  await expect(form.getByText('EMAIL READY')).toBeVisible();
});
