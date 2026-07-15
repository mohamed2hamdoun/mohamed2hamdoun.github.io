/**
 * Rate-limit abstraction.
 *
 * Default is an in-memory fixed-window limiter — correct for local dev and a
 * single long-lived server, but NOT reliable across serverless instances (each
 * lambda has its own memory). For production on serverless, swap `memoryLimiter`
 * for a shared store (Upstash Redis / Vercel KV) behind the same `RateLimiter`
 * interface — the route code does not change.
 *
 * ponytail: in-memory limiter, upgrade to a shared store when deployed serverless.
 * TODO(CLAUDE-CODE): implement UpstashLimiter and select it when UPSTASH_* env is set.
 */

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetSec: number;
}

export interface RateLimiter {
  check(key: string): RateLimitResult;
}

class MemoryLimiter implements RateLimiter {
  private hits = new Map<string, number[]>();
  constructor(
    private max: number,
    private windowMs: number,
  ) {}

  check(key: string): RateLimitResult {
    const now = Date.now();
    const cutoff = now - this.windowMs;
    const arr = (this.hits.get(key) ?? []).filter((t) => t > cutoff);
    arr.push(now);
    this.hits.set(key, arr);

    // opportunistic cleanup so the map can't grow unbounded
    if (this.hits.size > 5000) {
      for (const [k, v] of this.hits) {
        if (v.every((t) => t <= cutoff)) this.hits.delete(k);
      }
    }

    const ok = arr.length <= this.max;
    const oldest = arr[0] ?? now;
    return {
      ok,
      remaining: Math.max(0, this.max - arr.length),
      resetSec: Math.ceil((oldest + this.windowMs - now) / 1000),
    };
  }
}

// module-level singleton so limits persist across requests in one server process
let limiter: MemoryLimiter | null = null;

export function getRateLimiter(max: number, windowSec: number): RateLimiter {
  if (!limiter) limiter = new MemoryLimiter(max, windowSec * 1000);
  return limiter;
}

/** Best-effort client IP from proxy headers (Vercel / standard). */
export function clientIp(headers: Headers): string {
  const fwd = headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]!.trim();
  return headers.get('x-real-ip') ?? 'unknown';
}
