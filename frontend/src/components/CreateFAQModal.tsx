import { useState } from 'react'
import { X, BookOpen } from 'lucide-react'

interface CreateFAQModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateFAQ: (faq: FAQItem) => void
}

interface FAQItem {
  id: string
  titulo: string
  categoria: string
  respuesta: string
  palabrasClave: string[]
}

const CATEGORIAS = [
  'RRHH / Marcaciones',
  'Pagos / Matrícula',
  'Académico',
  'Cuentas y Accesos',
  'Aula Virtual Canvas',
  'Reportes',
  'Soporte Técnico',
  'Otro'
]

export default function CreateFAQModal({ isOpen, onClose, onCreateFAQ }: CreateFAQModalProps) {
  const [titulo, setTitulo] = useState('')
  const [categoria, setCategoria] = useState('Académico')
  const [respuesta, setRespuesta] = useState('')
  const [palabrasClave, setPalabrasClave] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (!titulo.trim() || !respuesta.trim()) {
      alert('Por favor completa todos los campos')
      return
    }

    setLoading(true)
    setTimeout(() => {
      const faqItem: FAQItem = {
        id: 'faq_' + Date.now(),
        titulo: titulo,
        categoria: categoria,
        respuesta: respuesta,
        palabrasClave: palabrasClave
          .split(',')
          .map(p => p.trim())
          .filter(p => p.length > 0)
      }

      onCreateFAQ(faqItem)

      // Reset form
      setTitulo('')
      setRespuesta('')
      setPalabrasClave('')
      setCategoria('Académico')
      setLoading(false)
      onClose()
    }, 500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 flex justify-between items-center sticky top-0">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">Crear Nuevo Artículo FAQ</h2>
              <p className="text-purple-200 text-sm">Entrenar la IA con nueva información</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-purple-500 p-2 rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Título */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Título de la Pregunta
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: ¿Cómo cambiar mi contraseña?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <p className="text-xs text-gray-500 mt-1">Formúlalo como una pregunta clara</p>
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Categoría
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Respuesta */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Respuesta / Solución
            </label>
            <textarea
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              placeholder="Escribe la respuesta detallada aquí. Sé claro y conciso."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">Mínimo 20 caracteres</p>
          </div>

          {/* Palabras Clave */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Palabras Clave (opcional)
            </label>
            <input
              type="text"
              value={palabrasClave}
              onChange={(e) => setPalabrasClave(e.target.value)}
              placeholder="Ej: contraseña, acceso, reset, olvidé"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <p className="text-xs text-gray-500 mt-1">Separa con comas. Ayuda a la IA a encontrar esta respuesta</p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              <strong>💡 Consejo:</strong> Cuanto más específica y clara sea tu respuesta, mejor podrá la IA resolver consultas similares automáticamente.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg transition font-semibold"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg transition font-semibold flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creando...
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4" />
                  Crear FAQ
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
