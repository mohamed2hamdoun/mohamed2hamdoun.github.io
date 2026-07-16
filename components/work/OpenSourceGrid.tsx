// components/work/OpenSourceGrid.tsx — smaller applied-ML / open-source builds,
// rendered as a compact editorial grid. Kept clearly SECONDARY to the flagship
// project index. Server component; motion via `data-reveal`. External repo links
// open in a new tab; entries without a public repo omit the link.

import { openSourceProjects } from '@/data/openSource';

const PX = 'px-[clamp(16px,3vw,40px)]';
const pad2 = (n: number) => String(n).padStart(2, '0');

export default function OpenSourceGrid() {
  return (
    <section
      aria-labelledby="opensource-title"
      className={`${PX} border-t border-[color:var(--color-line-paper)] bg-ink py-[clamp(48px,7vh,88px)]`}
    >
      <div className="mb-[clamp(20px,2.5vw,32px)] flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <h2
          id="opensource-title"
          data-reveal
          className="font-display leading-none text-paper"
          style={{ fontSize: 'clamp(28px,4vw,60px)' }}
        >
          APPLIED ML &amp; OPEN SOURCE
        </h2>
        <span className="font-mono text-[11px] leading-none tracking-[0.16em] text-muted">
          {pad2(openSourceProjects.length)} BUILDS · <span className="text-signal">GITHUB</span>
        </span>
      </div>

      <p
        data-reveal
        className="mb-[clamp(24px,3vw,40px)] max-w-[64ch] font-body text-[14px] leading-[1.6] text-pretty text-muted"
      >
        Smaller applied machine-learning and LLM builds — deliberately secondary to the flagship
        work above. Public repositories are linked where available.
      </p>

      <ul
        data-reveal
        className="grid list-none grid-cols-1 gap-[clamp(14px,2vw,20px)] sm:grid-cols-2 lg:grid-cols-3"
      >
        {openSourceProjects.map((p) => (
          <li
            key={p.title}
            className="flex flex-col gap-4 border border-[color:var(--color-line-paper)] p-[clamp(16px,1.8vw,22px)]"
          >
            <span className="font-mono text-[9.5px] leading-none tracking-[0.16em] text-signal">
              {p.kind}
            </span>
            <h3 className="font-display text-[clamp(19px,1.8vw,24px)] leading-[1.08] text-paper">
              {p.title}
            </h3>
            <p className="font-body text-[13.5px] leading-[1.55] text-pretty text-muted">
              {p.description}
            </p>

            <ul className="mt-auto flex list-none flex-wrap gap-[6px] p-0 pt-1 font-mono">
              {p.tech.map((t) => (
                <li
                  key={t}
                  className="border border-[color:var(--color-line-paper)] px-2 py-[5px] text-[10px] leading-none tracking-[0.1em] text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>

            {p.repo ? (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View the ${p.title} repository on GitHub (opens in new tab)`}
                className="inline-flex min-h-11 items-center gap-2 font-mono text-[11px] font-medium leading-none tracking-[0.16em] text-paper transition-colors hover:text-signal"
              >
                VIEW REPO{' '}
                <span aria-hidden className="text-signal">
                  ↗
                </span>
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center font-mono text-[11px] leading-none tracking-[0.16em] text-faint">
                [ PRIVATE REPO ]
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
