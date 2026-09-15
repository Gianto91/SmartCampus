import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Ticket, TrendingUp, AlertCircle, Clock, CheckCircle } from 'lucide-react'
import { AuthContext } from '@/context/AuthContext'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const consultasData = [
  { name: 'Jun', consultas: 8000, resueltos: 7000 },
  { name: 'Jul', consultas: 9000, resueltos: 8100 },
  { name: 'Ago', consultas: 10000, resueltos: 9200 },
  { name: 'Sep', consultas: 14290, resueltos: 11146 },
]

const horasData = [
  { name: '8-8', value: 400 },
  { name: '8-10', value: 1600 },
  { name: '10-12', value: 2800 },
  { name: '12-14', value: 1000 },
  { name: '14-16', value: 2600 },
  { name: '16-18', value: 1200 },
  { name: '18-20', value: 600 },
  { name: '20-22', value: 200 },
]

const COLORS = ['#8b5cf6', '#6366f1', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b']

export default function DashboardAdmin() {
  const navigate = useNavigate()
  const context = useContext(AuthContext)

  const handleLogout = () => {
    context?.logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Auth */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center text-white font-bold">
              UC|N
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-xs text-gray-600">SmartCampus UCIN</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/tickets')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition text-sm font-semibold"
            >
              <Ticket className="w-4 h-4" />
              Panel de Tickets
            </button>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{context?.user?.nombre}</p>
              <p className="text-xs text-gray-600">{context?.user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition text-sm font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Cerrar
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Panel de Control</h2>
            <p className="text-gray-600">Septiembre 2026 — Métricas y Análisis</p>
          </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-sm border border-purple-200 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 text-sm font-semibold">IA Autoatención</p>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-4xl font-bold text-purple-600">78.4%</p>
            <p className="text-sm text-green-600 mt-2 font-semibold">↑ 2.3% vs anterior</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm border border-blue-200 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 text-sm font-semibold">Consultas</p>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-4xl font-bold text-blue-600">14,290</p>
            <p className="text-sm text-gray-600 mt-2">Septiembre 2026</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg shadow-sm border border-orange-200 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 text-sm font-semibold">Tickets</p>
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-4xl font-bold text-orange-600">3,141</p>
            <p className="text-sm text-gray-600 mt-2">31.9% escalados</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-sm border border-green-200 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 text-sm font-semibold">Satisfacción</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-4xl font-bold text-green-600">4.6/5.0</p>
            <p className="text-sm text-gray-600 mt-2">CSAT Promedio</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Tendencia de Consultas */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">📈 Tendencia de Consultas</h3>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">Últimos 4 meses</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={consultasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #d1d5db' }}
                  cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="consultas" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 4 }} />
                <Line type="monotone" dataKey="resueltos" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Distribución por Hora */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">🕐 Distribución Horaria</h3>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">Hoy</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={horasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #d1d5db' }}
                  cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Brechas de Conocimiento */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">📚 Brechas de Conocimiento</h3>
              <p className="text-sm text-gray-600 mt-1">Temas detectados sin respuesta en FAQ</p>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2">
              + Crear FAQ
            </button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Tema Detectado</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Frecuencia</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Cobertura FAQ</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">🔄 Sincronización RH</td>
                <td className="px-6 py-4">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">342 consultas</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">12%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                    Crear FAQ
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  )
}
