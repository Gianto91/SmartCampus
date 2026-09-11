import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      message: '✅ SmartCampus OmniDesk API operativa',
    };
  }

  getVersion() {
    return {
      version: '1.0.0',
      name: 'SmartCampus OmniDesk',
      description: 'Plataforma de Gestión de Incidencias Omnicanal - UCIN',
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
