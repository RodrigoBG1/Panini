export default function Header() {
  return (
    <header className="header-gradient px-5 pt-10 pb-5">
      <p style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', margin: 0 }}>
        FIFA WORLD CUP 2026
      </p>
      <h1
        style={{
          fontWeight: 900,
          fontStyle: 'italic',
          fontSize: 30,
          letterSpacing: 2,
          margin: '2px 0 0',
          color: '#fff',
          textShadow: '0 0 20px rgba(200,16,46,0.7)',
          lineHeight: 1,
        }}
      >
        BONIGUT
      </h1>
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: '4px 0 0', letterSpacing: 1, textTransform: 'uppercase' }}>
        ALBUM OFICIAL DE ESTAMPAS
      </p>
    </header>
  )
}
