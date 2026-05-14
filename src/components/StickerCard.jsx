import { countryByCode } from '../data/countries'

export default function StickerCard({ sticker, onAdd }) {
  const country = countryByCode[sticker.country_code]
  const isOwned = sticker.quantity >= 1
  const isRepeated = sticker.quantity >= 2

  return (
    <div
      style={{
        background: '#1a1a38',
        borderRadius: 12,
        border: `1px solid ${isOwned ? 'rgba(198,16,46,0.4)' : 'rgba(255,255,255,0.06)'}`,
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        position: 'relative',
        minWidth: 0,
      }}
    >
      <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>
        {country?.flag ?? '🏳️'}
      </span>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
          {sticker.country_code} — #{sticker.player_number}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {country?.name ?? sticker.country_code}
        </div>
      </div>

      {isRepeated && (
        <div
          style={{
            background: '#C8102E',
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            width: 22,
            height: 22,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          ×{sticker.quantity}
        </div>
      )}

      {onAdd && (
        <button
          onClick={onAdd}
          style={{
            background: 'linear-gradient(135deg, #C8102E, #8b0000)',
            border: 'none',
            borderRadius: 8,
            color: '#fff',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      )}
    </div>
  )
}
