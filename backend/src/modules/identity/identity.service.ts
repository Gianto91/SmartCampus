import { Injectable } from '@nestjs/common';

@Injectable()
export class IdentityService {
  async validateUser(email: string, channel: string) {
    // RNS-01: Validar que el canal es permitido para el rol
    // RNS-06: Consultar Banner Ellucian para verificar estado = ACTIVO
    // TODO: Implementar lógica de validación
    return null;
  }

  async validateChannel(role: string, channel: string): boolean {
    // Validar RNS-01: Restricción de Canal por Rol
    const validChannels = {
      'STUDENT': ['WHATSAPP'],
      'TEACHER': ['WHATSAPP'],
      'ADMIN': ['PORTAL_WEB'],
    };

    return validChannels[role]?.includes(channel) || false;
  }

  async generateJWT(userId: string): Promise<string> {
    // TODO: Generar JWT
    return null;
  }
}
