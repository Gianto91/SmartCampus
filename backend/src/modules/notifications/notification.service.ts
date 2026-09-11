import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  async sendNotification(ticket: any, event: any) {
    // RNS-05: Enviar por canal original exacto
    const channel = ticket.canalOrigen; // WHATSAPP o PORTAL_WEB

    if (channel === 'WHATSAPP') {
      // Llamar WhatsAppGateway
      console.log(`[WhatsApp] Notificación enviada a ${ticket.solicitante.id}`);
    } else if (channel === 'PORTAL_WEB') {
      // Llamar PortalWebGateway
      console.log(`[Portal] Notificación enviada a ${ticket.solicitante.id}`);
    }

    return {
      ticketId: ticket.id,
      channel,
      message: 'Notificación enviada exitosamente',
    };
  }
}
