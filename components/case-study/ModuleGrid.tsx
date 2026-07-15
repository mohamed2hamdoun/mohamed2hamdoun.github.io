import type { HermesModule } from '@/data/projects';

/**
 * caseStudy module states for Hermes — mirrors the SelectedWork legend exactly:
 * filled (bg-ink) = implemented · signal label = experimental · muted = planned.
 * Paper tone so the implemented cells read as filled ink blocks.
 */
export default function ModuleGrid({ modules }: { modules: HermesModule[] }) {
  return (
    <>
      <ul
        className="m-0 grid list-none border-l border-t border-ink p-0"
        style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))' }}
      >
        {modules.map((m, i) => (
          <li
            key={m.name}
            className={`flex min-h-[88px] flex-col gap-2 border-b border-r border-ink p-[14px] ${
              m.state === 'implemented' ? 'bg-ink text-paper' : ''
            }`}
          >
            <span
              className={`font-mono text-[9px] leading-none tracking-[0.14em] ${
                m.state === 'experimental' ? 'text-signal' : 'text-muted'
              }`}
            >
              M.{String(i + 1).padStart(2, '0')} — {m.state.toUpperCase()}
            </span>
            <span
              className={`font-display text-[17px] leading-[1.1] ${
                m.state === 'planned' ? 'text-muted' : ''
              }`}
            >
              {m.name}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 font-mono text-[9.5px] leading-[1.6] tracking-[0.12em] text-muted">
        FILLED — IMPLEMENTED · <span className="text-signal">RED — EXPERIMENTAL</span> · MUTED —
        PLANNED
      </p>
    </>
  );
}
