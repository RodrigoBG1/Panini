import { useEffect, useState } from 'react'

export default function Toast({ message, type, visible }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (!visible) return
    setExiting(false)
    const t = setTimeout(() => setExiting(true), 1700)
    return () => clearTimeout(t)
  }, [visible, message])

  if (!visible) return null

  const accent = type === 'repeated'
    ? 'rgba(255,77,109,0.25)'
    : 'rgba(34,197,94,0.2)'
  const border = type === 'repeated'
    ? 'rgba(255,77,109,0.5)'
    : 'rgba(34,197,94,0.4)'

  return (
    <div
      className={exiting ? 'toast-exit' : 'toast-enter'}
      style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999,
        background: `rgba(17,17,48,0.92)`,
        backdropFilter: 'blur(8px)',
        border: `1px solid ${border}`,
        padding: '10px 20px',
        borderRadius: 9999,
        fontSize: 14,
        fontWeight: 600,
        color: '#fff',
        boxShadow: `0 4px 20px ${accent}`,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}
    >
      {message}
    </div>
  )
}
