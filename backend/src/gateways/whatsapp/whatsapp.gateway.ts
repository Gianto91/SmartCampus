import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WhatsAppGateway {
  private readonly accessToken: string;
  private readonly phoneNumberId: string;
  private readonly apiVersion = 'v19.0';

  constructor(private configService: ConfigService) {
    this.accessToken = this.configService.get<string>('WHATSAPP_ACCESS_TOKEN', '');
    this.phoneNumberId = this.configService.get<string>('WHATSAPP_PHONE_NUMBER_ID', '');
  }

  async sendMessage(phoneNumber: string, message: string): Promise<void> {
    // RNS-05: Enviar mensaje por WhatsApp
    const url = `https://graph.instagram.com/${this.apiVersion}/${this.phoneNumberId}/messages`;

    try {
      await axios.post(
        url,
        {
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'text',
          text: { body: message },
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error enviando mensaje WhatsApp:', error);
      throw error;
    }
  }

  async sendCard(phoneNumber: string, cardData: any): Promise<void> {
    // Enviar tarjeta interactiva (ej: para tickets, estado)
    const url = `https://graph.instagram.com/${this.apiVersion}/${this.phoneNumberId}/messages`;

    try {
      await axios.post(
        url,
        {
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'interactive',
          interactive: cardData,
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error('Error enviando tarjeta WhatsApp:', error);
      throw error;
    }
  }

  async handleWebhook(event: any): Promise<void> {
    // Procesar webhooks de WhatsApp
    // Ej: mensajes entrantes, confirmación de entrega
    console.log('Webhook WhatsApp recibido:', event);
  }
}
