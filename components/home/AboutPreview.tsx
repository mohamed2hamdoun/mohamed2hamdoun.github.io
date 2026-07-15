import Link from 'next/link';

/**
 * ABOUT PREVIEW (paper, two-column). Ported from the approved design
 * (Home.dc.html §About Preview). Bio copy is first-person, verbatim from source.
 */
export default function AboutPreview() {
  return (
    <section
      aria-label="About"
      className="bg-paper text-ink border-t border-ink"
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {/* portrait */}
      <div
        style={{
          flex: '0 1 340px',
          minWidth: 'min(100%,260px)',
          borderRight: '1px solid rgba(8,8,8,0.25)',
          position: 'relative',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/portrait-bw.png"
          alt="Mohamed Hamdoun, black-and-white portrait"
          className="object-cover"
          style={{ display: 'block', width: '100%', height: '100%', minHeight: '320px', filter: 'contrast(1.05)' }}
        />
        <span
          className="font-mono bg-ink text-paper"
          style={{
            position: 'absolute',
            left: '12px',
            bottom: '12px',
            padding: '8px 12px',
            fontSize: '9.5px',
            lineHeight: 1,
            letterSpacing: '0.16em',
          }}
        >
          FIG — THE HUMAN IN THE LOOP
        </span>
      </div>

      {/* text */}
      <div
        style={{
          flex: '1 1 480px',
          minWidth: 'min(100%,300px)',
          padding: 'clamp(32px,5vh,64px) clamp(16px,3vw,40px)',
        }}
      >
        <h2
          className="font-display"
          style={{ margin: '0 0 18px', fontSize: 'clamp(30px,4vw,60px)', lineHeight: 1 }}
        >
          ABOUT
        </h2>
        <p style={{ margin: 0, fontSize: 'clamp(16px,1.5vw,20px)', lineHeight: 1.6, maxWidth: '56ch', textWrap: 'pretty' }}>
          I’m Mohamed Hamdoun, an Artificial Intelligence undergraduate based in the UAE. My work sits
          between intelligent systems, applied research, web development, and visual storytelling. I began
          with filmmaking and video editing, then moved deeper into software, machine learning, and agentic
          systems.
        </p>
        <p
          className="font-serif text-signal"
          style={{
            margin: '14px 0 0',
            fontStyle: 'italic',
            fontSize: 'clamp(17px,1.6vw,22px)',
            lineHeight: 1.5,
            maxWidth: '44ch',
          }}
        >
          Complex systems should not only work; they should communicate clearly.
        </p>
        <div
          className="font-mono text-muted"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0 28px',
            margin: '26px 0 0',
            fontWeight: 400,
            fontSize: '10.5px',
            lineHeight: 2.1,
            letterSpacing: '0.1em',
          }}
        >
          <span>FILMMAKING → SOFTWARE</span>
          <span className="text-signal">→</span>
          <span>ML RESEARCH → PUBLICATION</span>
          <span className="text-signal">→</span>
          <span>AGENTIC SYSTEMS → NOW</span>
        </div>
        <Link
          href="/about"
          className="font-mono border border-ink hover:bg-ink hover:text-paper"
          style={{
            marginTop: '22px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: '0.16em',
            padding: '14px 22px',
            minHeight: '44px',
            boxSizing: 'border-box',
          }}
        >
          FULL STORY →
        </Link>
      </div>
    </section>
  );
}
