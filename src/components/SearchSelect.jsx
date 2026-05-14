import { useState, useRef, useEffect } from 'react'

export default function SearchSelect({ options, value, onChange, placeholder, disabled }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  const selected = options.find(o => o.value === value)

  const filtered = query
    ? options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))
    : options

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  function handleOpen() {
    if (disabled) return
    setOpen(true)
    setQuery('')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function handleSelect(opt) {
    onChange(opt.value)
    setOpen(false)
    setQuery('')
  }

  function handleClear(e) {
    e.stopPropagation()
    onChange('')
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Trigger */}
      <div
        onClick={handleOpen}
        style={{
          background: '#1a1a38',
          border: `1px solid ${open ? 'rgba(200,16,46,0.5)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: open ? '10px 10px 0 0' : 10,
          padding: '13px 40px 13px 14px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.45 : 1,
          position: 'relative',
          transition: 'border-color 0.15s',
          userSelect: 'none',
        }}
      >
        <span style={{ fontSize: 15, color: selected ? '#fff' : 'rgba(255,255,255,0.35)' }}>
          {selected ? selected.label : placeholder}
        </span>

        {/* Chevron / clear */}
        <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
          {selected && !disabled ? (
            <span
              onClick={handleClear}
              style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, lineHeight: 1, cursor: 'pointer' }}
            >
              ✕
            </span>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
              <path fill="rgba(255,255,255,0.4)" d="M6 8L1 3h10z" />
            </svg>
          )}
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '100%',
            background: '#1a1a38',
            border: '1px solid rgba(200,16,46,0.5)',
            borderTop: 'none',
            borderRadius: '0 0 10px 10px',
            zIndex: 100,
            maxHeight: 240,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Search input */}
          <div style={{ padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar..."
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 7,
                color: '#fff',
                fontSize: 14,
                padding: '7px 10px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Options list */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '12px 14px', fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
                Sin resultados
              </div>
            ) : (
              filtered.map(opt => (
                <div
                  key={opt.value}
                  onMouseDown={() => handleSelect(opt)}
                  onTouchEnd={() => handleSelect(opt)}
                  style={{
                    padding: '11px 14px',
                    fontSize: 14,
                    color: opt.value === value ? '#ff4d6d' : '#fff',
                    background: opt.value === value ? 'rgba(255,77,109,0.1)' : 'none',
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    fontWeight: opt.value === value ? 600 : 400,
                  }}
                  onMouseEnter={e => { if (opt.value !== value) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={e => { if (opt.value !== value) e.currentTarget.style.background = 'none' }}
                >
                  {opt.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
