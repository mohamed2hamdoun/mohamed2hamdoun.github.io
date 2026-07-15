import { getContactEnv } from '@/lib/env';
import type { ContactInput } from './schema';

/**
 * Email-provider abstraction. One interface, three backends:
 *   - dev    : logs SAFE metadata only (never the message body) + writes the full
 *              message to a git-ignored local inbox file. The default — zero config.
 *   - resend : Resend REST API (no SDK dependency, just fetch + a Bearer key).
 *   - smtp   : stub — requires nodemailer. TODO(CLAUDE-CODE) below.
 *
 * The interface is identical in every mode, so the route + the frontend never change.
 */

export interface SendResult {
  ok: boolean;
  /** developer-facing only — NEVER returned to the client */
  detail?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderEmail(input: ContactInput) {
  const rows: [string, string][] = [
    ['Name', input.name],
    ['Email', input.email],
    ['Company', input.company || '—'],
    ['Project type', input.projectType || '—'],
  ];
  const subject = `Portfolio contact — ${input.name}`;
  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nMessage:\n${input.message}`;
  const html =
    `<h2>New portfolio enquiry</h2>` +
    rows.map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(v)}</p>`).join('') +
    `<p><strong>Message:</strong></p><p>${escapeHtml(input.message).replace(/\n/g, '<br>')}</p>`;
  return { subject, text, html };
}

async function sendDev(input: ContactInput): Promise<SendResult> {
  // Log ONLY non-sensitive metadata — never the message content.
  console.info(
    `[contact] dev-mode enquiry received — from=<redacted> company=${input.company || '—'} type=${input.projectType || '—'} len=${input.message.length}`,
  );
  // Best-effort local inbox for developer testing (git-ignored, dev only).
  try {
    const { writeFile, mkdir } = await import('node:fs/promises');
    const { join } = await import('node:path');
    const dir = join(process.cwd(), '.dev-inbox');
    await mkdir(dir, { recursive: true });
    const { subject, text } = renderEmail(input);
    // deterministic-ish name; process time is fine here (server side)
    const name = `enquiry-${Date.now()}.txt`;
    await writeFile(join(dir, name), `Subject: ${subject}\n\n${text}\n`, 'utf8');
  } catch {
    // non-fatal in dev
  }
  return { ok: true };
}

async function sendResend(input: ContactInput): Promise<SendResult> {
  const env = getContactEnv();
  const { subject, text, html } = renderEmail(input);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.from,
      to: [env.to],
      reply_to: input.email,
      subject,
      text,
      html,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    return { ok: false, detail: `resend ${res.status}: ${detail.slice(0, 200)}` };
  }
  return { ok: true };
}

export async function sendContactEmail(input: ContactInput): Promise<SendResult> {
  const env = getContactEnv();
  switch (env.provider) {
    case 'resend':
      return sendResend(input);
    case 'smtp':
      // TODO(CLAUDE-CODE): implement SMTP via nodemailer:
      //   const nodemailer = await import('nodemailer');
      //   const t = nodemailer.createTransport({ host, port, auth: { user, pass } });
      //   await t.sendMail({ from, to, replyTo: input.email, subject, text, html });
      // Add "nodemailer" to dependencies when enabling this path.
      return { ok: false, detail: 'smtp provider not implemented — add nodemailer' };
    case 'dev':
    default:
      return sendDev(input);
  }
}
