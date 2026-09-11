import { Link } from 'react-router-dom'

export default function AdminLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-ucin-primary text-white px-6 py-4">
        <h1 className="text-2xl font-bold">Portal Administrativo - SmartCampus</h1>
      </header>
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <Link to="/admin/tickets" className="card hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">Mis Tickets</h3>
            <p className="text-gray-600">Ver y gestionar tus solicitudes</p>
          </Link>
          <Link to="/admin/faq" className="card hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">FAQs</h3>
            <p className="text-gray-600">Base de conocimiento institucional</p>
          </Link>
          <div className="card">
            <h3 className="font-bold text-lg mb-2">Chat de Soporte</h3>
            <p className="text-gray-600">Contactar con agentes N1/N2</p>
          </div>
        </div>
      </div>
    </div>
  )
}
