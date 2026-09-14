import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
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
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-600">
            <p className="text-gray-600 text-sm">% Autoatención IA</p>
            <p className="text-4xl font-bold text-purple-600">78.4%</p>
            <p className="text-sm text-green-600 mt-2">↑ 2.3% vs mes anterior</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm">Consultas Totales</p>
            <p className="text-4xl font-bold text-blue-600">14,290</p>
            <p className="text-sm text-gray-600 mt-2">Septiembre 2026</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-600">
            <p className="text-gray-600 text-sm">Tickets Generados</p>
            <p className="text-4xl font-bold text-red-600">3,141</p>
            <p className="text-sm text-gray-600 mt-2">31.9% escalan a humano</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-600">
            <p className="text-gray-600 text-sm">CSAT Promedio</p>
            <p className="text-4xl font-bold text-yellow-600">4.6 ★</p>
            <p className="text-sm text-gray-600 mt-2">sobre 5.0</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Tendencia de Consultas */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tendencia de Consultas</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={consultasData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="consultas" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="resueltos" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Distribución por Hora */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Distribución por Hora del Día</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={horasData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Brechas de Conocimiento */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Brechas de Conocimiento</h3>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
              + Crear FAQ Nuevo
            </button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Tema detectado</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Frecuencia</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Cobertura IA</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">Problemas Sincronización RH</td>
                <td className="px-4 py-3 font-bold">342 consultas</td>
                <td className="px-4 py-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-semibold">
                    Entrenar IA / Crear FAQ
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
