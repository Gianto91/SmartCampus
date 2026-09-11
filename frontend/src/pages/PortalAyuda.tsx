import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, HelpCircle, BookOpen, Users, Zap, LogIn } from 'lucide-react'

const categories = [
  { id: 'todos', label: 'Todos', color: 'bg-purple-600' },
  { id: 'docentes', label: 'Docentes', color: 'bg-blue-600' },
  { id: 'estudiantes', label: 'Estudiantes', color: 'bg-green-600' },
  { id: 'rrhh', label: 'RRHH', color: 'bg-pink-600' },
  { id: 'ti', label: 'TI', color: 'bg-orange-600' },
]

const services = [
  {
    icon: '📋',
    title: 'Marcaciones y Asistencia',
    description: 'Registro, regularización y validación de marcaciones RRHH',
    link: '#',
  },
  {
    icon: '🎓',
    title: 'Aula Virtual Canvas',
    description: 'Acceso, NRC, sincronización y soporte Canvas LMS',
    link: '#',
  },
  {
    icon: '💳',
    title: 'Pagos y Matrícula',
    description: 'Estados de pagos, vouchers y acceso al portal académico',
    link: '#',
  },
  {
    icon: '🔑',
    title: 'Cuentas y Accesos',
    description: 'Contraseña, SSO, correo institucional y permisos',
    link: '#',
  },
  {
    icon: '🏛️',
    title: 'Sistema Banner Ellucian',
    description: 'Reportes académicos, notas e historial estudiantil',
    link: '#',
  },
  {
    icon: '🛠️',
    title: 'Soporte Técnico General',
    description: 'Incidencias de software, red y equipos institucionales',
    link: '#',
  },
]

export default function PortalAyuda() {
  const [activeCategory, setActiveCategory] = useState('todos')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center text-white font-bold text-lg">
              UC|N
            </div>
            <h1 className="text-xl font-bold text-gray-900">Portal de Ayuda SmartCampus</h1>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
            <LogIn className="w-4 h-4" />
            Iniciar sesión con Google
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <HelpCircle className="w-10 h-10" />
            <h2 className="text-3xl font-bold">¿En qué podemos ayudarte?</h2>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busco problema o escribo una palabra clave..."
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <button className="bg-purple-800 hover:bg-purple-900 px-6 py-3 rounded-lg font-semibold transition">
              Buscar
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 mt-6 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  activeCategory === cat.id
                    ? 'bg-white text-purple-600'
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={i} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border border-gray-200 cursor-pointer hover:border-purple-300">
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              <Link
                to="/centro-ayuda"
                className="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-1"
              >
                Ver artículos →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Chat Button */}
      <Link
        to="/centro-ayuda"
        className="fixed bottom-6 right-6 w-16 h-16 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition text-2xl"
      >
        💬
      </Link>
    </div>
  )
}
