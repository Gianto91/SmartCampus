import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Send } from 'lucide-react'
import TicketFormModal from '@/components/TicketFormModal'

interface Message {
  id: number
  sender: 'user' | 'bot'
  text: string
  timestamp: Date
}

const FAQ_DATA = [
  { keywords: ['pago', 'matrícula', 'boleta'], answer: 'Para descargar tu boleta: 1. Ingresa al Portal Académico, 2. Ve a Pagos, 3. Selecciona el período, 4. Descarga el PDF.' },
  { keywords: ['contraseña', 'seguridad', 'acceso'], answer: 'Para cambiar tu contraseña: 1. Ingresa a Mi Cuenta, 2. Haz clic en Seguridad, 3. Selecciona Cambiar Contraseña, 4. Ingresa contraseña actual y nueva.' },
  { keywords: ['marcación', 'omitida', 'falta'], answer: 'Para regularizar una marcación omitida: 1. Ingresa al módulo "Solicitudes Omitidas", 2. Selecciona la fecha con incidencia, 3. Adjunta justificación, 4. Envía dentro de 48 horas.' },
  { keywords: ['certificado', 'egreso'], answer: 'Para solicitar un certificado de egreso: 1. Accede al Portal, 2. Ve a Documentos, 3. Selecciona Certificados, 4. Solicita el que necesites, 5. Espera 24 horas.' },
]

export default function CentroAyuda() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: '¡Hola! Bienvenido a SmartCampus UCIN. Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [showTicketForm, setShowTicketForm] = useState(false)

  const searchFAQ = (query: string): string | null => {
    const queryLower = query.toLowerCase()
    for (const item of FAQ_DATA) {
      if (item.keywords.some((kw) => queryLower.includes(kw))) {
        return item.answer
      }
    }
    return null
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    const userQuery = input
    setInput('')

    // Simular respuesta del bot con delay
    setTimeout(() => {
      const faqAnswer = searchFAQ(userQuery)
      const botMessage: Message = {
        id: messages.length + 2,
        sender: 'bot',
        text: faqAnswer || 'He detectado que tu consulta requiere intervención del equipo de soporte técnico. Para continuar, por favor abre un ticket de soporte.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 600)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Portal de Ayuda SmartCampus</h1>
            <p className="text-sm text-gray-600">Centro de Ayuda</p>
          </div>
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            ← Volver
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-screen max-h-96">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}

            {/* Bot Button to Open Ticket Form */}
            {messages.length > 1 && (
              <div className="flex justify-start mt-6">
                <button
                  onClick={() => setShowTicketForm(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
                >
                  📋 Abrir Formulario de Ticket
                </button>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                onClick={handleSend}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Form Modal */}
      {showTicketForm && <TicketFormModal onClose={() => setShowTicketForm(false)} />}
    </div>
  )
}
