import { useState } from 'react'
import { X, Upload, CheckCircle } from 'lucide-react'

interface TicketFormModalProps {
  onClose: () => void
}

export default function TicketFormModal({ onClose }: TicketFormModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    clasificacion: 'RRHH / Marcaciones',
    motivo: 'Marcación no visible',
    detalle: '',
    fecha: '',
    hora: '',
    archivo: null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        {step === 1 ? (
          <>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold">Generar Ticket de Soporte TI</h2>
              <button
                onClick={onClose}
                className="hover:bg-purple-500 p-1 rounded transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="text-sm text-gray-600 mb-4">
                Completa todos los campos requeridos
              </div>

              {/* Clasificación */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Clasificación *
                </label>
                <select
                  value={formData.clasificacion}
                  onChange={(e) =>
                    setFormData({ ...formData, clasificacion: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option>RRHH / Marcaciones</option>
                  <option>Canvas / Académico</option>
                  <option>Pagos / Matrícula</option>
                  <option>TI / Técnico</option>
                </select>
              </div>

              {/* Motivo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Motivo *
                </label>
                <select
                  value={formData.motivo}
                  onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option>Marcación no visible</option>
                  <option>Error en sistema</option>
                  <option>Acceso denegado</option>
                </select>
              </div>

              {/* Detalle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Detalle del problema *
                </label>
                <textarea
                  value={formData.detalle}
                  onChange={(e) => setFormData({ ...formData, detalle: e.target.value })}
                  placeholder="Describe tu problema en detalle..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                />
              </div>

              {/* Fecha y Hora */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fecha para contactarla
                  </label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hora para contactarla
                  </label>
                  <input
                    type="time"
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              {/* Adjuntos */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Adjuntar archivos aquí o selecciona desde tu equipo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 text-sm">PNG, JPG, PDF — Máx. 10MB</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition font-semibold"
                >
                  Enviar Ticket
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            {/* Success Screen */}
            <div className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Ticket registrado con éxito!</h2>
              <p className="text-gray-600 mb-6">Tu solicitud ha sido recibida y asignada al equipo de soporte</p>

              <div className="bg-purple-100 rounded-lg p-4 mb-8">
                <p className="text-purple-600 font-bold text-2xl">#TK-8022</p>
              </div>

              <p className="text-gray-600 mb-8">
                Te notificaremos cualquier avance a través de tu correo institucional y en la sección de "Ver mis tickets"
              </p>

              <button
                onClick={onClose}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Ver mis tickets
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
