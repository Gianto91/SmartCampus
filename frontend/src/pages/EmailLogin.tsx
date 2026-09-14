import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, AlertCircle, Chrome, ArrowLeft } from 'lucide-react'
import { AuthContext } from '@/context/AuthContext'

export default function EmailLogin() {
  const navigate = useNavigate()
  const context = useContext(AuthContext)
  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (context && context.login(email, password)) {
        navigate('/admin/dashboard')
      } else {
        setError('Email o contraseña incorrectos')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate('/login')}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
            UC|N
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">SmartCampus OmniDesk</h1>
        <p className="text-gray-600 text-center mb-6">Portal Administrativo</p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Iniciar Sesión
              </>
            )}
          </button>
        </form>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-semibold text-blue-700 mb-2">🔓 CREDENCIALES DE DEMO</p>
          <p className="text-xs text-blue-600 mb-1">
            <strong>Email:</strong> admin@gmail.com
          </p>
          <p className="text-xs text-blue-600">
            <strong>Contraseña:</strong> admin123
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">O</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Login Link */}
        <button
          onClick={() => navigate('/login/google')}
          className="w-full border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-900 font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
        >
          <Chrome className="w-4 h-4 text-blue-600" />
          Iniciar con Google
        </button>
      </div>
    </div>
  )
}
