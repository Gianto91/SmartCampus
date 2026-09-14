import { Controller, Post, Get, Put, Body, Param, Query } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { MockDataService } from './mock-data.service'

@Controller('api/tickets')
@ApiTags('Tickets')
export class TicketApiController {
  constructor(private mockData: MockDataService) {}

  // CUS01: Validar usuario
  @Post('validate-user')
  @ApiOperation({ summary: 'Validar identidad del usuario' })
  validateUser(@Body() dto: { email: string }) {
    const resultado = this.mockData.validarUsuario(dto.email)

    if (resultado.valido) {
      return {
        valido: true,
        usuario: {
          id: resultado.usuario.id,
          nombre: resultado.usuario.nombreCompleto,
          rol: resultado.usuario.rol,
          email: resultado.usuario.email,
        },
      }
    }

    return {
      valido: false,
      error: 'Usuario no encontrado o inactivo',
    }
  }

  // CUS02: Obtener respuesta de IA
  @Post('consult-ia')
  @ApiOperation({ summary: 'Consultar con IA para autoatención' })
  consultIA(@Body() dto: { consulta: string; usuarioId: string }) {
    const respuesta = this.mockData.obtenerRespuestaIA(dto.consulta)

    return {
      resuelto: respuesta.resuelto,
      respuesta: respuesta.respuesta,
      sugerirTicket: respuesta.sugerirTicket,
      confianza: respuesta.confianza,
      intentoFallido: !respuesta.resuelto,
    }
  }

  // CUS03: Crear ticket
  @Post('create')
  @ApiOperation({ summary: 'Crear nuevo ticket de soporte' })
  createTicket(
    @Body()
    dto: {
      usuarioId: string
      clasificacion: string
      motivo: string
      detalle: string
      fecha: string
      hora: string
    }
  ) {
    const ticketId = this.mockData.crearTicket(dto.usuarioId, {
      descripcion: dto.detalle,
      categoria: dto.clasificacion,
      prioridad: 'NORMAL',
      historialIA: {
        mensajes: [
          { emisor: 'usuario', texto: dto.detalle },
          { emisor: 'bot', texto: 'Necesitas hablar con un agente de soporte.' },
        ],
      },
    })

    return {
      success: true,
      ticketId,
      mensaje: 'Ticket generado exitosamente',
      url: `/mis-tickets?id=${ticketId}`,
    }
  }

  // CUS06: Obtener ticket por ID
  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalles del ticket' })
  getTicket(@Param('id') ticketId: string) {
    const ticket = this.mockData.getTicketById(ticketId)

    if (!ticket) {
      return { error: 'Ticket no encontrado', success: false }
    }

    return {
      ...ticket,
      success: true,
    }
  }

  // CUS06: Listar tickets del usuario
  @Get('usuario/:usuarioId')
  @ApiOperation({ summary: 'Listar tickets del usuario' })
  getUsuarioTickets(@Param('usuarioId') usuarioId: string) {
    const tickets = this.mockData.getTicketsByUsuario(usuarioId)

    return {
      success: true,
      tickets,
      total: tickets.length,
    }
  }

  // CUS06: Cambiar estado del ticket
  @Put(':id/status')
  @ApiOperation({ summary: 'Cambiar estado del ticket' })
  updateTicketStatus(
    @Param('id') ticketId: string,
    @Body() dto: { nuevoEstado: string; diagnostico?: string; solucion?: string }
  ) {
    const resultado = this.mockData.cambiarEstadoTicket(
      ticketId,
      dto.nuevoEstado
    )

    if (resultado.success) {
      return {
        success: true,
        ticket: resultado.ticket,
        dispararNotificacion: true,
        mensaje: `Ticket actualizado a: ${dto.nuevoEstado}`,
      }
    }

    return {
      success: false,
      error: resultado.error,
    }
  }

  // CUS07: Obtener estado de ticket (para notificación)
  @Get(':id/status')
  @ApiOperation({ summary: 'Obtener estado actual del ticket' })
  getTicketStatus(@Param('id') ticketId: string) {
    const ticket = this.mockData.getTicketById(ticketId)

    if (!ticket) {
      return { error: 'Ticket no encontrado' }
    }

    return {
      ticketId,
      estado: ticket.estado,
      fechaActualizacion: new Date().toISOString(),
    }
  }

  // CUS08: Obtener FAQs
  @Get('faq/search')
  @ApiOperation({ summary: 'Buscar en base de conocimientos' })
  searchFAQ(@Query('query') query: string) {
    const resultados = this.mockData.getFAQ().filter(
      (faq) =>
        faq.titulo.toLowerCase().includes(query.toLowerCase()) ||
        faq.contenido.toLowerCase().includes(query.toLowerCase())
    )

    return {
      success: true,
      resultados,
      total: resultados.length,
    }
  }

  // Obtener todos los tickets (para dashboard)
  @Get()
  @ApiOperation({ summary: 'Obtener todos los tickets' })
  getAllTickets() {
    const tickets = this.mockData.getTickets()

    return {
      success: true,
      tickets,
      total: tickets.length,
    }
  }
}
