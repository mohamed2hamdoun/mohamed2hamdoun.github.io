// components/home/Process.tsx — "HOW I WORK" process stages.
// Ported from _redesign/Home.dc.html lines 369–385. Server component.

import { processStages } from '@/data/capabilities';

export default function Process() {
  return (
    <section
      aria-label="Process"
      className="bg-ink text-paper border-t border-ink"
      style={{ padding: 'clamp(40px,7vh,80px) clamp(16px,3vw,40px)' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: 'clamp(28px,5vh,52px)',
        }}
      >
        <h2 className="font-display" style={{ margin: 0, fontSize: 'clamp(30px,4vw,60px)', lineHeight: 1 }}>
          HOW I WORK
        </h2>
        <span
          className="font-mono text-muted"
          style={{ fontWeight: 400, fontSize: '11px', lineHeight: 1, letterSpacing: '.16em' }}
        >
          07 STAGES — EVERY PROJECT
        </span>
      </div>

      <ol
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
          gap: 0,
        }}
      >
        {processStages.map((st) => (
          <li
            key={st.num}
            data-reveal=""
            style={{ position: 'relative', padding: '22px 16px 8px 0', borderTop: '1px solid rgba(241,233,218,.22)' }}
          >
            <span
              aria-hidden="true"
              className="bg-signal"
              style={{ position: 'absolute', top: '-4px', left: 0, width: '7px', height: '7px' }}
            />
            <span
              className="font-mono text-signal"
              style={{ display: 'block', fontWeight: 400, fontSize: '10px', lineHeight: 1, letterSpacing: '.16em', marginBottom: '8px' }}
            >
              {st.num}
            </span>
            <span
              className="font-display"
              style={{ display: 'block', fontSize: 'clamp(18px,1.7vw,26px)', lineHeight: 1, marginBottom: '8px' }}
            >
              {st.name}
            </span>
            <span
              className="font-mono text-muted"
              style={{ display: 'block', fontWeight: 400, fontSize: '10px', lineHeight: 1.6, letterSpacing: '.08em' }}
            >
              {st.note}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
