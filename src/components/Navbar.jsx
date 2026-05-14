const PlusIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const RepeatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
)

const StarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const tabs = [
  { id: 'agregar',   label: 'AGREGAR',   Icon: PlusIcon },
  { id: 'repetidas', label: 'REPETIDAS', Icon: RepeatIcon },
  { id: 'faltantes', label: 'FALTANTES', Icon: StarIcon },
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
      {tabs.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            style={{
              flex: 1,
              padding: '10px 0 12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              color: isActive ? '#ff4d6d' : 'rgba(255,255,255,0.35)',
              transition: 'color 0.15s',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 30,
                borderRadius: 9999,
                background: isActive ? 'rgba(255,77,109,0.15)' : 'none',
                transition: 'background 0.15s',
              }}
            >
              <Icon />
            </span>
            <span
              style={{
                fontSize: 9,
                letterSpacing: 0.5,
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
