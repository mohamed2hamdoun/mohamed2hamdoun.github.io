import { z } from 'zod';

// Shared contact-form contract — used by BOTH the client form and the API route,
// so validation can never drift between them.
export const projectTypeValues = ['ai', 'web', 'research', 'creative', 'other'] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please add your name').max(120, 'Name is too long'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'A valid email is needed for the reply')
    .email('A valid email is needed for the reply')
    .max(254),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  projectType: z.enum(projectTypeValues).optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, 'Tell me a little about the project (min 10 characters)')
    .max(5000, 'Message is too long (max 5000 characters)'),
  // Honeypot — humans never see it. Accept ANY value here (don't reject at the
  // schema, or a 400 would reveal the trap); the route silently absorbs a filled
  // honeypot as a fake success so bots learn nothing.
  website: z.string().max(200).optional(),
  // Client timestamp (ms) when the form was first rendered — used for a min-fill-time check.
  startedAt: z.number().int().nonnegative().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

// Minimum time (ms) a human plausibly needs to fill the form. Faster = bot.
export const MIN_FILL_MS = 2500;
