const tabs = [
  { id: 'agregar',   label: 'AGREGAR',   icon: '➕' },
  { id: 'repetidas', label: 'REPETIDAS', icon: '🔁' },
  { id: 'faltantes', label: 'FALTANTES', icon: '⭐' },
]

export default function Navbar({ active, onChange }) {
  return (
    <nav
      style={{
        background: '#111130',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        position: 'sticky',
        bottom: 0,
        zIndex: 50,
      }}
    >
      {tabs.map(tab => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1,
              padding: '10px 0 12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <span
              style={{
                fontSize: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 28,
                borderRadius: 9999,
                background: isActive ? 'rgba(255,77,109,0.15)' : 'none',
                transition: 'background 0.15s',
              }}
            >
              {tab.icon}
            </span>
            <span
              style={{
                fontSize: 9,
                letterSpacing: 0.5,
                fontWeight: 600,
                color: isActive ? '#ff4d6d' : 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                transition: 'color 0.15s',
              }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
