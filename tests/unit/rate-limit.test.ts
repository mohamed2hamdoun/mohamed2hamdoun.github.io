import { describe, it, expect } from 'vitest';
import { getRateLimiter } from '@/lib/contact/rate-limit';

// `getRateLimiter` is a module singleton — the FIRST call fixes max/window and every
// later call returns that same instance (extra args ignored). Vitest isolates modules
// per test file, so within this file we construct once and use distinct keys per case
// to avoid cross-assertion bleed. Fixed-window counting is deterministic; no timers.
describe('getRateLimiter (fixed-window memory limiter)', () => {
  const max = 3;
  const limiter = getRateLimiter(max, 60);

  it('allows the first `max` calls for a key, then blocks with remaining 0', () => {
    const key = 'ip-a';
    for (let i = 0; i < max; i++) {
      expect(limiter.check(key).ok).toBe(true);
    }
    const blocked = limiter.check(key);
    expect(blocked.ok).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it('counts down `remaining` as calls are consumed', () => {
    const key = 'ip-b';
    expect(limiter.check(key).remaining).toBe(max - 1);
    expect(limiter.check(key).remaining).toBe(max - 2);
    expect(limiter.check(key).remaining).toBe(max - 3);
  });

  it('tracks each key independently', () => {
    const busy = 'ip-c';
    for (let i = 0; i < max + 2; i++) limiter.check(busy);
    expect(limiter.check(busy).ok).toBe(false);

    // a fresh key is unaffected by another key's exhaustion
    expect(limiter.check('ip-d').ok).toBe(true);
  });
});
