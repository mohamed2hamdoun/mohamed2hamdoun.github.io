import { z } from 'zod';

/**
 * Environment validation. Kept intentionally lenient at module-load so the app
 * boots in local dev with zero config; the contact route calls `getContactEnv()`
 * which enforces only what the SELECTED provider needs.
 *
 * Never import this into a client component — it reads server-only secrets.
 */

const baseSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),

  EMAIL_PROVIDER: z.enum(['dev', 'resend', 'smtp']).default('dev'),
  CONTACT_TO_EMAIL: z.string().email().optional(),
  CONTACT_FROM_EMAIL: z.string().email().optional(),

  RESEND_API_KEY: z.string().optional(),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),

  CONTACT_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
  CONTACT_RATE_LIMIT_WINDOW: z.coerce.number().int().positive().default(600), // seconds
});

export type AppEnv = z.infer<typeof baseSchema>;

let cached: AppEnv | null = null;

export function getEnv(): AppEnv {
  if (cached) return cached;
  const parsed = baseSchema.safeParse(process.env);
  if (!parsed.success) {
    // Fail with a clear developer-facing message; never leak values.
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new Error(`[env] Invalid environment configuration — ${issues}`);
  }
  cached = parsed.data;
  return cached;
}

/**
 * Enforces the variables required by the ACTIVE email provider. Returns a typed
 * config the provider layer consumes. Throws a developer-facing error (never shown
 * to visitors) when a selected provider is misconfigured.
 */
export function getContactEnv() {
  const env = getEnv();
  const to = env.CONTACT_TO_EMAIL ?? 'mohamed2hamdoun@gmail.com';
  const from = env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

  if (env.EMAIL_PROVIDER === 'resend' && !env.RESEND_API_KEY) {
    throw new Error('[env] EMAIL_PROVIDER=resend requires RESEND_API_KEY');
  }
  if (env.EMAIL_PROVIDER === 'smtp' && (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASSWORD)) {
    throw new Error('[env] EMAIL_PROVIDER=smtp requires SMTP_HOST, SMTP_USER, SMTP_PASSWORD');
  }

  return {
    provider: env.EMAIL_PROVIDER,
    to,
    from,
    resendApiKey: env.RESEND_API_KEY,
    smtp: {
      host: env.SMTP_HOST,
      port: env.SMTP_PORT ?? 587,
      user: env.SMTP_USER,
      password: env.SMTP_PASSWORD,
    },
    rateLimit: {
      max: env.CONTACT_RATE_LIMIT_MAX,
      windowSec: env.CONTACT_RATE_LIMIT_WINDOW,
    },
  };
}
