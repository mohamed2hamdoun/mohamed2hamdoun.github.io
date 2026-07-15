import Link from 'next/link';
import { archive } from '@/data/projects';

/**
 * CREATIVE ARCHIVE (ink). Ported from the approved design (Home.dc.html §Creative
 * Archive). The film-strip reel renders the archive twice so the CSS `animate-reel`
 * (translateX 0 → -50%) loops seamlessly. Frames are placeholders until real clips land.
 */

// Deterministic per-frame gradient angle so the two duplicated halves match exactly
// (required for a seamless -50% marquee loop).
const angles = [135, 120, 150, 105, 165, 90];

function Sprockets() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 2px' }}>
      {[0, 1, 2, 3].map((k) => (
        <span key={k} style={{ width: '8px', height: '5px', background: 'rgba(241,233,218,0.3)' }} />
      ))}
    </div>
  );
}

function Frame({ item, index }: { item: (typeof archive)[number]; index: number }) {
  const angle = angles[index % angles.length];
  return (
    <figure style={{ margin: 0, width: 'clamp(220px,24vw,320px)', flex: 'none' }}>
      <Sprockets />
      <div
        style={{
          aspectRatio: '16 / 9',
          border: '1px solid rgba(241,233,218,0.2)',
          background: `repeating-linear-gradient(${angle}deg, #0d0d0d 0 10px, #111 10px 20px)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '12px',
        }}
      >
        <span
          className="font-mono text-signal"
          style={{ fontSize: '9px', lineHeight: 1, letterSpacing: '0.16em' }}
        >
          {item.kind}
        </span>
        <span className="font-display" style={{ fontSize: '16px', lineHeight: 1.1 }}>
          {item.label}
        </span>
        <span
          className="font-mono text-faint"
          style={{ fontSize: '8.5px', lineHeight: 1.4, letterSpacing: '0.1em' }}
        >
          {item.note}
        </span>
      </div>
      <Sprockets />
    </figure>
  );
}

export default function CreativeArchive() {
  return (
    <section
      aria-label="Creative archive"
      className="bg-ink text-paper border-t border-ink"
      style={{ padding: 'clamp(40px,7vh,80px) 0', overflow: 'hidden' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '0 clamp(16px,3vw,40px)',
          marginBottom: '26px',
        }}
      >
        <h2 className="font-display" style={{ margin: 0, fontSize: 'clamp(26px,3.4vw,48px)', lineHeight: 1 }}>
          CREATIVE ARCHIVE
        </h2>
        <span
          className="font-mono text-muted"
          style={{ fontSize: '10px', lineHeight: 1.5, letterSpacing: '0.16em' }}
        >
          FILM · MOTION · YOUTUBE · EXPERIMENTS — BEFORE & ALONGSIDE THE AI WORK
        </span>
      </div>

      <div
        aria-hidden="true"
        style={{
          borderTop: '1px solid rgba(241,233,218,0.18)',
          borderBottom: '1px solid rgba(241,233,218,0.18)',
          padding: '10px 0',
        }}
      >
        <div className="animate-reel" style={{ display: 'flex', gap: '14px', width: 'max-content' }}>
          {archive.map((item, i) => (
            <Frame key={`${item.id}-a`} item={item} index={i} />
          ))}
          {archive.map((item, i) => (
            <Frame key={`${item.id}-b`} item={item} index={i} />
          ))}
        </div>
      </div>

      <p
        className="font-mono text-faint"
        style={{ margin: '18px clamp(16px,3vw,40px) 0', fontSize: '10px', lineHeight: 1.6, letterSpacing: '0.14em' }}
      >
        ARCHIVE REEL — PLACEHOLDER FRAMES UNTIL CLIPS & STILLS ARE SUPPLIED ·{' '}
        <Link
          href="/work#archive"
          className="text-muted underline hover:text-signal"
          style={{ textUnderlineOffset: '3px' }}
        >
          BROWSE IN WORK INDEX
        </Link>
      </p>
    </section>
  );
}
