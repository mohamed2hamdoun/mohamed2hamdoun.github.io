import { test, expect } from '@playwright/test';

// The homepage contact form. The API uses the dev email provider (default) which
// only logs — no real email is sent. A fast fill trips the server's min-fill-time
// guard, which returns a silent success, so the success state is deterministic.

test('empty submit shows inline validation alerts', async ({ page }) => {
  await page.goto('/');
  const form = page.getByRole('form', { name: 'Contact form' });

  await form.getByRole('button', { name: 'SEND MESSAGE' }).click();

  await expect(form.getByRole('alert').first()).toBeVisible();
  await expect(form.getByText(/PLEASE ADD YOUR NAME/i)).toBeVisible();
});

test('valid submit shows the success state', async ({ page }) => {
  await page.goto('/');
  const form = page.getByRole('form', { name: 'Contact form' });

  await form.getByLabel(/^name/i).fill('Jane Tester');
  await form.getByLabel(/^email/i).fill('jane@example.com');
  await form.getByLabel(/^message/i).fill('I would like to discuss a real project with enough detail.');

  await form.getByRole('button', { name: 'SEND MESSAGE' }).click();

  await expect(form.getByText('MESSAGE SENT')).toBeVisible();
});
