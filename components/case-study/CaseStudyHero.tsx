import type { Project } from '@/data/projects';
import MetaBar from './MetaBar';

/**
 * Case-study hero — the page's single <h1>. Oversized index numeral + category
 * kicker + title + serif-italic lead, with the spec MetaBar strip underneath.
 * `pt-14` clears the fixed 56px nav (this is the first section on the route).
 */
export default function CaseStudyHero({ project }: { project: Project }) {
  return (
    <section aria-label={project.shortTitle} className="relative bg-ink pt-14">
      <div
        className="border-b border-[color:var(--color-line-paper)]"
        style={{ padding: 'clamp(48px,9vh,120px) clamp(16px,3vw,40px) clamp(28px,4vh,52px)' }}
      >
        <div className="flex flex-wrap items-start gap-x-[clamp(16px,3vw,40px)] gap-y-6">
          <span
            aria-hidden
            className="font-display text-signal"
            style={{ fontSize: 'clamp(64px,10vw,180px)', lineHeight: 0.8 }}
          >
            {project.num}
          </span>
          <div className="min-w-[min(100%,320px)] flex-1">
            <p className="mb-4 font-mono text-[11px] leading-[1.5] tracking-[0.18em] text-muted">
              {project.category}
            </p>
            <h1
              className="font-display text-paper text-balance"
              style={{ fontSize: 'clamp(38px,6vw,104px)', lineHeight: 0.94 }}
            >
              {project.title}
            </h1>
            <p
              className="mt-6 max-w-[62ch] font-serif italic text-pretty text-paper"
              style={{ fontSize: 'clamp(17px,1.6vw,24px)', lineHeight: 1.5 }}
            >
              {project.description}
            </p>
          </div>
        </div>
      </div>
      <MetaBar project={project} />
    </section>
  );
}
