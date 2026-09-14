import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chrome, Mail, ArrowLeft } from 'lucide-react'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

export default function GoogleLogin() {
  const navigate = useNavigate()
  const context = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simular verificación de cuenta Google
    setTimeout(() => {
      // Para demo, aceptamos cualquier email
      if (email.includes('@')) {
        // Crear usuario automáticamente con Google
        if (context) {
          const googleUser = context.loginWithGoogle(email)
          if (googleUser) {
            navigate('/admin/dashboard')
          } else {
            setError('No se pudo autenticar con Google')
          }
        }
      } else {
        setError('Por favor ingresa un email válido')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
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
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
            <Chrome className="w-10 h-10" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Iniciar con Google</h1>
        <p className="text-gray-600 text-center mb-6">Usa tu cuenta Google para acceder</p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleGoogleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Google</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu.correo@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Info */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700">
              <strong>ℹ️ Demo:</strong> Ingresa cualquier email con formato válido para continuar
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Autenticando...
              </>
            ) : (
              <>
                <Chrome className="w-5 h-5" />
                Continuar con Google
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">O</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Email Login Link */}
        <button
          onClick={() => navigate('/login/email')}
          className="w-full border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 text-gray-900 font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Iniciar con Email
        </button>
      </div>
    </div>
  )
}
