import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassificationService {
  async classifyTicket(ticketId: string, description: string) {
    // Analizar descripción
    // Determinar categoría
    // Asignar prioridad
    // RNS-04: Calcular SLA
    const priority = this.determinePriority(description);
    const slaHours = this.getSLAHours(priority);
    const slaExpiration = new Date(Date.now() + slaHours * 3600 * 1000);

    return {
      ticketId,
      category: 'Académica',
      priority,
      slaExpiration,
    };
  }

  private determinePriority(description: string): string {
    const highPriorityKeywords = [
      'crítico',
      'urgente',
      'no puedo pagar',
      'falta acceso',
      'sistema caído',
    ];

    return highPriorityKeywords.some(kw =>
      description.toLowerCase().includes(kw)
    )
      ? 'ALTA'
      : 'NORMAL';
  }

  private getSLAHours(priority: string): number {
    // RNS-04: Acuerdos de Nivel de Servicio
    const slaMap = {
      'ALTA': 8,
      'NORMAL': 24,
      'BAJA': 48,
    };
    return slaMap[priority] || 24;
  }
}
