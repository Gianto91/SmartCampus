import { createContext, useState, useEffect, ReactNode } from 'react'

interface Ticket {
  id: string
  asunto: string
  estado: 'ABIERTO' | 'EN_REVISIÓN' | 'ESCALADO_N2' | 'ATENDIDO'
  fecha: string
  prioridad: 'ALTA' | 'NORMAL' | 'BAJA'
  categoria: string
  nota?: string
  notaEspecialista?: string
}

interface AppContextType {
  tickets: Ticket[]
  addTicket: (ticket: Ticket) => void
  updateTicketStatus: (id: string, status: string) => void
  updateTicketNote: (id: string, nota: string) => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

const INITIAL_TICKETS: Ticket[] = [
  {
    id: '#TK-8022',
    asunto: 'Marcación no visible en plataforma',
    estado: 'ABIERTO',
    fecha: '10/09/2026',
    prioridad: 'ALTA',
    categoria: 'RRHH / Marcaciones',
  },
  {
    id: '#TK-7901',
    asunto: 'Error en descarga de boleta',
    estado: 'ATENDIDO',
    fecha: '08/09/2026',
    prioridad: 'NORMAL',
    categoria: 'Pagos / Matrícula',
  },
  {
    id: '#TK-7850',
    asunto: 'Acceso denegado al módulo RRHH',
    estado: 'ATENDIDO',
    fecha: '05/09/2026',
    prioridad: 'NORMAL',
    categoria: 'Cuentas y Accesos',
  },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    try {
      const stored = localStorage.getItem('smartcampus_tickets')
      return stored ? JSON.parse(stored) : INITIAL_TICKETS
    } catch {
      return INITIAL_TICKETS
    }
  })

  // Guardar en localStorage cuando cambian los tickets
  useEffect(() => {
    localStorage.setItem('smartcampus_tickets', JSON.stringify(tickets))
  }, [tickets])

  const addTicket = (ticket: Ticket) => {
    setTickets([ticket, ...tickets])
  }

  const updateTicketStatus = (id: string, status: string) => {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, estado: status as any } : t)))
  }

  const updateTicketNote = (id: string, nota: string) => {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, notaEspecialista: nota } : t)))
  }

  return (
    <AppContext.Provider value={{ tickets, addTicket, updateTicketStatus, updateTicketNote }}>
      {children}
    </AppContext.Provider>
  )
}
