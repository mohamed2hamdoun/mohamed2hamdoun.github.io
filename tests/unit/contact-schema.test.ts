import { describe, it, expect } from 'vitest';
import { contactSchema, projectTypeValues } from '@/lib/contact/schema';

// Black-box tests against the real Zod contract shared by the client form and the
// API route. Note the honeypot `website` is intentionally accepted by the schema
// (the route absorbs a filled honeypot, so a 400 would reveal the trap).

const valid = {
  name: 'Jane Tester',
  email: 'Jane@Example.com',
  message: 'I would like to discuss a real project with enough detail.',
};

describe('contactSchema', () => {
  it('parses a valid payload and normalises the email', () => {
    const parsed = contactSchema.parse(valid);
    expect(parsed.name).toBe('Jane Tester');
    // .trim().toLowerCase() transform on email
    expect(parsed.email).toBe('jane@example.com');
    expect(parsed.message).toContain('real project');
  });

  it('accepts an allowed projectType and an empty string', () => {
    expect(contactSchema.safeParse({ ...valid, projectType: projectTypeValues[0] }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, projectType: '' }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, projectType: 'not-a-type' }).success).toBe(false);
  });

  it('rejects a missing name', () => {
    const noName: Partial<typeof valid> = { ...valid };
    delete noName.name;
    const res = contactSchema.safeParse(noName);
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error.flatten().fieldErrors.name?.[0]).toBeTruthy();
    }
  });

  it('rejects a bad email', () => {
    const res = contactSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error.flatten().fieldErrors.email?.[0]).toMatch(/valid email/i);
    }
  });

  it('rejects a too-short message', () => {
    const res = contactSchema.safeParse({ ...valid, message: 'hi' });
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error.flatten().fieldErrors.message?.[0]).toMatch(/min 10 characters/i);
    }
  });

  it('rejects a message over the max length', () => {
    const res = contactSchema.safeParse({ ...valid, message: 'a'.repeat(5001) });
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error.flatten().fieldErrors.message?.[0]).toMatch(/too long/i);
    }
  });

  it('still PARSES when the honeypot `website` is filled (absorbed by the route, not the schema)', () => {
    const res = contactSchema.safeParse({ ...valid, website: 'http://spam.example' });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.website).toBe('http://spam.example');
    }
  });
});
