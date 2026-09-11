import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ConsultationService } from './consultation.service';

@Controller('api/consultations')
@ApiTags('Consultations')
export class ConsultationController {
  constructor(private readonly service: ConsultationService) {}

  @Post()
  @ApiOperation({
    summary: 'Iniciar consulta de autoatención IA',
    description: 'RNS-02: Registra intento con IA, incrementa intentos_fallidos si falla'
  })
  async initiate(@Body() dto: any) {
    return { message: 'Consulta iniciada' };
  }

  @Get(':id/history')
  @ApiOperation({ summary: 'Obtener historial de IA (RNS-03: Inmutable)' })
  async getHistory(@Param('id') id: string) {
    return { message: 'Historial en implementación' };
  }
}
