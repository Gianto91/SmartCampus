import { useState } from 'react'
import { Send, Loader } from 'lucide-react'

export default function StudentChatScreen() {
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      sender: 'bot',
      text: '¡Hola! Bienvenido al sistema SmartCampus UCIN Bot. Ingresa tu correo institucional o tu DNI para validar tu perfil.',
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    setMessages([...messages, {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: new Date(),
    }])

    setLoading(true)
    setInput('')

    // Simulate API call
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'bot',
        text: '✅ ¡Validación exitosa! Hola Juan Pablo Pérez Ramos (Estudiante de Pregrado - Medicina Humana). ¿En qué te puedo ayudar hoy?',
        timestamp: new Date(),
      }])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-ucin-primary text-white px-6 py-4 rounded-b-lg">
        <h1 className="text-xl font-bold">SmartCampus UCIN Bot ✓ Oficial</h1>
        <p className="text-sm text-ucin-light">Asistente de autoatención IA</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-ucin-primary text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {msg.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <Loader className="w-5 h-5 animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-gray-50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ucin-primary"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-ucin-primary text-white px-4 py-2 rounded-lg hover:bg-ucin-secondary transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
