import { useState, useCallback } from 'react'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import AgregarScreen from './screens/AgregarScreen'
import RepetidasScreen from './screens/RepetidasScreen'
import FaltantesScreen from './screens/FaltantesScreen'

export default function App() {
  const [activeTab, setActiveTab] = useState('agregar')
  const [toast, setToast] = useState({ visible: false, message: '', type: 'added' })
  const toastTimer = useState(null)

  const showToast = useCallback((message, type = 'added') => {
    if (toastTimer[0]) clearTimeout(toastTimer[0])
    setToast({ visible: true, message, type })
    toastTimer[0] = setTimeout(() => {
      setToast(t => ({ ...t, visible: false }))
    }, 2000)
  }, [])

  return (
    <div className="app-shell">
      <Header />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {activeTab === 'agregar'   && <AgregarScreen   showToast={showToast} />}
        {activeTab === 'repetidas' && <RepetidasScreen />}
        {activeTab === 'faltantes' && <FaltantesScreen showToast={showToast} />}
      </div>

      <Navbar active={activeTab} onChange={setActiveTab} />

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
      />
    </div>
  )
}
