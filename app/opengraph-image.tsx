import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SidebyStar · Ambient Intelligence OS';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'radial-gradient(ellipse 90% 60% at 50% 0%, #4B6BFB 0%, rgba(177,156,244,0.5) 30%, transparent 60%), linear-gradient(180deg, #05060A 0%, #0B0F1E 100%)',
          color: '#ffffff',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 22, color: '#B19CF4' }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#7DD3FC',
              boxShadow: '0 0 20px #7DD3FC',
            }}
          />
          SidebyStar · Ambient Intelligence OS
        </div>

        <div
          style={{
            fontSize: 96,
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            maxWidth: 960,
            display: 'flex',
          }}
        >
          The space knows you. Privately.
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#A2ABC2' }}>
          <div>Local-First · Auditable · Federated</div>
          <div>sidebystar.com</div>
        </div>
      </div>
    ),
    size
  );
}
