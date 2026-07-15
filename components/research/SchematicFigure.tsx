/**
 * SchematicFigure — a clearly-labelled placeholder figure for the methodology
 * section. Two overlapping bell shapes stand in for the class-conditional
 * density estimates (GMM / KDE) at the heart of the published method.
 *
 * IMPORTANT: this is illustrative shape only. There are NO axis ticks, numbers
 * or metric values — the caption marks it "[ SCHEMATIC — PUBLISHED FIGURES
 * PENDING ]" so nothing here reads as a verified result.
 */
export default function SchematicFigure() {
  return (
    <figure className="m-0 min-w-[min(100%,300px)] flex-[1_1_360px]">
      <div className="border border-[color:var(--color-line-paper)] bg-ink-2 p-[clamp(16px,2.5vw,28px)]">
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] leading-none tracking-[0.16em] text-muted">
          <span>DENSITY ↑</span>
          <span className="text-signal">SCHEMATIC</span>
        </div>

        <svg
          viewBox="0 0 320 180"
          role="img"
          aria-label="Schematic of two overlapping class-conditional density curves; no values shown."
          className="block h-auto w-full"
        >
          {/* axes (unlabelled — no ticks, no numbers) */}
          <line x1="14" y1="150" x2="308" y2="150" stroke="rgba(241,233,218,0.35)" strokeWidth="1" />
          <line x1="14" y1="18" x2="14" y2="150" stroke="rgba(241,233,218,0.35)" strokeWidth="1" />
          {/* class A density */}
          <path
            d="M24,150 C64,150 86,150 114,44 C142,150 164,150 204,150 Z"
            fill="rgba(241,233,218,0.10)"
            stroke="rgba(241,233,218,0.6)"
            strokeWidth="1.5"
          />
          {/* class B density */}
          <path
            d="M120,150 C160,150 182,150 212,64 C242,150 264,150 304,150 Z"
            fill="rgba(229,36,42,0.14)"
            stroke="#e5242a"
            strokeWidth="1.5"
          />
        </svg>

        <div className="mt-2 text-right font-mono text-[10px] leading-none tracking-[0.16em] text-muted">
          FEATURE VALUE →
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] leading-none tracking-[0.12em] text-muted">
          <span className="flex items-center gap-2">
            <span aria-hidden className="h-[2px] w-4" style={{ background: 'rgba(241,233,218,0.6)' }} />
            CLASS A — DENSITY
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden className="h-[2px] w-4 bg-signal" />
            CLASS B — DENSITY
          </span>
        </div>
      </div>

      <figcaption className="mt-3 font-mono text-[10px] leading-[1.7] tracking-[0.1em] text-muted">
        FIG. 01 — CLASS-CONDITIONAL DENSITY (GMM / KDE).{' '}
        <span className="text-faint">[ SCHEMATIC — PUBLISHED FIGURES PENDING ]</span>
      </figcaption>
    </figure>
  );
}
