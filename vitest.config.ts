import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Repo root (config file's own directory) — no trailing separator.
const rootDir = dirname(fileURLToPath(import.meta.url));

// Logic (black-box) unit tests only — pure modules under lib/ and data/, plus the
// sitemap/robots metadata functions. Node environment is enough; switch a specific
// test to jsdom via a `// @vitest-environment jsdom` docblock if it ever needs DOM.
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Mirror tsconfig "paths": { "@/*": ["./*"] } so `@/lib/...` imports resolve.
    alias: {
      '@': rootDir,
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/unit/**/*.test.ts'],
  },
});
