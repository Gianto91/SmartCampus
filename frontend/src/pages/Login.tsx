import { useNavigate } from 'react-router-dom'
import { Mail, Chrome } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
            UC|N
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">SmartCampus OmniDesk</h1>
        <p className="text-gray-600 text-center mb-8">Portal Administrativo</p>

        {/* Google Login */}
        <button
          onClick={() => navigate('/login/google')}
          className="w-full bg-white border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-900 font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-3 mb-4"
        >
          <Chrome className="w-5 h-5 text-blue-600" />
          Iniciar con Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">O</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Email Login */}
        <button
          onClick={() => navigate('/login/email')}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
        >
          <Mail className="w-5 h-5" />
          Iniciar con Email
        </button>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a href="/" className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
            ← Volver al Portal Principal
          </a>
        </div>
      </div>
    </div>
  )
}
