import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'

@Injectable()
export class TicketService {
  constructor() {}

  // CUS03: Generar ticket de soporte
  async crearTicket(usuarioId: string, consultaId: string, dto: any): Promise<any> {
    // NOTE: MockDataService handles this - this is just a stub
    const ticketId = this.generarIdTicket()
    return {
      id: ticketId,
      estado: 'ABIERTO',
      mensaje: 'Use MockDataService',
    }
  }

  // Obtener historial de IA (RNS-03)
  async obtenerHistorial(consultaId: string): Promise<any> {
    return { bloqueado: true, mensajes: [] }
  }

  // Calcular SLA (RNS-04)
  private calcularSLA(prioridad: string): Date {
    const ahora = new Date()
    const horasLaborables: { [key: string]: number } = {
      ALTA: 8,
      NORMAL: 24,
      BAJA: 48,
    }

    const horas = horasLaborables[prioridad] || 24
    const vencimiento = new Date(ahora.getTime() + horas * 60 * 60 * 1000)
    return vencimiento
  }

  // Generar ID único
  private generarIdTicket(): string {
    const num = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0')
    return `#TK-${num}`
  }

  // CUS06: Obtener ticket por ID
  async obtenerTicketPorId(ticketId: string): Promise<any> {
    return { id: ticketId, estado: 'ABIERTO' }
  }

  // CUS06: Listar tickets del usuario
  async listarTicketsUsuario(usuarioId: string): Promise<any[]> {
    return []
  }

  // CUS06: Cambiar estado de ticket (RNS-05: Disparar notificación)
  async cambiarEstadoTicket(
    ticketId: string,
    nuevoEstado: string,
    diagnostico?: string,
    solucion?: string
  ): Promise<any> {
    return {
      id: ticketId,
      estado: nuevoEstado,
      mensaje: `Ticket actualizado a estado: ${nuevoEstado}`,
      dispararNotificacion: true,
    }
  }
}
