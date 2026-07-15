import { NextResponse } from 'next/server';
import { contactSchema, MIN_FILL_MS } from '@/lib/contact/schema';
import { sendContactEmail } from '@/lib/contact/provider';
import { getContactEnv } from '@/lib/env';
import { getRateLimiter, clientIp } from '@/lib/contact/rate-limit';

export const runtime = 'nodejs';

// Generic message returned to the client on ANY server-side failure — never leak
// provider errors, stack traces, or env values.
const GENERIC_ERROR = 'Something went wrong sending your message. Please email me directly.';

export async function POST(req: Request) {
  let cfg: ReturnType<typeof getContactEnv>;
  try {
    cfg = getContactEnv();
  } catch (err) {
    console.error('[contact] misconfigured:', err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 500 });
  }

  // request-size guard (defensive; body is small)
  const raw = await req.text();
  if (raw.length > 20_000) {
    return NextResponse.json({ ok: false, error: 'Message too large.' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ ok: false, error: 'Validation failed.', fieldErrors }, { status: 400 });
  }
  const data = parsed.data;

  // 1) honeypot — silently succeed so bots learn nothing
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 2) min fill time — too fast = bot; silently succeed
  if (typeof data.startedAt === 'number') {
    const elapsed = Date.now() - data.startedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS) {
      return NextResponse.json({ ok: true });
    }
  }

  // 3) rate limit per IP
  const limiter = getRateLimiter(cfg.rateLimit.max, cfg.rateLimit.windowSec);
  const ip = clientIp(req.headers);
  const rl = limiter.check(`contact:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many messages. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(rl.resetSec) } },
    );
  }

  // 4) send
  try {
    const result = await sendContactEmail(data);
    if (!result.ok) {
      console.error('[contact] send failed:', result.detail);
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] unexpected send error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 500 });
  }
}
