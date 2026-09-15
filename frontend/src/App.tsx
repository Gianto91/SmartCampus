import { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppProvider } from '@/context/AppContext'
import { AuthProvider, AuthContext } from '@/context/AuthContext'

// Pages
import PortalAyuda from '@/pages/PortalAyuda'
import CentroAyuda from '@/pages/CentroAyuda'
import MisTickets from '@/pages/MisTickets'
import Login from '@/pages/Login'
import GoogleLogin from '@/pages/GoogleLogin'
import EmailLogin from '@/pages/EmailLogin'
import DashboardAdmin from '@/pages/DashboardAdmin'
import AdminTicketsPanel from '@/pages/AdminTicketsPanel'
import DashboardAgente from '@/pages/DashboardAgente'
import DashboardGerencial from '@/pages/DashboardGerencial'

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const context = useContext(AuthContext)
  if (!context?.isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

function AppContent() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/login/google" element={<GoogleLogin />} />
        <Route path="/login/email" element={<EmailLogin />} />

        {/* Portal Principal */}
        <Route path="/" element={<PortalAyuda />} />
        <Route path="/centro-ayuda" element={<CentroAyuda />} />
        <Route path="/mis-tickets" element={<MisTickets />} />

        {/* Admin - Protected */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tickets"
          element={
            <ProtectedRoute>
              <AdminTicketsPanel />
            </ProtectedRoute>
          }
        />

        {/* Soporte - Protected */}
        <Route
          path="/soporte/agente"
          element={
            <ProtectedRoute>
              <DashboardAgente />
            </ProtectedRoute>
          }
        />

        {/* Gerencia - Protected */}
        <Route
          path="/gerencia/dashboard"
          element={
            <ProtectedRoute>
              <DashboardGerencial />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

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
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  )
}

export default App
