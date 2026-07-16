import type { Project } from '@/data/projects';
import StatusBadge from './StatusBadge';

/**
 * Spec strip beneath the hero: STATUS (badge + full status line) / YEAR / ROLE /
 * STACK. Auto-fit grid collapses to a single column on mobile.
 */
export default function MetaBar({ project }: { project: Project }) {
  return (
    <dl
      className="m-0 grid bg-ink"
      style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))' }}
    >
      <div className="flex flex-col gap-3 border-b border-r border-[color:var(--color-line-paper)] p-[clamp(16px,2vw,24px)]">
        <dt className="font-mono text-[10px] leading-none tracking-[0.18em] text-muted">STATUS</dt>
        <dd className="m-0 flex flex-col gap-2">
          <StatusBadge kind={project.statusKind} />
          <span className="font-mono text-[10.5px] leading-[1.5] tracking-[0.08em] text-muted">
            {project.status}
          </span>
        </dd>
      </div>

      <div className="flex flex-col gap-3 border-b border-r border-[color:var(--color-line-paper)] p-[clamp(16px,2vw,24px)]">
        <dt className="font-mono text-[10px] leading-none tracking-[0.18em] text-muted">YEAR</dt>
        <dd className="m-0 font-mono text-[12px] tracking-[0.1em] text-paper">{project.year}</dd>
      </div>

      <div className="flex flex-col gap-3 border-b border-r border-[color:var(--color-line-paper)] p-[clamp(16px,2vw,24px)]">
        <dt className="font-mono text-[10px] leading-none tracking-[0.18em] text-muted">ROLE</dt>
        <dd className="m-0 font-mono text-[12px] leading-[1.55] tracking-[0.06em] text-paper">
          {project.role}
        </dd>
      </div>

      <div className="flex flex-col gap-3 border-b border-r border-[color:var(--color-line-paper)] p-[clamp(16px,2vw,24px)]">
        <dt className="font-mono text-[10px] leading-none tracking-[0.18em] text-muted">STACK</dt>
        <dd className="m-0 font-mono text-[11px] leading-[1.7] tracking-[0.06em] text-muted">
          {project.tech.join(' · ')}
        </dd>
      </div>

      {project.repo && (
        <div className="flex flex-col gap-3 border-b border-r border-[color:var(--color-line-paper)] p-[clamp(16px,2vw,24px)]">
          <dt className="font-mono text-[10px] leading-none tracking-[0.18em] text-muted">
            REPOSITORY
          </dt>
          <dd className="m-0">
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View the ${project.shortTitle} repository (opens in new tab)`}
              className="inline-flex min-h-11 items-center gap-2 font-mono text-[12px] leading-none tracking-[0.1em] text-paper transition-colors hover:text-signal"
            >
              VIEW REPOSITORY{' '}
              <span aria-hidden className="text-signal">
                ↗
              </span>
            </a>
          </dd>
        </div>
      )}
    </dl>
  );
}
