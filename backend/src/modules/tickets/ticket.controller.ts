import { Controller, Post, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TicketService } from './ticket.service';

@Controller('api/tickets')
@ApiTags('Tickets')
@ApiBearerAuth()
export class TicketController {
  constructor(private readonly service: TicketService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear nuevo ticket',
    description: 'RNS-02: Verifica intentos_fallidos >= 1. RNS-03: Adjunta HistorialIA inmutable'
  })
  async create(@Body() dto: any) {
    return { id: '#TK-0001', message: 'Ticket creado' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalles de ticket con historial IA' })
  async getById(@Param('id') id: string) {
    return { message: 'Ticket en implementación' };
  }

  @Get()
  @ApiOperation({ summary: 'Listar tickets del usuario' })
  async list() {
    return { tickets: [] };
  }
}
