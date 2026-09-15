import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Plus, Eye, Clock, AlertCircle } from 'lucide-react'
import { AppContext } from '@/context/AppContext'
import SLAIndicator from '@/components/SLAIndicator'

interface Ticket {
  id: string
  asunto: string
  estado: 'ABIERTO' | 'EN_REVISIÓN' | 'ESCALADO_N2' | 'ATENDIDO'
  fecha: string
  prioridad: 'ALTA' | 'NORMAL' | 'BAJA'
  categoria: string
  notaEspecialista?: string
  slaVencimiento?: string
}

const getStatusColor = (estado: string) => {
  switch (estado) {
    case 'ABIERTO':
      return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'ABIERTO' }
    case 'EN_REVISIÓN':
      return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'EN REVISIÓN' }
    case 'ESCALADO_N2':
      return { bg: 'bg-orange-100', text: 'text-orange-700', label: 'ESCALADO N2' }
    case 'ATENDIDO':
      return { bg: 'bg-green-100', text: 'text-green-700', label: 'ATENDIDO' }
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700', label: estado }
  }
}

const getPriorityColor = (prioridad: string) => {
  switch (prioridad) {
    case 'ALTA':
      return 'bg-red-100 text-red-700'
    case 'NORMAL':
      return 'bg-blue-100 text-blue-700'
    case 'BAJA':
      return 'bg-green-100 text-green-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export default function AdminTicketsPanel() {
  const navigate = useNavigate()
  const context = useContext(AppContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterState, setFilterState] = useState<string>('TODOS')
  const [filterPriority, setFilterPriority] = useState<string>('TODAS')
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [newNote, setNewNote] = useState('')

  if (!context) {
    return <div>Error: AppContext no disponible</div>
  }

  const { tickets, updateTicketStatus, updateTicketNote } = context

  // Filtrar tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.asunto.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesState = filterState === 'TODOS' || ticket.estado === filterState

    const matchesPriority = filterPriority === 'TODAS' || ticket.prioridad === filterPriority

    return matchesSearch && matchesState && matchesPriority
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de Tickets</h1>
              <p className="text-sm text-gray-600">Gestión centralizada de incidencias</p>
            </div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-gray-600 hover:text-gray-900 text-sm font-semibold"
            >
              ← Volver al Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Buscar por código o asunto
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ej: #TK-8022 o 'Error en descarga'"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            {/* Filtro Estado */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Estado
              </label>
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="TODOS">Todos</option>
                <option value="ABIERTO">Abierto</option>
                <option value="EN_REVISIÓN">En Revisión</option>
                <option value="ESCALADO_N2">Escalado N2</option>
                <option value="ATENDIDO">Atendido</option>
              </select>
            </div>

            {/* Filtro Prioridad */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <AlertCircle className="w-4 h-4 inline mr-1" />
                Prioridad
              </label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="TODAS">Todas</option>
                <option value="ALTA">Alta</option>
                <option value="NORMAL">Normal</option>
                <option value="BAJA">Baja</option>
              </select>
            </div>
          </div>

          {/* Resultados */}
          <div className="mt-4 text-sm text-gray-600">
            Mostrando <span className="font-bold">{filteredTickets.length}</span> de{' '}
            <span className="font-bold">{tickets.length}</span> tickets
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No se encontraron tickets con esos criterios</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Código</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Asunto</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Categoría</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Prioridad</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Estado</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">SLA</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTickets.map((ticket) => {
                  const statusColor = getStatusColor(ticket.estado)
                  return (
                    <tr key={ticket.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <span className="text-purple-600 font-bold">{ticket.id}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-medium">{ticket.asunto}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{ticket.categoria}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.prioridad)}`}>
                          {ticket.prioridad}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor.bg} ${statusColor.text}`}
                        >
                          {statusColor.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <SLAIndicator slaVencimiento={ticket.slaVencimiento} estado={ticket.estado} compact />
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedTicket(ticket)}
                          className="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          Ver
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 flex justify-between items-center sticky top-0">
              <div>
                <h2 className="text-xl font-bold">{selectedTicket.id}</h2>
                <p className="text-purple-200">{selectedTicket.asunto}</p>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="hover:bg-purple-500 p-1 rounded transition"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* SLA Alert */}
              <div>
                <SLAIndicator slaVencimiento={selectedTicket.slaVencimiento} estado={selectedTicket.estado} />
              </div>

              {/* Información */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 uppercase tracking-wide">Estado</p>
                  <p className="text-lg font-bold text-gray-900">
                    {getStatusColor(selectedTicket.estado).label}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 uppercase tracking-wide">Prioridad</p>
                  <p className="text-lg font-bold text-gray-900">{selectedTicket.prioridad}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 uppercase tracking-wide">Categoría</p>
                  <p className="text-lg font-bold text-gray-900">{selectedTicket.categoria}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 uppercase tracking-wide">Fecha</p>
                  <p className="text-lg font-bold text-gray-900">{selectedTicket.fecha}</p>
                </div>
              </div>

              {/* Cambiar Estado */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Cambiar Estado</h3>
                <div className="flex gap-2 flex-wrap">
                  {['EN_REVISIÓN', 'ESCALADO_N2', 'ATENDIDO'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        updateTicketStatus(selectedTicket.id, status)
                        setSelectedTicket({ ...selectedTicket, estado: status as any })
                      }}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition font-semibold text-sm"
                    >
                      {getStatusColor(status).label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notas */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Notas de Seguimiento</h3>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Agrega observaciones del ticket..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                />
                <button
                  onClick={() => {
                    if (newNote.trim()) {
                      updateTicketNote(selectedTicket.id, newNote)
                      setSelectedTicket({ ...selectedTicket, notaEspecialista: newNote })
                      setNewNote('')
                    }
                  }}
                  className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition font-semibold text-sm"
                >
                  Guardar Nota
                </button>
              </div>

              {/* Nota Existente */}
              {selectedTicket.notaEspecialista && (
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
                  <p className="text-xs font-bold text-orange-700 uppercase mb-1">📝 Nota de Seguimiento</p>
                  <p className="text-gray-700">{selectedTicket.notaEspecialista}</p>
                </div>
              )}

              {/* Close */}
              <button
                onClick={() => setSelectedTicket(null)}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 py-3 rounded-lg transition font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
