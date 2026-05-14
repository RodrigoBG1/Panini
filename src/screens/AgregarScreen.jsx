import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { COUNTRIES, TOTAL_STICKERS } from '../data/countries'
import ProgressBar from '../components/ProgressBar'

export default function AgregarScreen({ showToast }) {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedNumber, setSelectedNumber] = useState('')
  const [currentSticker, setCurrentSticker] = useState(null)
  const [loading, setLoading] = useState(false)
  const [ownedCount, setOwnedCount] = useState(0)

  const country = COUNTRIES.find(c => c.code === selectedCountry)
  const playerNumbers = country ? Array.from({ length: country.count }, (_, i) => i + 1) : []

  useEffect(() => {
    fetchOwnedCount()
  }, [])

  useEffect(() => {
    if (selectedCountry) setSelectedNumber('')
    setCurrentSticker(null)
  }, [selectedCountry])

  useEffect(() => {
    if (selectedCountry && selectedNumber) fetchSticker()
    else setCurrentSticker(null)
  }, [selectedCountry, selectedNumber])

  async function fetchOwnedCount() {
    const { count } = await supabase
      .from('stickers')
      .select('*', { count: 'exact', head: true })
      .gte('quantity', 1)
    setOwnedCount(count ?? 0)
  }

  async function fetchSticker() {
    const { data } = await supabase
      .from('stickers')
      .select('*')
      .eq('country_code', selectedCountry)
      .eq('player_number', parseInt(selectedNumber))
      .single()
    setCurrentSticker(data)
  }

  async function handleAdd() {
    if (!selectedCountry || !selectedNumber || loading) return
    setLoading(true)
    try {
      const { data: updated } = await supabase
        .from('stickers')
        .update({ quantity: (currentSticker?.quantity ?? 0) + 1 })
        .eq('country_code', selectedCountry)
        .eq('player_number', parseInt(selectedNumber))
        .select()
        .single()

      const newQty = updated?.quantity ?? 1
      if (newQty === 1) {
        showToast('Estampa agregada ✓', 'added')
        setOwnedCount(prev => prev + 1)
      } else {
        showToast(`¡Marcada como repetida! ×${newQty}`, 'repeated')
      }
      setCurrentSticker(updated)
    } finally {
      setLoading(false)
    }
  }

  const isAlreadyOwned = currentSticker && currentSticker.quantity >= 1
  const isRepeated = currentSticker && currentSticker.quantity >= 2

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <ProgressBar owned={ownedCount} />

      <div style={{ padding: '20px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Country selector */}
        <div>
          <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 8 }}>
            País / Colección
          </label>
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            style={{
              width: '100%',
              background: '#1a1a38',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: selectedCountry ? '#fff' : 'rgba(255,255,255,0.35)',
              fontSize: 15,
              padding: '13px 40px 13px 14px',
              cursor: 'pointer',
            }}
          >
            <option value="" disabled style={{ color: '#666' }}>Seleccionar país...</option>
            {COUNTRIES.map(c => (
              <option key={c.code} value={c.code} style={{ color: '#fff', background: '#1a1a38' }}>
                {c.flag} {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Player number selector */}
        <div>
          <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 8 }}>
            Número de estampa
          </label>
          <select
            value={selectedNumber}
            onChange={e => setSelectedNumber(e.target.value)}
            disabled={!selectedCountry}
            style={{
              width: '100%',
              background: '#1a1a38',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: selectedNumber ? '#fff' : 'rgba(255,255,255,0.35)',
              fontSize: 15,
              padding: '13px 40px 13px 14px',
              cursor: selectedCountry ? 'pointer' : 'not-allowed',
              opacity: selectedCountry ? 1 : 0.5,
            }}
          >
            <option value="" disabled style={{ color: '#666' }}>Seleccionar número...</option>
            {playerNumbers.map(n => (
              <option key={n} value={n} style={{ color: '#fff', background: '#1a1a38' }}>
                #{n}
              </option>
            ))}
          </select>
        </div>

        {/* Status badge */}
        {currentSticker && selectedNumber && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: isRepeated
                ? 'rgba(255,77,109,0.12)'
                : isAlreadyOwned
                ? 'rgba(34,197,94,0.1)'
                : 'rgba(255,255,255,0.05)',
              border: `1px solid ${isRepeated ? 'rgba(255,77,109,0.3)' : isAlreadyOwned ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)'}`,
              fontSize: 13,
              color: isRepeated ? '#ff4d6d' : isAlreadyOwned ? '#4ade80' : 'rgba(255,255,255,0.5)',
              fontWeight: 600,
            }}
          >
            {isRepeated
              ? `⚠️ Ya tienes esta estampa (×${currentSticker.quantity})`
              : isAlreadyOwned
              ? '✓ Ya la tienes — se marcará como repetida'
              : '— Estampa faltante'}
          </div>
        )}

        {/* CTA button */}
        <button
          onClick={handleAdd}
          disabled={!selectedCountry || !selectedNumber || loading}
          className="btn-cta"
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: 12,
            border: 'none',
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            cursor: (!selectedCountry || !selectedNumber || loading) ? 'not-allowed' : 'pointer',
            opacity: (!selectedCountry || !selectedNumber) ? 0.4 : 1,
            marginTop: 4,
            letterSpacing: 0.5,
          }}
        >
          {loading ? 'Guardando...' : 'AGREGAR ESTAMPA'}
        </button>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          {[
            { label: 'TOTAL', value: TOTAL_STICKERS },
            { label: 'TENGO', value: ownedCount },
            { label: 'FALTAN', value: TOTAL_STICKERS - ownedCount },
          ].map(s => (
            <div
              key={s.label}
              style={{
                flex: 1,
                background: '#1a1a38',
                borderRadius: 10,
                padding: '12px 8px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
