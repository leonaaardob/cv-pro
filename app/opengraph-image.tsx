import { ImageResponse } from 'next/og'

export const alt = 'CV Pro — Votre CV réécrit en 30 min pour 12€'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        background: '#0D0D0D',
        padding: '80px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 50% 20%, rgba(26,60,255,0.4), transparent 55%)',
        }}
      />

      {/* Top badge */}
      <div style={{ display: 'flex', position: 'relative' }}>
        <div
          style={{
            background: '#1A3CFF',
            color: '#fff',
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '10px 24px',
            borderRadius: 100,
          }}
        >
          12€ · 30 MIN · OU REMBOURSÉ
        </div>
      </div>

      {/* Main copy */}
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: '#fff',
            lineHeight: 0.9,
            letterSpacing: '-0.05em',
          }}
        >
          CV Pro
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#71717a',
            marginTop: 24,
            lineHeight: 1.3,
            maxWidth: 800,
          }}
        >
          Ton CV réécrit par l'IA. Livré en 30 minutes.
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 32,
        }}
      >
        <div style={{ fontSize: 20, color: '#52525b', fontWeight: 600 }}>
          cvpro.lbframe.com
        </div>
        <div
          style={{
            fontSize: 20,
            color: '#fff',
            background: '#1A3CFF',
            padding: '12px 32px',
            borderRadius: 100,
            fontWeight: 700,
          }}
        >
          Commander →
        </div>
      </div>
    </div>,
    { ...size }
  )
}
