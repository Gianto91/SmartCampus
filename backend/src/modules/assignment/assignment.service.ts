import { Injectable } from '@nestjs/common';

@Injectable()
export class AssignmentService {
  async assignTicket(ticketId: string, category: string, priority: string) {
    // Seleccionar AgenteSoporte disponible por categoría
    // Validar capacidad
    // Asignar ticket
    // Notificar agente
    return {
      ticketId,
      assignedAgent: 'agent-123',
      message: 'Ticket asignado exitosamente',
    };
  }

  private findAvailableAgent(category: string, priority: string) {
    // Lógica para encontrar agente disponible
    return null;
  }
}
