import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsultationService {
  async initiateConsultation(userId: string, question: string) {
    // RNS-02: Llamar MotorIA
    // Si MotorIA resuelve → retornar respuesta
    // Si MotorIA falla → incrementar intentos_fallidos
    return null;
  }

  async getHistory(consultationId: string) {
    // RNS-03: Retornar HistorialIA inmutable
    return null;
  }
}
