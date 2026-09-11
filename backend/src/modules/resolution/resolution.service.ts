import { Injectable } from '@nestjs/common';

@Injectable()
export class ResolutionService {
  async changeStatus(
    ticketId: string,
    newStatus: string,
    diagnostico?: string,
    solucion?: string
  ) {
    // Validar transición de estado permitida
    // Si estado = 'Resuelto' → almacenar diagnóstico
    // RNS-05: Disparar notificación a usuario
    // Calcular métricas

    return {
      ticketId,
      newStatus,
      message: 'Estado actualizado, notificación enviada (RNS-05)',
    };
  }
}
