import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class TicketService {
  async createTicket(dto: any) {
    // RNS-02: Verificar que intentos_fallidos >= 1
    if (dto.consultation.intentos_fallidos < 1) {
      throw new BadRequestException(
        'Debe intentar autoatención primero (RNS-02)'
      );
    }

    // RNS-03: Adjuntar HistorialIA inmutable
    const ticket = {
      id: this.generateTicketId(),
      historialIA: dto.consultation.historialIA, // Inmutable
      solicitante: dto.usuario,
      canalOrigen: dto.canal,
      descripcion: dto.descripcion,
      estado: 'ABIERTO',
    };

    return ticket;
  }

  private generateTicketId(): string {
    const num = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    return `#TK-${num}`;
  }
}
