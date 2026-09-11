import { Injectable } from '@nestjs/common';

@Injectable()
export class PortalWebGateway {
  async notifyStatusChange(userId: string, ticketId: string, newStatus: string): Promise<void> {
    // RNS-05: Enviar notificación al frontend por WebSocket o Server-Sent Events
    // Esta será recibida por el frontend React y mostrada al usuario

    console.log(
      `[Portal] Notificación para usuario ${userId}: Ticket ${ticketId} → ${newStatus}`
    );

    // TODO: Implementar WebSocket o SSE aquí
    // Enviar evento a través de socket.io o Server-Sent Events
  }

  async sendTicketUpdate(userId: string, ticketUpdate: any): Promise<void> {
    // Enviar actualización de ticket al portal web
    console.log(`[Portal] Update para ${userId}:`, ticketUpdate);
  }
}
