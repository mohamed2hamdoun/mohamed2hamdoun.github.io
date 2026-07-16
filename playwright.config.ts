import { defineConfig, devices } from '@playwright/test';

// E2E runs against a production build (SSG/ISR behaviour matches prod). The dev
// email provider is the default and only logs — no real email is ever sent.
const PORT = 3210;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      // Chromium at a phone viewport — trips the Tailwind `md` breakpoint so the
      // full-screen mobile menu renders. (Explicit viewport, not a webkit device,
      // so only chromium needs to be installed.)
      name: 'mobile-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: {
    // Static export (output: 'export') produces `out/`; serve it as plain files.
    command: `npm run build && npx --yes serve@14 out -l ${PORT} --no-request-logging`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
