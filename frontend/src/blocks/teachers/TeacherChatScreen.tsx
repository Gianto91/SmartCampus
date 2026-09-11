import { useState } from 'react'

export default function TeacherChatScreen() {
  const [messages, setMessages] = useState<any[]>([
    { id: 1, sender: 'bot', text: 'Bienvenido, Docente. Soy tu asistente IA de SmartCampus.' }
  ])

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="bg-ucin-secondary text-white px-6 py-4">
        <h1 className="text-xl font-bold">SmartCampus - Soporte Docentes</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="text-gray-800">
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <input type="text" placeholder="Tu mensaje..." className="w-full px-4 py-2 border rounded-lg" />
      </div>
    </div>
  )
}
