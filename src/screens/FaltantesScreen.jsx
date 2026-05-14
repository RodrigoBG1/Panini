import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { COUNTRIES, TOTAL_STICKERS } from '../data/countries'
import StickerCard from '../components/StickerCard'

export default function FaltantesScreen() {
  const [stickers, setStickers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterCountry, setFilterCountry] = useState('')
  const [search, setSearch] = useState('')
  const [ownedCount, setOwnedCount] = useState(0)

  useEffect(() => {
    fetchMissing()
    fetchOwnedCount()
  }, [])

  async function fetchMissing() {
    setLoading(true)
    const { data } = await supabase
      .from('stickers')
      .select('*')
      .eq('quantity', 0)
      .order('country_code')
      .order('player_number')
    setStickers(data ?? [])
    setLoading(false)
  }

  async function fetchOwnedCount() {
    const { count } = await supabase
      .from('stickers')
      .select('*', { count: 'exact', head: true })
      .gte('quantity', 1)
    setOwnedCount(count ?? 0)
  }

  const filtered = stickers.filter(s => {
    if (filterCountry && s.country_code !== filterCountry) return false
    if (search) {
      const q = search.toLowerCase()
      if (!s.country_code.toLowerCase().includes(q) && !String(s.player_number).includes(q)) return false
    }
    return true
  })

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Progress header */}
      <div
        style={{
          padding: '12px 16px',
          background: '#0d0d24',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
            Completadas
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
            {ownedCount} <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>/ {TOTAL_STICKERS}</span>
          </span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: TOTAL_STICKERS > 0 ? `${(ownedCount / TOTAL_STICKERS * 100).toFixed(2)}%` : '0%' }}
          />
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '12px 16px 8px', background: '#0d0d24', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input
            type="text"
            placeholder="Buscar país o número..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1,
              background: '#1a1a38',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: '#fff',
              fontSize: 14,
              padding: '10px 14px',
              outline: 'none',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{ background: '#1a1a38', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: 'rgba(255,255,255,0.5)', padding: '0 14px', cursor: 'pointer', fontSize: 16 }}
            >
              ✕
            </button>
          )}
        </div>
        <select
          value={filterCountry}
          onChange={e => setFilterCountry(e.target.value)}
          style={{
            width: '100%',
            background: '#1a1a38',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            color: filterCountry ? '#fff' : 'rgba(255,255,255,0.35)',
            fontSize: 14,
            padding: '10px 36px 10px 14px',
            cursor: 'pointer',
          }}
        >
          <option value="" style={{ color: '#666', background: '#1a1a38' }}>Todos los países</option>
          {COUNTRIES.map(c => (
            <option key={c.code} value={c.code} style={{ color: '#fff', background: '#1a1a38' }}>
              {c.flag} {c.code} — {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Counter */}
      <div style={{ padding: '10px 16px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
          Estampas faltantes
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>
          {filtered.length}
        </span>
      </div>

      {/* List */}
      <div className="scroll-area" style={{ flex: 1, padding: '6px 16px 16px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
            Cargando...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{ownedCount === TOTAL_STICKERS ? '🏆' : '⭐'}</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>
              {ownedCount === TOTAL_STICKERS ? '¡Álbum completo!' : 'Sin resultados para tu búsqueda'}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map(s => (
              <StickerCard key={`${s.country_code}-${s.player_number}`} sticker={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
