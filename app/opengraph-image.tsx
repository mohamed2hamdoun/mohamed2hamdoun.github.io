import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

// Site-wide social-preview image (applies to all routes that don't define their own).
export const alt = `${site.name} — AI Systems Developer, Researcher, Creative Technologist`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#080808',
          color: '#F1E9DA',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, letterSpacing: 6, color: '#918B82' }}>
          <span>MH — PORTFOLIO</span>
          <span style={{ color: '#E5242A' }}>INTELLIGENCE, DESIGNED.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 0.92, letterSpacing: -2 }}>
            MOHAMED
          </div>
          <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 0.92, letterSpacing: -2 }}>
            HAMDOUN
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 28, gap: 20 }}>
            <div style={{ width: 64, height: 8, background: '#E5242A' }} />
            <div style={{ fontSize: 30, letterSpacing: 4, color: '#F1E9DA' }}>
              AI SYSTEMS DEVELOPER · RESEARCHER · CREATIVE TECHNOLOGIST
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, letterSpacing: 4, color: '#918B82' }}>
          <span>BASED IN THE UAE</span>
          <span style={{ color: '#E5242A' }}>AVAILABLE FOR SELECTED PROJECTS</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
