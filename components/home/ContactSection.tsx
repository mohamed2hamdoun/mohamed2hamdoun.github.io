'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, CSSProperties, FormEvent } from 'react';
import { site, socials, projectTypes } from '@/data/site';

/**
 * CONTACT (ink). Client island: form state machine (idle | loading | success |
 * error), inline validation, and a real submit to POST /api/contact (Zod-validated,
 * honeypot `website`, min-fill-time, rate-limited server-side). No <footer> — global.
 */

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

interface FieldErrors {
  name?: boolean;
  email?: boolean;
  message?: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm: FormState = { name: '', email: '', company: '', projectType: '', message: '' };

// Shared field styling (verbatim clamp/border values from source).
const fieldLabel: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '7px',
  fontWeight: 500,
  fontSize: '10px',
  lineHeight: 1,
  letterSpacing: '0.16em',
};
const fieldBox: CSSProperties = {
  padding: '13px 14px',
  fontSize: '15px',
  boxSizing: 'border-box',
};
const errorText: CSSProperties = {
  fontSize: '10px',
  lineHeight: 1.4,
  letterSpacing: '0.08em',
};
// Off-screen honeypot (present in the DOM, invisible to humans, catches bots).
const srOnly: CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [honeypot, setHoneypot] = useState('');
  const [errorMsg, setErrorMsg] = useState('Something went wrong. Please try again.');
  const startedAt = useRef<number>(0);

  // stamp the render time once mounted (avoids Date.now() during SSR)
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const [before, after] = site.closingHeadline.split('THINKS CLEARLY');

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!form.name.trim()) next.name = true;
    if (!EMAIL_RE.test(form.email.trim())) next.email = true;
    if (form.message.trim().length < 10) next.message = true;
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus('idle');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          projectType: form.projectType,
          message: form.message,
          website: honeypot, // honeypot — server drops if filled
          startedAt: startedAt.current,
        }),
      });
      if (res.ok) {
        setStatus('success');
        return;
      }
      // map server-side field validation back onto the inputs
      const data = (await res.json().catch(() => null)) as
        | { error?: string; fieldErrors?: Record<string, string[]> }
        | null;
      if (res.status === 429) {
        setErrorMsg('Too many messages just now. Please try again in a few minutes.');
      } else if (res.status === 400 && data?.fieldErrors) {
        setErrors({
          name: !!data.fieldErrors.name,
          email: !!data.fieldErrors.email,
          message: !!data.fieldErrors.message,
        });
        setErrorMsg('Please check the highlighted fields.');
      } else {
        setErrorMsg(data?.error ?? 'Something went wrong. Please email me directly.');
      }
      setStatus('error');
    } catch {
      setErrorMsg('Network error. Please email me directly.');
      setStatus('error');
    }
  }

  function resetForm() {
    setForm(emptyForm);
    setErrors({});
    setHoneypot('');
    setStatus('idle');
  }

  const submitLabel = status === 'loading' ? 'SENDING…' : 'SEND MESSAGE';

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="bg-ink text-paper"
      style={{ borderTop: '1px solid rgba(241,233,218,0.18)', position: 'relative', overflow: 'hidden' }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-10%',
          bottom: '-30%',
          width: '56vw',
          aspectRatio: '1',
          background: 'radial-gradient(circle, #25090B 0%, rgba(8,8,8,0) 65%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          padding: 'clamp(56px,10vh,120px) clamp(16px,3vw,40px) clamp(40px,7vh,80px)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '48px clamp(32px,5vw,96px)',
        }}
      >
        {/* left column */}
        <div style={{ flex: '1 1 460px', minWidth: 'min(100%,300px)' }}>
          <p
            className="font-mono text-signal"
            style={{ margin: '0 0 16px', fontSize: '10px', lineHeight: 1, letterSpacing: '0.2em' }}
          >
            (NEXT PROJECT)
          </p>
          <h2
            data-reveal
            className="font-display"
            style={{ margin: 0, fontSize: 'clamp(38px,5.4vw,88px)', lineHeight: 1, maxWidth: '15ch', textWrap: 'pretty' }}
          >
            {before}
            <span className="text-signal">THINKS CLEARLY</span>
            {after}
          </h2>

          <div style={{ margin: '36px 0 0', display: 'flex', flexDirection: 'column' }}>
            {socials.map((s) =>
              s.href ? (
                <a
                  key={s.label}
                  href={s.href}
                  className="font-mono hover:text-signal"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '16px',
                    padding: '14px 0',
                    borderTop: '1px solid rgba(241,233,218,0.18)',
                    fontSize: '12px',
                    lineHeight: 1.4,
                    letterSpacing: '0.1em',
                  }}
                >
                  <span className="text-muted">{s.label}</span>
                  <span>{s.value.toUpperCase()} ↗</span>
                </a>
              ) : (
                <span
                  key={s.label}
                  className="font-mono text-faint"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '16px',
                    padding: '14px 0',
                    borderTop: '1px solid rgba(241,233,218,0.18)',
                    fontSize: '12px',
                    lineHeight: 1.4,
                    letterSpacing: '0.1em',
                  }}
                >
                  <span className="text-muted">{s.label}</span>
                  <span>{s.value}</span>
                </span>
              ),
            )}
            <span
              className="font-mono"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px',
                padding: '14px 0',
                borderTop: '1px solid rgba(241,233,218,0.18)',
                borderBottom: '1px solid rgba(241,233,218,0.18)',
                fontSize: '12px',
                lineHeight: 1.4,
                letterSpacing: '0.1em',
              }}
            >
              <span className="text-muted">LOCATION</span>
              <span>{`${site.location.toUpperCase()} · ${site.timezone}`}</span>
            </span>
            <span
              className="font-mono text-paper"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 0',
                fontSize: '11px',
                lineHeight: 1,
                letterSpacing: '0.14em',
              }}
            >
              <span
                className="animate-blink bg-signal"
                style={{ width: '8px', height: '8px', borderRadius: '50%' }}
              />
              {site.availability}
            </span>
          </div>
        </div>

        {/* right column — contact form (mock) */}
        <form
          onSubmit={handleSubmit}
          aria-label="Contact form"
          className="bg-ink-2/60"
          style={{
            flex: '1 1 420px',
            minWidth: 'min(100%,300px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            alignSelf: 'flex-start',
            border: '1px solid rgba(241,233,218,0.2)',
            padding: 'clamp(20px,3vw,32px)',
          }}
        >
          <div
            className="font-mono text-muted"
            style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '10px', lineHeight: 1, letterSpacing: '0.16em' }}
          >
            <span>START A PROJECT — FORM F.01</span>
            <span className="text-muted">DIRECT TO MY INBOX</span>
          </div>

          {/* honeypot — must stay empty; bots that fill it are dropped server-side */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={srOnly}
          />

          {status === 'success' ? (
            <div
              role="status"
              aria-live="polite"
              style={{ border: '1px solid #E5242A', padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <span className="font-display text-signal" style={{ fontSize: '26px' }}>
                MESSAGE SENT ✓
              </span>
              <span className="text-muted" style={{ fontSize: '14px', lineHeight: 1.5 }}>
                Thanks — your message is on its way. I’ll reply within a couple of days.
              </span>
              <button
                type="button"
                onClick={resetForm}
                className="font-mono text-paper min-h-11 hover:border-signal hover:text-signal"
                style={{
                  alignSelf: 'flex-start',
                  background: 'none',
                  border: '1px solid rgba(241,233,218,0.3)',
                  padding: '10px 16px',
                  fontWeight: 500,
                  fontSize: '11px',
                  lineHeight: 1,
                  letterSpacing: '0.14em',
                  cursor: 'pointer',
                }}
              >
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <>
              <label className="font-mono text-muted" style={fieldLabel}>
                NAME *
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                  className={`bg-ink text-paper min-h-11 border ${errors.name ? 'border-[#E5242A]' : 'border-[rgba(241,233,218,0.25)]'} focus:border-[#E5242A]`}
                  style={fieldBox}
                />
                {errors.name && (
                  <span id="err-name" role="alert" className="font-mono text-signal" style={errorText}>
                    — REQUIRED: PLEASE ADD YOUR NAME
                  </span>
                )}
              </label>

              <label className="font-mono text-muted" style={fieldLabel}>
                EMAIL *
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                  className={`bg-ink text-paper min-h-11 border ${errors.email ? 'border-[#E5242A]' : 'border-[rgba(241,233,218,0.25)]'} focus:border-[#E5242A]`}
                  style={fieldBox}
                />
                {errors.email && (
                  <span id="err-email" role="alert" className="font-mono text-signal" style={errorText}>
                    — A VALID EMAIL IS NEEDED FOR THE REPLY
                  </span>
                )}
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '18px' }}>
                <label className="font-mono text-muted" style={fieldLabel}>
                  COMPANY / ORG
                  <input
                    type="text"
                    name="company"
                    autoComplete="organization"
                    value={form.company}
                    onChange={handleChange}
                    className="bg-ink text-paper min-h-11 border border-[rgba(241,233,218,0.25)] focus:border-[#E5242A]"
                    style={fieldBox}
                  />
                </label>
                <label className="font-mono text-muted" style={fieldLabel}>
                  PROJECT TYPE
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className="bg-ink text-paper min-h-11 border border-[rgba(241,233,218,0.25)] focus:border-[#E5242A]"
                    style={{ ...fieldBox, appearance: 'none' }}
                  >
                    <option value="">SELECT…</option>
                    {projectTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="font-mono text-muted" style={fieldLabel}>
                MESSAGE *
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'err-message' : undefined}
                  className={`font-body bg-ink text-paper border ${errors.message ? 'border-[#E5242A]' : 'border-[rgba(241,233,218,0.25)]'} focus:border-[#E5242A]`}
                  style={{ ...fieldBox, resize: 'vertical' }}
                />
                {errors.message && (
                  <span id="err-message" role="alert" className="font-mono text-signal" style={errorText}>
                    — TELL ME A LITTLE ABOUT THE PROJECT (MIN 10 CHARACTERS)
                  </span>
                )}
              </label>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="font-mono bg-signal text-paper min-h-12 hover:bg-paper hover:text-ink"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  border: 'none',
                  padding: '17px 26px',
                  fontWeight: 500,
                  fontSize: '12px',
                  lineHeight: 1,
                  letterSpacing: '0.18em',
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                }}
              >
                {submitLabel}
              </button>

              {status === 'error' && (
                <p role="alert" aria-live="assertive" className="font-mono text-signal" style={{ margin: 0, fontSize: '11px', lineHeight: 1.6, letterSpacing: '0.06em' }}>
                  — {errorMsg}
                </p>
              )}

              <p
                className="font-mono text-faint"
                style={{ margin: 0, fontSize: '9px', lineHeight: 1.6, letterSpacing: '0.1em' }}
              >
                PREFER EMAIL?{' '}
                <a href={`mailto:${site.email}`} className="text-muted hover:text-signal underline underline-offset-2">
                  {site.email.toUpperCase()}
                </a>
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
