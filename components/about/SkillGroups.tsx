// components/about/SkillGroups.tsx — skills grouped by discipline as clean,
// scannable lists (one item per line), never a tag cloud. Server component;
// motion via `data-reveal`. Source: data/timeline.ts skillGroups (not modified).

import { skillGroups } from '@/data/timeline';

export default function SkillGroups() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
        gap: '0 clamp(24px,4vw,56px)',
      }}
    >
      {skillGroups.map((g) => (
        <div
          key={g.group}
          data-reveal
          style={{ borderTop: '2px solid var(--color-ink)', paddingTop: '16px', marginTop: '24px' }}
        >
          <h3
            className="font-display"
            style={{ margin: '0 0 6px', fontSize: 'clamp(18px,1.8vw,24px)', lineHeight: 1 }}
          >
            {g.group}
          </h3>
          <span
            className="font-mono text-muted"
            style={{ fontSize: '10px', lineHeight: 1, letterSpacing: '0.16em' }}
          >
            {String(g.items.length).padStart(2, '0')} TOOLS
          </span>
          <ul style={{ listStyle: 'none', margin: '14px 0 0', padding: 0 }}>
            {g.items.map((item, i) => (
              <li
                key={item}
                className="font-mono text-paper-ink"
                style={{
                  padding: '9px 0',
                  fontSize: '12.5px',
                  lineHeight: 1.3,
                  letterSpacing: '0.02em',
                  borderTop: i === 0 ? undefined : '1px solid rgba(8,8,8,0.14)',
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
