import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Pages
import PortalAyuda from '@/pages/PortalAyuda'
import CentroAyuda from '@/pages/CentroAyuda'
import MisTickets from '@/pages/MisTickets'
import DashboardAdmin from '@/pages/DashboardAdmin'
import DashboardAgente from '@/pages/DashboardAgente'
import DashboardGerencial from '@/pages/DashboardGerencial'

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Portal Principal */}
          <Route path="/" element={<PortalAyuda />} />
          <Route path="/centro-ayuda" element={<CentroAyuda />} />
          <Route path="/mis-tickets" element={<MisTickets />} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />

          {/* Soporte */}
          <Route path="/soporte/agente" element={<DashboardAgente />} />

          {/* Gerencia */}
          <Route path="/gerencia/dashboard" element={<DashboardGerencial />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
