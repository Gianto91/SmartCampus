import { Link } from 'react-router-dom'
import { MessageCircle, Globe, BarChart3, Users } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ucin-primary to-ucin-secondary">
      {/* Header */}
      <header className="bg-ucin-primary/95 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container-page flex justify-between items-center">
          <div className="text-2xl font-bold text-white">📚 SmartCampus OmniDesk</div>
          <div className="space-x-4">
            <a href="#features" className="text-ucin-light hover:text-white transition">Features</a>
            <Link to="/admin" className="btn-primary">Portal Admin</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container-page py-20 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Gestión de Incidencias Omnicanal</h1>
        <p className="text-xl text-ucin-light mb-8">
          Plataforma inteligente con IA para la Universidad Científica del Norte (UCIN)
        </p>
        <div className="space-x-4">
          <Link to="/student/chat" className="btn-primary inline-block">
            👨‍🎓 Estudiantes (WhatsApp)
          </Link>
          <Link to="/teacher/chat" className="btn-primary inline-block">
            👨‍🏫 Docentes (WhatsApp)
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white py-16">
        <div className="container-page">
          <h2 className="text-3xl font-bold text-center mb-12">Características Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: MessageCircle,
                title: 'Chat IA',
                description: 'Autoatención inteligente 24/7'
              },
              {
                icon: Globe,
                title: 'Omnicanal',
                description: 'WhatsApp, Portal Web y Email'
              },
              {
                icon: BarChart3,
                title: 'SLA Automático',
                description: 'Cumplimiento de tiempos de respuesta'
              },
              {
                icon: Users,
                title: 'Dashboard',
                description: 'Visualización en tiempo real'
              }
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="card text-center">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-ucin-primary" />
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ucin-primary/5 py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-ucin-primary">45%</div>
              <p className="text-gray-600">Reducción de tickets Nivel 1</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-ucin-primary">100%</div>
              <p className="text-gray-600">Trazabilidad de tickets</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-ucin-primary">&lt;15 min</div>
              <p className="text-gray-600">Asignación de críticos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ucin-primary/95 text-white py-8">
        <div className="container-page text-center">
          <p>© 2026 SmartCampus UCIN | Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  )
}
