'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { projects, categories, type ProjectCategory } from '@/data/projects';

/**
 * WorkIndex — the interactive part of /work: category filter toolbar, a live count
 * indicator, and the editorial project list. Filtering runs client-side over the typed
 * `projects` (by tags); the list crossfades/reflows via motion/react (reduced-motion
 * respected). The static masthead + archive live in the server page (app/work/page.tsx).
 */

const PX = 'px-[clamp(16px,3vw,40px)]';
const total = projects.length;
const pad2 = (n: number) => String(n).padStart(2, '0');
const isPlaceholder = (s: string) => s.trim().startsWith('[');
// Editorial ease — matches the site's reveal curve; typed as a bezier tuple for motion.
const EASE: [number, number, number, number] = [0.22, 0.6, 0.2, 1];

export default function WorkIndex() {
  const [active, setActive] = useState<ProjectCategory>('All');
  const reduce = useReducedMotion();

  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <section aria-label="Project index" className="bg-ink">
      {/* ── Filter toolbar + count (sticky under the fixed 56px nav) ── */}
      <div
        className={`${PX} sticky top-14 z-40 flex flex-col gap-4 border-b border-[color:var(--color-line-paper)] bg-ink py-[clamp(16px,2.5vw,26px)] lg:flex-row lg:items-center lg:justify-between`}
      >
        <p
          className="order-2 font-mono text-[11px] leading-none tracking-[0.16em] text-muted lg:order-1"
          aria-live="polite"
        >
          <span aria-hidden className="mr-2 text-signal">
            ●
          </span>
          SHOWING <span className="text-paper">{pad2(filtered.length)}</span> / {pad2(total)}
        </p>

        <div
          role="group"
          aria-label="Filter projects by category"
          className="order-1 flex flex-wrap gap-2 lg:order-2 lg:justify-end"
        >
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(cat)}
                className={`min-h-11 border px-[14px] font-mono text-[11px] font-medium leading-none tracking-[0.14em] transition-colors ${
                  isActive
                    ? 'border-signal bg-signal text-paper'
                    : 'border-[color:var(--color-line-paper)] text-muted hover:border-signal hover:text-paper'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Project list ── */}
      {filtered.length === 0 ? (
        <p
          className={`${PX} border-b border-[color:var(--color-line-paper)] py-[clamp(48px,8vw,96px)] font-mono text-[13px] leading-[1.7] tracking-[0.1em] text-faint`}
        >
          [ NO PROJECTS IN{' '}
          <span className="text-muted">{active.toUpperCase()}</span> YET — TRY ANOTHER CATEGORY ]
        </p>
      ) : (
        <motion.ul layout={!reduce} className="list-none">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((p) => (
              <motion.li
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={reduce ? false : { opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                className="border-b border-[color:var(--color-line-paper)]"
              >
                <Link
                  href={`/work/${p.slug}`}
                  aria-label={`${p.title} — view case study`}
                  className={`group grid items-start gap-x-[clamp(20px,3vw,56px)] gap-y-6 ${PX} py-[clamp(28px,4vw,52px)] transition-colors hover:bg-ink-2 lg:grid-cols-[minmax(0,1fr)_minmax(230px,300px)]`}
                >
                  {/* headline: number + category + title + description */}
                  <div className="flex items-start gap-[clamp(14px,2.4vw,32px)]">
                    <span
                      aria-hidden
                      className="shrink-0 font-display leading-[0.85] text-faint transition-colors group-hover:text-signal"
                      style={{ fontSize: 'clamp(34px,6vw,96px)' }}
                    >
                      {p.num}
                    </span>
                    <div className="min-w-0">
                      <p className="mb-[10px] font-mono text-[10px] leading-[1.5] tracking-[0.16em] text-muted">
                        {p.category.toUpperCase()}
                      </p>
                      <h2
                        className="font-display text-paper transition-colors group-hover:text-signal"
                        style={{ fontSize: 'clamp(26px,3.6vw,58px)', lineHeight: 0.96 }}
                      >
                        {p.title}
                      </h2>
                      <p className="mt-[14px] max-w-[52ch] font-body text-[15px] leading-[1.55] text-pretty text-muted">
                        {p.description}
                      </p>
                      <span className="mt-[clamp(18px,2.4vw,28px)] inline-flex items-center gap-[10px] font-mono text-[12px] font-medium leading-none tracking-[0.16em] text-paper transition-colors group-hover:text-signal">
                        VIEW CASE STUDY{' '}
                        <span
                          aria-hidden
                          className="text-signal transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* metadata — always visible, never hover-only */}
                  <dl className="flex flex-col gap-[14px] border-t border-[color:var(--color-line-paper)] pt-[18px] font-mono text-[11px] leading-[1.5] tracking-[0.08em] lg:border-l lg:border-t-0 lg:pl-[clamp(18px,2vw,32px)] lg:pt-0">
                    <div>
                      <dt className="text-faint">STATUS</dt>
                      <dd className="mt-1 text-signal">{p.status}</dd>
                    </div>
                    <div>
                      <dt className="text-faint">ROLE</dt>
                      <dd className="mt-1 text-muted">{p.role}</dd>
                    </div>
                    <div>
                      <dt className="text-faint">YEAR</dt>
                      <dd className={`mt-1 ${isPlaceholder(p.year) ? 'text-faint' : 'text-muted'}`}>
                        {p.year}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-faint">TECH</dt>
                      <dd className="mt-2 flex flex-wrap gap-[6px]">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="border border-[color:var(--color-line-paper)] px-2 py-[5px] text-[10px] leading-none tracking-[0.1em] text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </section>
  );
}
