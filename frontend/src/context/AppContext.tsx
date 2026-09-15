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
  slaVencimiento?: string
}

interface AppContextType {
  tickets: Ticket[]
  addTicket: (ticket: Ticket) => void
  updateTicketStatus: (id: string, status: string) => void
  updateTicketNote: (id: string, nota: string) => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

const calcularSLA = (prioridad: string): string => {
  const ahora = new Date()
  const horasAgregadas = prioridad === 'ALTA' ? 8 : prioridad === 'NORMAL' ? 24 : 48
  ahora.setHours(ahora.getHours() + horasAgregadas)
  return ahora.toISOString()
}

const MOCK_TICKETS: Ticket[] = [
  {
    id: '#TK-8022',
    asunto: 'Marcación no visible en plataforma',
    estado: 'ABIERTO',
    fecha: '12/09/2026',
    prioridad: 'ALTA',
    categoria: 'RRHH / Marcaciones',
    slaVencimiento: calcularSLA('ALTA'),
  },
  {
    id: '#TK-8021',
    asunto: 'Error al exportar reportes académicos',
    estado: 'EN_REVISIÓN',
    fecha: '12/09/2026',
    prioridad: 'NORMAL',
    categoria: 'Reportes / Académico',
    slaVencimiento: calcularSLA('NORMAL'),
    notaEspecialista: 'Se está investigando el error en el módulo de reportes. Usuario reportó que no puede exportar en PDF.',
  },
  {
    id: '#TK-8020',
    asunto: 'Solicitud de cambio de contraseña urgente',
    estado: 'ESCALADO_N2',
    fecha: '12/09/2026',
    prioridad: 'ALTA',
    categoria: 'Cuentas y Accesos',
    slaVencimiento: calcularSLA('ALTA'),
    notaEspecialista: 'Escalado a soporte N2. Usuario indica posible acceso no autorizado.',
  },
  {
    id: '#TK-7901',
    asunto: 'Error en descarga de boleta de pago',
    estado: 'ATENDIDO',
    fecha: '11/09/2026',
    prioridad: 'NORMAL',
    categoria: 'Pagos / Matrícula',
    slaVencimiento: calcularSLA('NORMAL'),
    notaEspecialista: 'Resuelto. Se regeneró la boleta y se envió nuevamente al correo del usuario.',
  },
  {
    id: '#TK-7900',
    asunto: 'Problema al acceder al aula virtual Canvas',
    estado: 'EN_REVISIÓN',
    fecha: '11/09/2026',
    prioridad: 'ALTA',
    categoria: 'Aula Virtual Canvas',
    slaVencimiento: calcularSLA('ALTA'),
  },
  {
    id: '#TK-7899',
    asunto: 'Certificado de estudios no se genera',
    estado: 'ABIERTO',
    fecha: '10/09/2026',
    prioridad: 'NORMAL',
    categoria: 'Académico',
    slaVencimiento: calcularSLA('NORMAL'),
  },
  {
    id: '#TK-7898',
    asunto: 'Fallo en sincronización de horario de clases',
    estado: 'ATENDIDO',
    fecha: '10/09/2026',
    prioridad: 'NORMAL',
    categoria: 'Académico',
    slaVencimiento: calcularSLA('NORMAL'),
    notaEspecialista: 'Sincronización completada. Todos los horarios actualizados correctamente.',
  },
  {
    id: '#TK-7897',
    asunto: 'No puede acceder a módulo de RRHH',
    estado: 'ATENDIDO',
    fecha: '09/09/2026',
    prioridad: 'NORMAL',
    categoria: 'Cuentas y Accesos',
    slaVencimiento: calcularSLA('NORMAL'),
    notaEspecialista: 'Permiso asignado. Usuario ahora puede acceder al módulo de RRHH.',
  },
  {
    id: '#TK-7896',
    asunto: 'Error en cálculo de promedio académico',
    estado: 'ESCALADO_N2',
    fecha: '09/09/2026',
    prioridad: 'ALTA',
    categoria: 'Académico',
    slaVencimiento: calcularSLA('ALTA'),
  },
  {
    id: '#TK-7895',
    asunto: 'Consulta sobre requisitos de titulación',
    estado: 'ATENDIDO',
    fecha: '08/09/2026',
    prioridad: 'BAJA',
    categoria: 'Académico',
    slaVencimiento: calcularSLA('BAJA'),
    notaEspecialista: 'Información proporcionada. Usuario satisfecho con la respuesta.',
  },
  {
    id: '#TK-7894',
    asunto: 'Problema con reinicio de contraseña',
    estado: 'ATENDIDO',
    fecha: '08/09/2026',
    prioridad: 'ALTA',
    categoria: 'Cuentas y Accesos',
    slaVencimiento: calcularSLA('ALTA'),
  },
]

const INITIAL_TICKETS = MOCK_TICKETS

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
