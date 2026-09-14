import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, AlertCircle, ArrowLeft } from 'lucide-react'
import { AppContext } from '@/context/AppContext'
import TicketFormModal from '@/components/TicketFormModal'

interface Ticket {
  id: string
  asunto: string
  estado: 'ABIERTO' | 'EN_REVISIÓN' | 'ESCALADO_N2' | 'ATENDIDO'
  fecha: string
  nota?: string
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

export default function MisTickets() {
  const navigate = useNavigate()
  const context = useContext(AppContext)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [showTicketForm, setShowTicketForm] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')

  if (!context) {
    return <div>Error: AppContext no disponible</div>
  }

  const { tickets } = context

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 transition p-2"
              title="Regresar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mis Tickets</h1>
              <p className="text-sm text-gray-600">Historial de solicitudes de soporte</p>
            </div>
          </div>
          <button
            onClick={() => setShowTicketForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition font-semibold"
          >
            <Plus className="w-4 h-4" />
            + Nuevo Ticket
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No tienes tickets aún</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Código</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Asunto</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Estado</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Fecha</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tickets.map((ticket) => {
                  const statusColor = getStatusColor(ticket.estado)
                  return (
                    <tr key={ticket.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <span className="text-purple-600 font-bold hover:text-purple-700 cursor-pointer">
                          {ticket.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900">{ticket.asunto}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor.bg} ${statusColor.text}`}
                        >
                          {statusColor.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{ticket.fecha}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedTicket(ticket)}
                          className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                        >
                          Ver →
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>

              {/* Notas expandibles */}
              {tickets.map((ticket) => {
                if (!ticket.notaEspecialista) return null
                return (
                  <tr key={`${ticket.id}-note`} className="bg-orange-50 border-t-2 border-orange-200">
                    <td colSpan={5} className="px-6 py-4">
                      <div className="flex gap-2">
                        <span className="text-orange-600 font-bold text-xs">NOTA N2:</span>
                        <p className="text-gray-700 text-sm">{ticket.notaEspecialista}</p>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </table>
          )}
        </div>

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold">Detalles del Ticket</h2>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="hover:bg-purple-500 p-1 rounded transition"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Ticket Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Código</p>
                    <p className="text-lg font-bold text-purple-600">{selectedTicket.id}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Estado</p>
                    <p className="text-lg font-bold text-gray-900">
                      {getStatusColor(selectedTicket.estado).label}
                    </p>
                  </div>
                </div>

                {/* Asunto */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Asunto</h3>
                  <p className="text-gray-600">{selectedTicket.asunto}</p>
                </div>

                {/* Fecha */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Fecha de Creación</h3>
                  <p className="text-gray-600">{selectedTicket.fecha}</p>
                </div>

                {/* Cambiar Estado */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Cambiar Estado</h3>
                  <div className="flex gap-2 flex-wrap">
                    {['EN_REVISIÓN', 'ESCALADO_N2', 'ATENDIDO'].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status)
                          if (context) {
                            context.updateTicketStatus(selectedTicket.id, status)
                            setSelectedTicket({ ...selectedTicket, estado: status as any })
                          }
                        }}
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition font-semibold text-sm"
                      >
                        {getStatusColor(status).label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nota Especialista */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Nota del Especialista</h3>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Agrega una nota sobre el estado del ticket..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                  />
                  <button
                    onClick={() => {
                      if (context && newNote.trim()) {
                        context.updateTicketNote(selectedTicket.id, newNote)
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
                    <p className="text-xs font-bold text-orange-700 uppercase mb-1">Nota de Especialista N2</p>
                    <p className="text-gray-700">{selectedTicket.notaEspecialista}</p>
                  </div>
                )}

                {/* Close Button */}
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

      {/* Ticket Form Modal */}
      {showTicketForm && <TicketFormModal onClose={() => setShowTicketForm(false)} />}
    </div>
  )
}
