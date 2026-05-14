import { countryByCode } from '../data/countries'

export default function StickerCard({ sticker }) {
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

    </div>
  )
}
