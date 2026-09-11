import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Pages
import LandingPage from '@/pages/LandingPage'
import StudentChat from '@blocks/students/ChatWhatsAppScreen'
import TeacherChat from '@blocks/teachers/TeacherChatScreen'
import AdminPortal from '@blocks/admin/AdminLandingPage'
import FAQDashboard from '@blocks/faq-manager/FAQDashboard'
import SupportDashboard from '@blocks/ticket-center/SupportDashboard'
import ExecutiveDashboard from '@blocks/executive-dashboard/ExecutiveDashboard'

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Landing Pages */}
          <Route path="/" element={<LandingPage />} />

          {/* Student Block - WhatsApp */}
          <Route path="/student/chat" element={<StudentChat />} />

          {/* Teacher Block - WhatsApp */}
          <Route path="/teacher/chat" element={<TeacherChat />} />

          {/* Admin Block - Portal Web */}
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/admin/tickets" element={<AdminPortal />} />

          {/* FAQ Manager */}
          <Route path="/admin/faq" element={<FAQDashboard />} />

          {/* Support Center - N1/N2 */}
          <Route path="/support/dashboard" element={<SupportDashboard />} />

          {/* Executive Dashboard */}
          <Route path="/executive/dashboard" element={<ExecutiveDashboard />} />

          {/* 404 */}
          <Route path="*" element={<div className="text-center py-16">Página no encontrada</div>} />
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
