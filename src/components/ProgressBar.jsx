import { TOTAL_STICKERS } from '../data/countries'

export default function ProgressBar({ owned }) {
  const pct = TOTAL_STICKERS > 0 ? (owned / TOTAL_STICKERS) * 100 : 0

  return (
    <div style={{ padding: '12px 16px 14px', background: '#0d0d24' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
          Progreso
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
          {owned} <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>/ {TOTAL_STICKERS}</span>
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct.toFixed(2)}%` }} />
      </div>
      <div style={{ textAlign: 'right', marginTop: 4, fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
        {pct.toFixed(1)}% completo
      </div>
    </div>
  )
}
