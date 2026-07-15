import { Fragment } from 'react';
import Link from 'next/link';
import { site, metrics } from '@/data/site';

/**
 * HERO — editorial portrait composition (no 3D).
 *
 * Desktop keeps the overlapping magazine layout: oversized PORTFOLIO word +
 * portrait feathered into a deep-red field, with fine technical framing, and
 * the name / metrics anchored to the bottom. Mobile RECOMPOSES into a clean
 * vertical stack (art band that reserves its own height, then name, then metrics).
 *
 * Server component: motion delegated to the global ScrollReveal island via
 * `data-reveal` / `data-parallax`. Geometry/gradients/masks stay inline for fidelity.
 */
export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-14"
    >
      {/* deep-red radial field behind the portrait */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[8%] right-[max(4vw,calc(50vw-620px))] aspect-square w-[min(62vw,880px)]"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, #4a1114 0%, #25090B 42%, rgba(8,8,8,0) 70%)',
        }}
      />

      {/* top technical labels */}
      <div className="relative z-[5] flex flex-wrap items-center justify-between gap-x-7 gap-y-2 border-b border-[rgba(241,233,218,0.1)] px-[clamp(16px,3vw,40px)] py-[14px] font-mono text-[10px] leading-[1.5] tracking-[0.16em] text-muted md:py-[18px]">
        {site.topLabels.map((label, i) => (
          <span key={label} className={i === 2 ? 'text-signal' : undefined}>
            {label}
          </span>
        ))}
      </div>

      {/* ART BAND — reserves height on mobile (relative), full-section overlay on desktop (absolute). */}
      <div
        aria-hidden
        className="pointer-events-none relative h-[clamp(300px,46vh,460px)] md:absolute md:inset-0 md:z-0 md:h-auto"
      >
        {/* giant PORTFOLIO word (parallax on desktop) */}
        <div className="absolute inset-x-0 top-[14%] overflow-hidden md:top-[clamp(88px,14vh,160px)]">
          <div
            data-parallax="0.12"
            className="whitespace-nowrap text-center font-display text-paper text-[clamp(58px,20vw,120px)] leading-[0.94] tracking-[0.005em] md:text-[clamp(88px,17.5vw,340px)]"
          >
            PORTFOLIO
          </div>
        </div>

        {/* portrait, feathered into the field, with fine technical framing */}
        <div className="absolute top-[8%] left-1/2 w-[min(72vw,340px)] -translate-x-1/2 md:top-[clamp(116px,15.5vh,186px)] md:left-auto md:right-[max(2vw,calc(50vw-720px))] md:w-[min(42vw,540px)] md:translate-x-0">
          {/* corner brackets */}
          <span className="absolute -top-2 -left-2 h-4 w-4 border-t border-l border-[rgba(241,233,218,0.4)]" />
          <span className="absolute -top-2 -right-2 h-4 w-4 border-t border-r border-[rgba(241,233,218,0.4)]" />
          <span className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-[rgba(241,233,218,0.4)]" />
          <span className="absolute -right-2 -bottom-2 h-4 w-4 border-b border-r border-[rgba(241,233,218,0.4)]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/portrait.png"
            alt=""
            className="block h-auto w-full"
            style={{
              filter: 'contrast(1.06) saturate(1.05)',
              WebkitMaskImage:
                'radial-gradient(ellipse 74% 72% at 50% 44%, black 56%, transparent 82%)',
              maskImage: 'radial-gradient(ellipse 74% 72% at 50% 44%, black 56%, transparent 82%)',
            }}
          />
          {/* mono caption */}
          <span className="absolute right-0 bottom-[-4px] font-mono text-[9px] leading-none tracking-[0.22em] text-muted">
            FIG.01 — M. HAMDOUN
          </span>
        </div>
      </div>

      {/* name + statement block — flows below the art on mobile, anchored bottom on desktop */}
      <div className="relative z-[6] flex flex-wrap items-end gap-x-12 gap-y-7 px-[clamp(16px,3vw,40px)] pt-8 pb-[clamp(24px,4vh,48px)] md:mt-auto md:pt-0">
        <div className="min-w-[min(100%,320px)] flex-[1_1_520px]">
          <p
            data-reveal
            className="mb-[14px] font-mono text-[11px] leading-none tracking-[0.2em] text-signal"
          >
            HELLO — I AM
          </p>
          <h1
            data-reveal
            className="font-display text-paper text-[clamp(52px,8.6vw,148px)] leading-[0.92] tracking-[0.005em]"
            style={{ textShadow: '0 8px 60px rgba(8,8,8,.85)' }}
          >
            MOHAMED
            <br />
            HAMDOUN
          </h1>
          <div
            data-reveal
            className="mt-[18px] flex flex-wrap gap-x-[18px] gap-y-2 font-mono text-[11px] font-medium leading-none tracking-[0.16em] text-paper"
          >
            {site.roles.map((role, i) => (
              <Fragment key={role}>
                {i > 0 && (
                  <span aria-hidden className="text-signal">
                    /
                  </span>
                )}
                <span>{role}</span>
              </Fragment>
            ))}
          </div>
          <p
            data-reveal
            className="mt-[18px] max-w-[46ch] text-[clamp(15px,1.3vw,18px)] leading-[1.55] text-pretty text-muted"
          >
            {`“${site.statement}”`}
          </p>
          <div data-reveal className="mt-[26px] flex flex-wrap gap-[14px]">
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center gap-3 bg-signal px-[26px] py-4 font-mono text-[12px] font-medium leading-none tracking-[0.16em] text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              VIEW SELECTED WORK <span aria-hidden>→</span>
            </Link>
            <Link
              href="/#contact"
              className="inline-flex min-h-11 items-center gap-3 border border-[rgba(241,233,218,0.35)] px-[26px] py-4 font-mono text-[12px] font-medium leading-none tracking-[0.16em] text-paper transition-colors hover:border-signal hover:text-signal"
            >
              CONTACT
            </Link>
          </div>
        </div>

        {/* verified metrics */}
        <dl
          data-reveal
          className="m-0 flex min-w-[260px] flex-[0_1_300px] flex-col border-t border-[rgba(241,233,218,0.18)]"
        >
          {metrics.map((metric) => (
            <div
              key={metric.value + metric.label}
              className="flex items-baseline justify-between gap-4 border-b border-[rgba(241,233,218,0.18)] py-[14px]"
            >
              <dt className="order-2 text-right font-mono text-[10px] leading-[1.4] tracking-[0.14em] text-muted">
                {metric.label.split('\n').map((line, i, arr) => (
                  <Fragment key={line}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </Fragment>
                ))}
              </dt>
              <dd
                className={`m-0 font-display text-[34px] leading-none ${
                  metric.accent ? 'text-signal' : 'text-paper'
                }`}
              >
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
