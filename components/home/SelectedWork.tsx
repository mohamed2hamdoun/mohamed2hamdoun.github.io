import type { CSSProperties } from 'react';
import Link from 'next/link';

/**
 * SELECTED WORK — ported from the approved Home design (Home.dc.html, lines 162–325).
 * Four projects, four bespoke editorial layouts. The mockups are designed CSS/div
 * compositions (NOT images) and are ported verbatim from the source markup; only the
 * `data-reveal` motion hooks and real Next.js case-study routes are added. Server
 * component — motion is delegated to the global ScrollReveal island.
 */

// 03 · Hermes modules — filled = implemented, red = experimental, muted = planned.
const hermesModules = [
  { id: 'M.01', name: 'DESIGN RESEARCH', state: 'implemented' },
  { id: 'M.02', name: 'VISUAL EXTRACTION', state: 'implemented' },
  { id: 'M.03', name: 'EMBEDDINGS', state: 'implemented' },
  { id: 'M.04', name: 'DESIGN SPEC', state: 'implemented' },
  { id: 'M.05', name: 'LOCAL QWEN BUILDER', state: 'implemented' },
  { id: 'M.06', name: 'FILE GENERATION', state: 'implemented' },
  { id: 'M.07', name: 'BROWSER PREVIEW', state: 'experimental' },
  { id: 'M.08', name: 'VISUAL CRITIC', state: 'experimental' },
  { id: 'M.09', name: 'UX CRITIC', state: 'experimental' },
  { id: 'M.10', name: 'REPAIR LOOP', state: 'planned' },
  { id: 'M.11', name: 'LEARNING LOOP', state: 'planned' },
] as const;

// 04 · Book-vault output chips (MERMAID DIAGRAM is highlighted in signal red).
const vaultChips = [
  { label: 'CH.01 MAP', accent: false },
  { label: 'STORY SUMMARY', accent: false },
  { label: 'MERMAID DIAGRAM', accent: true },
  { label: 'MIND MAP', accent: false },
  { label: 'P.214 CITATION', accent: false },
  { label: 'RESUME STATE', accent: false },
] as const;

// 02 · class-conditional density bars — red bars mark the enriched feature region.
const densityBars: { h: number; red?: boolean }[] = [
  { h: 18 },
  { h: 34 },
  { h: 58 },
  { h: 82 },
  { h: 64, red: true },
  { h: 92, red: true },
  { h: 70, red: true },
  { h: 44 },
  { h: 26 },
  { h: 12 },
];

const SECTION_PAD = 'clamp(32px,5vh,64px) clamp(16px,3vw,40px)';
// outlined (stroke-only) index numeral used on the ivory layouts
const outlinedNumeral: CSSProperties = {
  fontSize: 'clamp(44px,5vw,84px)',
  lineHeight: 0.9,
  color: '#080808',
  WebkitTextStroke: '2px #080808',
  WebkitTextFillColor: 'transparent',
};

export default function SelectedWork() {
  return (
    <section aria-label="Selected work" className="bg-ink">
      {/* heading */}
      <div
        className="flex flex-wrap items-baseline justify-between gap-5 border-t border-[color:var(--color-line-paper)]"
        style={{ padding: 'clamp(40px,7vh,80px) clamp(16px,3vw,40px) 28px' }}
      >
        <h2
          className="font-display leading-none text-paper"
          style={{ fontSize: 'clamp(34px,4.6vw,72px)' }}
        >
          SELECTED WORK <span className="text-signal">*</span>
        </h2>
        <span className="font-mono text-[11px] leading-none tracking-[0.16em] text-muted">
          04 FLAGSHIP PROJECTS — 2024/2026
        </span>
      </div>

      {/* ····· 01 · DARK CINEMATIC FULL-WIDTH ····· */}
      <article
        className="border-t border-[color:var(--color-line-paper)]"
        style={{ padding: SECTION_PAD }}
      >
        <div className="mb-7 flex flex-wrap items-end gap-x-12 gap-y-6">
          <div
            className="flex min-w-[min(100%,300px)] items-start"
            style={{ flex: '1 1 560px', gap: 'clamp(14px,2vw,28px)' }}
          >
            <span
              aria-hidden
              className="font-display text-signal"
              style={{ fontSize: 'clamp(44px,5vw,84px)', lineHeight: 0.9 }}
            >
              01
            </span>
            <div>
              <p className="mb-[10px] font-mono text-[10px] leading-none tracking-[0.18em] text-muted">
                AGENTIC AI / GOVTECH / HACKATHON
              </p>
              <h3
                className="max-w-[16ch] font-display text-paper"
                style={{ fontSize: 'clamp(30px,4.2vw,66px)', lineHeight: 0.96 }}
              >
                AGENTIC AI FOR HOUSING ARREARS
              </h3>
            </div>
          </div>
          <div className="min-w-[260px]" style={{ flex: '0 1 380px' }}>
            <p className="mb-[10px] font-body text-[15px] leading-[1.55] tracking-normal text-pretty text-paper">
              An agentic AI system that turns a multi-day housing-arrears rescheduling process into
              an immediate AI-assisted service.
            </p>
            <p className="font-mono text-[11px] leading-[1.7] tracking-[0.06em] text-muted">
              ROLE — SYSTEM ARCHITECTURE, AGENT DESIGN
              <br />
              STACK — PYTHON · LANGGRAPH · FASTAPI · PYDANTIC · OCR · OLLAMA
              <br />
              OUTCOME — <span className="text-signal">TOP 3, CHALLENGE CATEGORY · AWARDED</span>
            </p>
          </div>
        </div>
        <Link
          href="/work/agentic-housing"
          aria-label="View case study: Agentic AI for Housing Arrears"
          className="relative block border border-[rgba(241,233,218,0.18)] bg-ink-2 transition-colors hover:border-signal"
        >
          <div
            data-reveal
            aria-hidden
            className="grid"
            style={{
              gridTemplateColumns: 'minmax(140px,220px) 1fr',
              minHeight: 'clamp(260px,38vw,440px)',
            }}
          >
            {/* agent pipeline sidebar */}
            <div className="flex flex-col gap-[10px] border-r border-[rgba(241,233,218,0.12)] p-[18px] font-mono text-[9.5px] leading-[1.4] tracking-[0.1em] text-muted">
              <span className="text-paper">AGENT PIPELINE</span>
              <span className="border-l-2 border-signal pl-2 text-paper">INTAKE VALIDATION</span>
              <span className="pl-[10px]">DOCUMENT INTELLIGENCE</span>
              <span className="pl-[10px]">OCR</span>
              <span className="pl-[10px]">FINANCIAL ANALYSIS</span>
              <span className="pl-[10px]">HARDSHIP CONTEXT</span>
              <span className="pl-[10px]">POLICY DECISION</span>
              <span className="pl-[10px]">HUMAN ESCALATION</span>
              <span className="pl-[10px]">AUDIT TRAIL</span>
              <span className="mt-auto text-faint">
                [ UI PLACEHOLDER — SEE ASSET_REQUIREMENTS.MD ]
              </span>
            </div>
            {/* decision dashboard */}
            <div
              className="flex flex-col gap-[14px]"
              style={{
                padding: 'clamp(16px,2.5vw,32px)',
                background: 'repeating-linear-gradient(45deg, #0d0d0d 0 14px, #0f0f0f 14px 28px)',
              }}
            >
              <div className="flex justify-between gap-3 font-mono text-[9.5px] leading-none tracking-[0.14em] text-muted">
                <span>CASE #A-2417 — RESCHEDULING REQUEST</span>
                <span className="text-signal">● DECISION READY IN MINUTES</span>
              </div>
              <div
                className="grid flex-1 content-stretch gap-[10px]"
                style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))' }}
              >
                <div className="flex flex-col justify-between gap-2 border border-[rgba(241,233,218,0.16)] p-3">
                  <span className="font-mono text-[9px] leading-none tracking-[0.12em] text-muted">
                    DOCUMENTS
                  </span>
                  <span className="font-display text-[26px] text-paper">VALID</span>
                </div>
                <div className="flex flex-col justify-between gap-2 border border-[rgba(241,233,218,0.16)] p-3">
                  <span className="font-mono text-[9px] leading-none tracking-[0.12em] text-muted">
                    HARDSHIP
                  </span>
                  <span className="font-display text-[26px] text-paper">ASSESSED</span>
                </div>
                <div
                  className="flex flex-col justify-between gap-2 border border-signal p-3"
                  style={{ background: 'rgba(229,36,42,.06)' }}
                >
                  <span className="font-mono text-[9px] leading-none tracking-[0.12em] text-signal">
                    POLICY DECISION
                  </span>
                  <span className="font-display text-[26px] text-signal">APPROVE</span>
                </div>
                <div className="flex flex-col justify-between gap-2 border border-dashed border-[rgba(241,233,218,0.25)] p-3">
                  <span className="font-mono text-[9px] leading-none tracking-[0.12em] text-muted">
                    ESCALATION
                  </span>
                  <span className="font-display text-[26px] text-muted">STANDBY</span>
                </div>
              </div>
              <div className="font-mono text-[9px] leading-[1.5] tracking-[0.1em] text-faint">
                EVERY STEP LOGGED — REPLAYABLE AUDIT TRAIL
              </div>
            </div>
          </div>
          <span className="absolute bottom-0 right-0 bg-signal px-5 py-3 font-mono text-[11px] font-medium leading-none tracking-[0.16em] text-paper">
            VIEW CASE STUDY →
          </span>
        </Link>
      </article>

      {/* ····· 02 · IVORY SPLIT ····· */}
      <article
        className="grid border-t border-ink bg-paper text-ink"
        style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))' }}
      >
        <div
          className="flex flex-col border-r border-[rgba(8,8,8,0.2)]"
          style={{ padding: SECTION_PAD }}
        >
          <div className="flex items-start" style={{ gap: 'clamp(14px,2vw,24px)' }}>
            <span aria-hidden className="font-display" style={outlinedNumeral}>
              02
            </span>
            <div>
              <p className="mb-[10px] font-mono text-[10px] leading-none tracking-[0.18em] text-muted">
                MACHINE LEARNING RESEARCH / HEALTHCARE AI
              </p>
              <h3
                className="max-w-[18ch] font-display"
                style={{ fontSize: 'clamp(28px,3.4vw,52px)', lineHeight: 0.98 }}
              >
                PROBABILITIES FEATURE ENRICHMENT FOR EARLY DIABETES PREDICTION
              </h3>
            </div>
          </div>
          <p className="mt-[22px] max-w-[52ch] text-[15px] leading-[1.6] text-pretty text-paper-ink">
            Published research: probability features derived from Gaussian Mixture Models and Kernel
            Density Estimation are injected back into the feature space, giving classifiers earlier,
            cleaner signal.
          </p>
          <p className="mt-[16px] font-mono text-[11px] leading-[1.8] tracking-[0.06em] text-muted">
            STATUS — <span className="text-signal">PUBLISHED · ALGORITHMS (JOURNAL)</span>
            <br />
            METHODS — LOGISTIC REGRESSION · GMM · KDE · PCA
            <br />
            ROLE — RESEARCH, EXPERIMENTS, WRITING
          </p>
          <Link
            href="/work/diabetes-research"
            className="mt-auto inline-flex items-center gap-[10px] pt-[26px] font-mono text-[12px] font-medium leading-none tracking-[0.16em] text-ink transition-colors hover:text-signal"
          >
            VIEW CASE STUDY{' '}
            <span aria-hidden className="text-signal">
              →
            </span>
          </Link>
        </div>
        <div
          data-reveal
          aria-hidden
          className="flex flex-col justify-center gap-[14px]"
          style={{
            padding: SECTION_PAD,
            background: 'repeating-linear-gradient(0deg,#F1E9DA 0 23px,rgba(8,8,8,.05) 23px 24px)',
          }}
        >
          <div className="flex justify-between font-mono text-[9.5px] leading-none tracking-[0.14em] text-muted">
            <span>FIG. 01 — CLASS-CONDITIONAL DENSITY (SCHEMATIC)</span>
            <span>P(x|c)</span>
          </div>
          <div
            className="flex items-end gap-[6px] border-b border-l border-ink px-2"
            style={{ height: 'clamp(160px,22vw,260px)' }}
          >
            {densityBars.map((bar, i) => (
              <div
                key={i}
                className={`flex-1 ${bar.red ? 'bg-signal' : ''}`}
                style={{
                  height: `${bar.h}%`,
                  ...(bar.red ? {} : { background: 'rgba(8,8,8,.22)' }),
                }}
              />
            ))}
          </div>
          <div className="flex justify-between font-mono text-[9.5px] leading-[1.5] tracking-[0.1em] text-muted">
            <span>
              <span
                className="inline-block h-[9px] w-[9px] bg-signal"
                style={{ verticalAlign: '-1px' }}
              />{' '}
              ENRICHED FEATURE REGION
            </span>
            <span className="text-faint">[ CHART PLACEHOLDER — PUBLISHED FIGURES PENDING ]</span>
          </div>
        </div>
      </article>

      {/* ····· 03 · MODULAR TECHNICAL GRID ····· */}
      <article
        className="border-t border-ink bg-paper text-ink"
        style={{ padding: SECTION_PAD }}
      >
        <div className="mb-6 flex flex-wrap items-end gap-x-12 gap-y-6">
          <div
            className="flex min-w-[min(100%,300px)] items-start"
            style={{ flex: '1 1 480px', gap: 'clamp(14px,2vw,24px)' }}
          >
            <span
              aria-hidden
              className="font-display text-signal"
              style={{ fontSize: 'clamp(44px,5vw,84px)', lineHeight: 0.9 }}
            >
              03
            </span>
            <div>
              <p className="mb-[10px] font-mono text-[10px] leading-none tracking-[0.18em] text-muted">
                LOCAL AI / WEB GENERATION / AGENTIC SYSTEMS
              </p>
              <h3
                className="font-display"
                style={{ fontSize: 'clamp(30px,4.2vw,66px)', lineHeight: 0.96 }}
              >
                HERMES — AI DESIGN INTELLIGENCE PLATFORM
              </h3>
            </div>
          </div>
          <p
            className="min-w-[260px] text-[15px] leading-[1.55] text-pretty text-paper-ink"
            style={{ flex: '0 1 380px' }}
          >
            A local-model platform that researches visual references, extracts design intelligence,
            generates websites, critiques its own output, and improves through iterative feedback.
          </p>
        </div>
        <div
          data-reveal
          className="grid border-l border-t border-ink"
          style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))' }}
        >
          {hermesModules.map((mod) => (
            <div
              key={mod.id}
              className={`flex min-h-[88px] flex-col gap-2 border-b border-r border-ink p-[14px] ${
                mod.state === 'implemented' ? 'bg-ink text-paper' : ''
              }`}
            >
              <span
                className={`font-mono text-[9px] leading-none tracking-[0.14em] ${
                  mod.state === 'experimental' ? 'text-signal' : 'text-muted'
                }`}
              >
                {mod.id} — {mod.state.toUpperCase()}
              </span>
              <span
                className={`font-display text-[17px] leading-[1.1] ${
                  mod.state === 'planned' ? 'text-muted' : ''
                }`}
              >
                {mod.name}
              </span>
            </div>
          ))}
          <Link
            href="/work/hermes"
            className="flex min-h-[88px] flex-col justify-between gap-2 border-b border-r border-ink bg-signal p-[14px] text-paper transition-colors hover:bg-ink"
          >
            <span className="font-mono text-[9px] leading-none tracking-[0.14em]">
              STACK — QWEN · OLLAMA · FASTAPI · TS
            </span>
            <span className="font-display text-[17px] leading-[1.1]">VIEW CASE STUDY →</span>
          </Link>
        </div>
        <p className="mt-3 font-mono text-[9.5px] leading-[1.6] tracking-[0.12em] text-muted">
          FILLED — IMPLEMENTED · RED — EXPERIMENTAL · MUTED — PLANNED
        </p>
      </article>

      {/* ····· 04 · IMAGE-LED EDITORIAL ····· */}
      <article
        className="border-t border-ink bg-paper text-ink"
        style={{ padding: SECTION_PAD }}
      >
        <Link
          href="/work/book-vault"
          aria-label="View case study: AI Book Summarization and Knowledge System"
          className="relative block overflow-hidden border border-ink bg-ink text-paper"
        >
          <div
            data-reveal
            aria-hidden
            className="flex"
            style={{ minHeight: 'clamp(280px,40vw,460px)' }}
          >
            {/* input — BOOK */}
            <div
              className="flex flex-col justify-center gap-2 border-r border-[rgba(241,233,218,0.15)]"
              style={{
                flex: '1.1',
                padding: 'clamp(18px,3vw,36px)',
                background: 'repeating-linear-gradient(90deg,#0d0d0d 0 3px,#080808 3px 26px)',
              }}
            >
              <span className="font-mono text-[9.5px] leading-none tracking-[0.16em] text-muted">
                INPUT — 412 PAGES
              </span>
              <span
                className="font-display"
                style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}
              >
                BOOK
              </span>
              <span className="font-mono text-[9.5px] leading-[1.7] tracking-[0.1em] text-muted">
                TEXT EXTRACTION → OCR FALLBACK →
                <br />
                CHAPTER DETECTION → CHUNKS →
                <br />
                PAGE-CITED SUMMARIES
              </span>
            </div>
            {/* flow arrow */}
            <div
              className="flex items-center justify-center font-display text-signal"
              style={{ flex: '0 0 clamp(48px,6vw,90px)', fontSize: 'clamp(22px,2.6vw,40px)' }}
            >
              →
            </div>
            {/* output — OBSIDIAN VAULT */}
            <div
              className="flex flex-col justify-center gap-[14px]"
              style={{ flex: '1.6', padding: 'clamp(18px,3vw,36px)' }}
            >
              <span className="font-mono text-[9.5px] leading-none tracking-[0.16em] text-muted">
                OUTPUT — OBSIDIAN KNOWLEDGE VAULT
              </span>
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(90px,1fr))' }}
              >
                {vaultChips.map((chip) => (
                  <span
                    key={chip.label}
                    className={`px-[10px] py-[9px] font-mono text-[9px] leading-[1.3] tracking-[0.1em] ${
                      chip.accent
                        ? 'border border-signal text-signal'
                        : 'border border-[rgba(241,233,218,0.3)]'
                    }`}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[9px] leading-[1.5] tracking-[0.12em] text-faint">
                [ VAULT SCREENSHOTS PENDING — SEE ASSET_REQUIREMENTS.MD ]
              </span>
            </div>
          </div>
        </Link>
        <div className="mt-6 flex flex-wrap items-start gap-x-12 gap-y-5">
          <div
            className="flex min-w-[min(100%,300px)]"
            style={{ flex: '1 1 480px', gap: 'clamp(14px,2vw,24px)' }}
          >
            <span aria-hidden className="font-display" style={outlinedNumeral}>
              04
            </span>
            <div>
              <p className="mb-[10px] font-mono text-[10px] leading-none tracking-[0.18em] text-muted">
                LOCAL AI / DOCUMENT INTELLIGENCE / KNOWLEDGE TOOLS
              </p>
              <h3
                className="max-w-[20ch] font-display"
                style={{ fontSize: 'clamp(28px,3.6vw,56px)', lineHeight: 0.98 }}
              >
                AI BOOK SUMMARIZATION &amp; KNOWLEDGE SYSTEM
              </h3>
            </div>
          </div>
          <div className="min-w-[260px]" style={{ flex: '0 1 380px' }}>
            <p className="text-[15px] leading-[1.55] text-pretty text-paper-ink">
              Processes books page by page into story-driven, visually structured Obsidian vaults —
              every claim cited to its page, every run recoverable.
            </p>
            <Link
              href="/work/book-vault"
              className="mt-[14px] inline-flex items-center gap-[10px] font-mono text-[12px] font-medium leading-none tracking-[0.16em] transition-colors hover:text-signal"
            >
              VIEW CASE STUDY{' '}
              <span aria-hidden className="text-signal">
                →
              </span>
            </Link>
          </div>
        </div>
      </article>

      {/* explore all */}
      <Link
        href="/work"
        className="flex items-center justify-center gap-4 border-t border-ink bg-paper p-[26px] font-display text-ink transition-colors hover:bg-signal hover:text-paper"
        style={{ fontSize: 'clamp(22px,2.6vw,36px)', letterSpacing: '.02em' }}
      >
        EXPLORE ALL WORK <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
