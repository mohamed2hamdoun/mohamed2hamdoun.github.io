import type { Metadata } from 'next';
import { archive } from '@/data/projects';
import WorkIndex from '@/components/work/WorkIndex';

/**
 * /work — the work index. Server component: renders the editorial masthead and the
 * (static) Creative Archive contact sheet, and composes the client-side filtered
 * project list (WorkIndex). Nav (h=56px) + Footer are global (see app/layout.tsx),
 * so the masthead only needs top clearance below the fixed nav.
 */

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected AI systems, applied research, and creative technology — agentic AI, published machine-learning research, local-model platforms, plus a secondary creative archive of film, motion and interface work.',
};

const PX = 'px-[clamp(16px,3vw,40px)]';

// Deterministic hatch angle per archive frame (matches the home reel's visual language).
const angles = [135, 120, 150, 105, 165, 90];

function isPlaceholder(s: string) {
  return s.trim().startsWith('[');
}

export default function WorkPage() {
  return (
    <>
      {/* ───────── Masthead ───────── */}
      <section
        aria-labelledby="work-title"
        className={`${PX} border-b border-[color:var(--color-line-paper)] pt-[clamp(84px,12vh,140px)] pb-[clamp(32px,5vw,64px)]`}
      >
        <p
          data-reveal
          className="mb-[clamp(18px,3vw,32px)] font-mono text-[11px] leading-none tracking-[0.2em] text-muted"
        >
          INDEX / 01 — <span className="text-signal">WORK</span> · AI SYSTEMS · RESEARCH · CREATIVE
        </p>
        <h1
          id="work-title"
          data-reveal
          className="font-display leading-[0.86] text-paper"
          style={{ fontSize: 'clamp(52px,11vw,168px)' }}
        >
          SELECTED WORK <span className="text-signal">*</span>
        </h1>
        <p
          data-reveal
          className="mt-[clamp(20px,3vw,36px)] max-w-[62ch] font-body text-[clamp(15px,1.5vw,19px)] leading-[1.55] text-pretty text-muted"
        >
          Flagship <span className="text-paper">AI systems</span> and{' '}
          <span className="text-paper">applied research</span>, with a{' '}
          <span className="font-serif italic text-paper">creative archive</span> kept deliberately
          secondary. Filter the index below, or read any project as a full case study.
        </p>
      </section>

      {/* ───────── Interactive filtered index (client) ───────── */}
      <WorkIndex />

      {/* ───────── Creative archive — contact sheet (secondary) ───────── */}
      <section
        id="archive"
        aria-labelledby="archive-title"
        className={`${PX} scroll-mt-[72px] border-t border-[color:var(--color-line-paper)] bg-ink py-[clamp(48px,7vh,88px)]`}
      >
        <div className="mb-[clamp(24px,3vw,40px)] flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h2
            id="archive-title"
            data-reveal
            className="font-display leading-none text-paper"
            style={{ fontSize: 'clamp(28px,4vw,60px)' }}
          >
            CREATIVE ARCHIVE
          </h2>
          <span className="max-w-[46ch] font-mono text-[11px] leading-[1.6] tracking-[0.16em] text-muted">
            FILM · MOTION · YOUTUBE · INTERFACE — SECONDARY TO THE AI &amp; RESEARCH WORK
          </span>
        </div>

        <ul
          data-reveal
          className="grid gap-[clamp(14px,2vw,22px)]"
          style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,240px),1fr))' }}
        >
          {archive.map((item, i) => (
            <li key={item.id}>
              <figure className="m-0">
                {/* sprocket strip */}
                <div className="flex justify-between px-[2px] py-[4px]" aria-hidden>
                  {[0, 1, 2, 3, 4, 5].map((k) => (
                    <span key={k} className="h-[5px] w-[8px] bg-[rgba(241,233,218,0.28)]" />
                  ))}
                </div>
                <div
                  className="flex flex-col justify-between gap-3 border border-[color:var(--color-line-paper)] p-[14px]"
                  style={{
                    aspectRatio: '16 / 10',
                    background: `repeating-linear-gradient(${
                      angles[i % angles.length]
                    }deg, #0d0d0d 0 10px, #111 10px 20px)`,
                  }}
                >
                  <span className="font-mono text-[9px] leading-none tracking-[0.18em] text-signal">
                    {item.kind}
                  </span>
                  <figcaption className="font-display text-[clamp(16px,1.6vw,20px)] leading-[1.1] text-paper">
                    {item.label}
                  </figcaption>
                  <span className="font-mono text-[8.5px] leading-[1.4] tracking-[0.12em] text-muted">
                    {item.tags.join(' · ')}
                  </span>
                </div>
                <div className="flex justify-between px-[2px] py-[4px]" aria-hidden>
                  {[0, 1, 2, 3, 4, 5].map((k) => (
                    <span key={k} className="h-[5px] w-[8px] bg-[rgba(241,233,218,0.28)]" />
                  ))}
                </div>
                <p
                  className={`mt-1 font-mono text-[9px] leading-[1.5] tracking-[0.12em] ${
                    isPlaceholder(item.note) ? 'text-faint' : 'text-muted'
                  }`}
                >
                  {item.note}
                </p>
              </figure>
            </li>
          ))}
        </ul>

        <p className="mt-[clamp(20px,3vw,32px)] font-mono text-[10px] leading-[1.6] tracking-[0.14em] text-faint">
          ARCHIVE — PLACEHOLDER FRAMES UNTIL CLIPS &amp; STILLS ARE SUPPLIED. NO INVENTED DATA.
        </p>
      </section>
    </>
  );
}
