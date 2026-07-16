import type { Metadata } from 'next';
import { Fragment } from 'react';
import Link from 'next/link';
import { site } from '@/data/site';
import { principles } from '@/data/capabilities';
import { publications } from '@/data/research';
import { education, certifications, experience } from '@/data/about';
import Timeline from '@/components/about/Timeline';
import SkillGroups from '@/components/about/SkillGroups';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Mohamed Hamdoun — an Artificial Intelligence undergraduate in the UAE working across intelligent systems, applied research, web development, and visual storytelling.',
};

// Verified education / research facts only. Unknowns are labelled placeholders,
// never invented (see FACTUAL CONTENT RULES). Sourced from data/*.
const paper = publications[0];

export default function AboutPage() {
  return (
    <>
      {/* ============================================================
          HERO — identity composition. Grayscale portrait + first-person
          lead. pt-14 clears the fixed 56px nav.
          ============================================================ */}
      <section aria-label="About" className="bg-ink text-paper pt-14">
        {/* top technical labels (mirrors the home hero rhythm) */}
        <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-2 border-b border-[rgba(241,233,218,0.1)] px-[clamp(16px,3vw,40px)] py-[14px] font-mono text-[10px] leading-[1.5] tracking-[0.16em] text-muted md:py-[18px]">
          {site.topLabels.map((label, i) => (
            <span key={label} className={i === 2 ? 'text-signal' : undefined}>
              {label}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-stretch">
          {/* portrait column */}
          <div
            className="relative"
            style={{
              flex: '0 1 460px',
              minWidth: 'min(100%,280px)',
              borderRight: '1px solid rgba(241,233,218,0.12)',
              padding: 'clamp(28px,4vw,56px)',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            {/* deep-red accent block, offset behind the portrait for depth */}
            <span
              aria-hidden="true"
              className="bg-deep-red"
              style={{ position: 'absolute', top: 'clamp(14px,3vw,40px)', left: 'clamp(14px,3vw,40px)', width: 'min(70%,300px)', height: '70%' }}
            />
            <div className="relative" style={{ width: '100%' }}>
              {/* corner brackets */}
              <span className="absolute -top-2 -left-2 z-[2] h-4 w-4 border-t border-l border-[rgba(241,233,218,0.5)]" />
              <span className="absolute -top-2 -right-2 z-[2] h-4 w-4 border-t border-r border-[rgba(241,233,218,0.5)]" />
              <span className="absolute -bottom-2 -left-2 z-[2] h-4 w-4 border-b border-l border-[rgba(241,233,218,0.5)]" />
              <span className="absolute -right-2 -bottom-2 z-[2] h-4 w-4 border-b border-r border-[rgba(241,233,218,0.5)]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portrait-bw.png"
                alt="Mohamed Hamdoun"
                className="relative z-[1] block w-full"
                style={{ height: 'auto', filter: 'grayscale(1) contrast(1.06)', border: '1px solid rgba(241,233,218,0.18)' }}
              />
              <span
                className="absolute z-[2] font-mono bg-ink text-paper"
                style={{ left: '10px', bottom: '10px', padding: '8px 12px', fontSize: '9.5px', lineHeight: 1, letterSpacing: '0.16em' }}
              >
                FIG.01 — MOHAMED HAMDOUN, UAE
              </span>
            </div>
          </div>

          {/* text column */}
          <div
            style={{
              flex: '1 1 520px',
              minWidth: 'min(100%,300px)',
              padding: 'clamp(32px,5vh,72px) clamp(16px,3vw,48px)',
            }}
          >
            <p
              data-reveal
              className="font-mono text-signal"
              style={{ margin: '0 0 16px', fontSize: '11px', lineHeight: 1, letterSpacing: '0.2em' }}
            >
              ABOUT — WHO I AM
            </p>
            <h1
              data-reveal
              className="font-display"
              style={{ margin: '0 0 24px', fontSize: 'clamp(52px,8vw,120px)', lineHeight: 0.92, letterSpacing: '0.005em' }}
            >
              ABOUT
            </h1>

            <p
              data-reveal
              style={{ margin: 0, fontSize: 'clamp(17px,1.6vw,22px)', lineHeight: 1.55, maxWidth: '52ch', textWrap: 'pretty' }}
            >
              I’m Mohamed Hamdoun, an Artificial Intelligence undergraduate based in the UAE. My work
              sits between intelligent systems, applied research, web development, and visual
              storytelling.
            </p>

            <p
              data-reveal
              className="text-muted"
              style={{ margin: '18px 0 0', fontSize: 'clamp(15px,1.3vw,17px)', lineHeight: 1.6, maxWidth: '54ch', textWrap: 'pretty' }}
            >
              I began with filmmaking and video editing, then moved deeper into software, machine
              learning, and agentic systems. That creative background still shapes how I approach
              technology.
            </p>

            <p
              data-reveal
              className="font-serif text-signal"
              style={{ margin: '20px 0 0', fontStyle: 'italic', fontSize: 'clamp(19px,1.9vw,26px)', lineHeight: 1.4, maxWidth: '46ch' }}
            >
              Complex systems should not only work; they should communicate clearly.
            </p>

            <div
              data-reveal
              className="font-mono text-muted"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '6px 14px',
                margin: '28px 0 0',
                fontSize: '10.5px',
                lineHeight: 1.8,
                letterSpacing: '0.1em',
              }}
            >
              <span>FILMMAKING → SOFTWARE</span>
              <span className="text-signal">→</span>
              <span>ML RESEARCH → PUBLICATION</span>
              <span className="text-signal">→</span>
              <span>AGENTIC SYSTEMS → NOW</span>
            </div>

            <div
              data-reveal
              className="font-mono text-paper"
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 16px', margin: '22px 0 0', fontSize: '11px', fontWeight: 500, lineHeight: 1, letterSpacing: '0.16em' }}
            >
              {site.roles.map((role, i) => (
                <Fragment key={role}>
                  {i > 0 && <span aria-hidden className="text-signal">/</span>}
                  <span>{role}</span>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          THE PATH — biography timeline (grouped, connected rail).
          ============================================================ */}
      <section
        aria-label="Path"
        className="bg-paper text-ink border-t border-ink"
        style={{ padding: 'clamp(48px,8vh,96px) clamp(16px,3vw,40px)' }}
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
            THE PATH
          </h2>
          <span
            className="font-mono text-muted"
            style={{ fontSize: '11px', lineHeight: 1, letterSpacing: '0.16em' }}
          >
            FILM → SOFTWARE → RESEARCH
          </span>
        </div>
        <Timeline />
      </section>

      {/* ============================================================
          EDUCATION & RESEARCH — verified facts, labelled placeholders.
          ============================================================ */}
      <section
        aria-label="Education and research"
        className="bg-ink text-paper border-t border-ink"
        style={{ padding: 'clamp(48px,8vh,96px) clamp(16px,3vw,40px)' }}
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
            EDUCATION & RESEARCH
          </h2>
          <Link
            href="/research"
            className="font-mono hover:text-signal"
            style={{ fontSize: '11px', fontWeight: 500, lineHeight: 1, letterSpacing: '0.16em' }}
          >
            FULL RESEARCH PAGE →
          </Link>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(24px,4vw,64px)' }}>
          {/* Education */}
          <div data-reveal style={{ flex: '1 1 360px', minWidth: 'min(100%,280px)', borderTop: '1px solid rgba(241,233,218,0.22)', paddingTop: '20px' }}>
            <h3 className="font-display" style={{ margin: '0 0 18px', fontSize: 'clamp(22px,2.4vw,32px)', lineHeight: 1 }}>
              EDUCATION
            </h3>
            <dl className="font-mono" style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: '18px', rowGap: '12px', fontSize: '11.5px', lineHeight: 1.5, letterSpacing: '0.04em' }}>
              <dt className="text-muted">PROGRAM</dt>
              <dd style={{ margin: 0 }}>{education.program}</dd>
              <dt className="text-muted">DEGREE</dt>
              <dd style={{ margin: 0 }}>{education.degree}</dd>
              <dt className="text-muted">INSTITUTION</dt>
              <dd style={{ margin: 0 }}>{education.institution}</dd>
              <dt className="text-muted">LOCATION</dt>
              <dd style={{ margin: 0 }}>{education.location}</dd>
              <dt className="text-muted">TIMEFRAME</dt>
              <dd style={{ margin: 0 }}>{education.timeframe}</dd>
              <dt className="text-muted">STATUS</dt>
              <dd className="text-signal" style={{ margin: 0 }}>{education.status}</dd>
            </dl>
          </div>

          {/* Research */}
          <div data-reveal style={{ flex: '1 1 360px', minWidth: 'min(100%,280px)', borderTop: '1px solid rgba(241,233,218,0.22)', paddingTop: '20px' }}>
            <h3 className="font-display" style={{ margin: '0 0 18px', fontSize: 'clamp(22px,2.4vw,32px)', lineHeight: 1 }}>
              RESEARCH
            </h3>
            <p
              className="font-mono text-signal"
              style={{ margin: '0 0 10px', fontSize: '10px', lineHeight: 1.6, letterSpacing: '0.14em' }}
            >
              {paper.status} — {paper.journal.toUpperCase()} (JOURNAL)
            </p>
            <p
              style={{ margin: '0 0 14px', fontSize: 'clamp(16px,1.6vw,20px)', lineHeight: 1.35, maxWidth: '34ch', textWrap: 'pretty' }}
            >
              {paper.title}
            </p>
            <p className="text-muted" style={{ margin: '0 0 14px', fontSize: '14px', lineHeight: 1.6, maxWidth: '54ch', textWrap: 'pretty' }}>
              Peer-reviewed work on {paper.category.toLowerCase()} — enriching clinical feature spaces
              to improve early diabetes prediction.
            </p>
            <p className="font-mono text-faint" style={{ margin: '0 0 16px', fontSize: '10px', lineHeight: 1.8, letterSpacing: '0.1em' }}>
              DOI — [ AWAITING VERIFICATION ] · LINK — [ PENDING ]
            </p>
            <Link
              href={paper.caseStudy}
              className="font-mono hover:text-signal"
              style={{ fontSize: '11px', fontWeight: 500, lineHeight: 1, letterSpacing: '0.16em', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              READ THE CASE STUDY →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          PROFESSIONAL EXPERIENCE — verified internship, editorial layout.
          ============================================================ */}
      <section
        aria-label="Professional experience"
        className="bg-paper text-ink border-t border-ink"
        style={{ padding: 'clamp(48px,8vh,96px) clamp(16px,3vw,40px)' }}
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
            PROFESSIONAL EXPERIENCE
          </h2>
          <span
            className="font-mono text-muted"
            style={{ fontSize: '11px', lineHeight: 1, letterSpacing: '0.16em' }}
          >
            {String(experience.length).padStart(2, '0')} ROLE · VERIFIED
          </span>
        </div>

        {experience.map((job) => (
          <article
            key={`${job.company}-${job.role}`}
            data-reveal
            style={{ borderTop: '1px solid rgba(8,8,8,0.22)', paddingTop: 'clamp(20px,3vh,32px)' }}
          >
            <h3
              className="font-display"
              style={{ margin: '0 0 10px', fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1.02 }}
            >
              {job.role}
            </h3>
            <p
              className="font-mono"
              style={{ margin: '0 0 18px', fontSize: '11.5px', lineHeight: 1.5, letterSpacing: '0.1em' }}
            >
              <span className="text-signal">{job.company}</span>
              <span className="text-muted"> · {job.timeframe}</span>
            </p>
            <p
              className="text-paper-ink"
              style={{ margin: '0 0 22px', fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.55, maxWidth: '62ch', textWrap: 'pretty' }}
            >
              {job.summary}
            </p>

            <ul style={{ listStyle: 'none', margin: '0 0 24px', padding: 0 }}>
              {job.points.map((point) => (
                <li
                  key={point}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    padding: 'clamp(12px,1.8vh,18px) 0',
                    borderTop: '1px solid rgba(8,8,8,0.14)',
                  }}
                >
                  <span aria-hidden className="bg-signal" style={{ flex: '0 0 auto', marginTop: '7px', height: '7px', width: '7px' }} />
                  <span className="text-paper-ink" style={{ fontSize: '15px', lineHeight: 1.5, maxWidth: '60ch', textWrap: 'pretty' }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '8px', margin: 0, padding: 0 }} className="font-mono">
              {job.tech.map((t) => (
                <li
                  key={t}
                  className="border-ink text-paper-ink"
                  style={{ border: '1px solid var(--color-ink)', padding: '6px 10px', fontSize: '10.5px', lineHeight: 1, letterSpacing: '0.1em' }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {/* ============================================================
          CERTIFICATIONS — verified credentials, hairline numbered rows.
          ============================================================ */}
      <section
        aria-label="Certifications"
        className="bg-ink text-paper border-t border-ink"
        style={{ padding: 'clamp(48px,8vh,96px) clamp(16px,3vw,40px)' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: 'clamp(20px,4vh,40px)',
          }}
        >
          <h2 className="font-display" style={{ margin: 0, fontSize: 'clamp(30px,4vw,60px)', lineHeight: 1 }}>
            CERTIFICATIONS
          </h2>
          <span
            className="font-mono text-muted"
            style={{ fontSize: '11px', lineHeight: 1, letterSpacing: '0.16em' }}
          >
            {String(certifications.length).padStart(2, '0')} CREDENTIALS
          </span>
        </div>

        <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {certifications.map((cert, i) => (
            <li
              key={cert.title}
              data-reveal
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                gap: '8px clamp(16px,3vw,32px)',
                padding: 'clamp(16px,2.6vh,26px) 0',
                borderTop: '1px solid rgba(241,233,218,0.22)',
              }}
            >
              <span
                className="font-mono text-signal"
                style={{ flex: '0 0 auto', fontSize: '11px', lineHeight: 1, letterSpacing: '0.16em' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="font-display"
                style={{ flex: '1 1 320px', minWidth: 'min(100%,240px)', fontSize: 'clamp(18px,1.9vw,26px)', lineHeight: 1.1 }}
              >
                {cert.title}
              </span>
              <span
                className="font-mono text-muted"
                style={{ flex: '1 1 180px', fontSize: '11px', lineHeight: 1.5, letterSpacing: '0.08em' }}
              >
                {cert.issuer}
              </span>
              <span
                className="font-mono text-paper"
                style={{ flex: '0 0 auto', fontSize: '11px', lineHeight: 1, letterSpacing: '0.12em' }}
              >
                {cert.year}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* ============================================================
          SKILLS — grouped by discipline, clean lists.
          ============================================================ */}
      <section
        aria-label="Skills"
        className="bg-paper text-ink border-t border-ink"
        style={{ padding: 'clamp(48px,8vh,96px) clamp(16px,3vw,40px)' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '4px',
          }}
        >
          <h2 className="font-display" style={{ margin: 0, fontSize: 'clamp(30px,4vw,60px)', lineHeight: 1 }}>
            SKILLS
          </h2>
          <span
            className="font-mono text-muted"
            style={{ fontSize: '11px', lineHeight: 1, letterSpacing: '0.16em' }}
          >
            04 DISCIPLINES
          </span>
        </div>
        <SkillGroups />
      </section>

      {/* ============================================================
          WORKING PRINCIPLES — numbered editorial blocks.
          ============================================================ */}
      <section
        aria-label="Working principles"
        className="bg-ink text-paper border-t border-ink"
        style={{ padding: 'clamp(48px,8vh,96px) clamp(16px,3vw,40px) clamp(20px,4vh,40px)' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: 'clamp(20px,4vh,40px)',
          }}
        >
          <h2 className="font-display" style={{ margin: 0, fontSize: 'clamp(30px,4vw,60px)', lineHeight: 1 }}>
            HOW I THINK
          </h2>
          <span
            className="font-mono text-muted"
            style={{ fontSize: '11px', lineHeight: 1, letterSpacing: '0.16em' }}
          >
            {String(principles.length).padStart(2, '0')} WORKING PRINCIPLES
          </span>
        </div>

        {principles.map((p) => (
          <div
            key={p.num}
            data-reveal
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px clamp(24px,4vw,56px)',
              padding: 'clamp(22px,3.5vh,36px) 0',
              borderTop: '1px solid rgba(241,233,218,0.22)',
              alignItems: 'flex-start',
            }}
          >
            <span
              className="font-display text-signal"
              style={{ flex: '0 0 auto', fontSize: 'clamp(28px,3vw,44px)', lineHeight: 1 }}
            >
              {p.num}
            </span>
            <h3
              className="font-display"
              style={{ flex: '1 1 260px', minWidth: 'min(100%,240px)', margin: 0, fontSize: 'clamp(20px,2.2vw,32px)', lineHeight: 1.02 }}
            >
              {p.title}
            </h3>
            <p
              className="text-muted"
              style={{ flex: '1 1 320px', minWidth: 'min(100%,260px)', margin: 0, fontSize: '15px', lineHeight: 1.55, maxWidth: '52ch', textWrap: 'pretty' }}
            >
              {p.body}
            </p>
          </div>
        ))}
      </section>

      {/* ============================================================
          CURRENT FOCUS + CONTACT.
          ============================================================ */}
      <section
        aria-label="Current focus"
        className="bg-paper text-ink border-t border-ink"
        style={{ padding: 'clamp(56px,10vh,120px) clamp(16px,3vw,40px)' }}
      >
        <p
          className="font-mono text-muted"
          style={{ margin: '0 0 22px', fontSize: '10px', lineHeight: 1, letterSpacing: '0.2em' }}
        >
          CURRENT FOCUS
        </p>
        <p
          data-reveal
          className="font-display"
          style={{ margin: 0, fontSize: 'clamp(30px,5vw,72px)', lineHeight: 1.05, letterSpacing: '0.005em', maxWidth: '20ch', textWrap: 'pretty' }}
        >
          INTELLIGENT DECISION SYSTEMS THAT PEOPLE ACTUALLY{' '}
          <span className="font-serif text-signal" style={{ fontStyle: 'italic', fontWeight: 400, letterSpacing: 0 }}>
            trust.
          </span>
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '16px',
            marginTop: 'clamp(32px,6vh,56px)',
          }}
        >
          <Link
            href="/#contact"
            className="inline-flex min-h-11 items-center gap-3 bg-ink px-[26px] py-4 font-mono text-[12px] font-medium leading-none tracking-[0.16em] text-paper transition-colors hover:bg-signal"
          >
            START A CONVERSATION <span aria-hidden>→</span>
          </Link>
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center gap-3 border border-ink px-[26px] py-4 font-mono text-[12px] font-medium leading-none tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            SEE THE WORK
          </Link>
          <a
            href={site.cvUrl}
            download
            aria-label="Download CV (PDF)"
            className="inline-flex min-h-11 items-center gap-3 border border-ink px-[26px] py-4 font-mono text-[12px] font-medium leading-none tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            DOWNLOAD CV <span aria-hidden>↓</span>
          </a>
          <span
            className="font-mono text-muted"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10px', lineHeight: 1, letterSpacing: '0.14em' }}
          >
            <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-signal animate-blink" />
            {site.availability}
          </span>
        </div>
      </section>
    </>
  );
}
