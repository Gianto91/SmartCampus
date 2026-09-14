import { Injectable } from '@nestjs/common'

@Injectable()
export class MockDataService {
  private usuarios = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'juan.perez@ucin.edu.pe',
      dni: '12345678',
      rol: 'STUDENT',
      estado: 'ACTIVO',
      nombreCompleto: 'Juan Pablo Pérez Ramos',
    },
    {
      id: '223e4567-e89b-12d3-a456-426614174000',
      email: 'maria.gonzalez@ucin.edu.pe',
      dni: '87654321',
      rol: 'ADMIN',
      estado: 'ACTIVO',
      nombreCompleto: 'María González López',
    },
  ]

  private tickets = [
    {
      id: '#TK-8022',
      solicitanteId: '123e4567-e89b-12d3-a456-426614174000',
      asunto: 'Marcación no visible en plataforma',
      estado: 'ABIERTO',
      prioridad: 'ALTA',
      categoria: 'RRHH / Marcaciones',
      fechaCreacion: '2026-09-10',
      slaVencimiento: '2026-09-11T08:00:00',
      historialIA: {
        mensajes: [
          { emisor: 'usuario', texto: 'No puedo ver mi marcación de ayer' },
          {
            emisor: 'bot',
            texto: 'Para regularizar una marcación omitida, debes ingresar al módulo "Solicitudes Omitidas".',
          },
          { emisor: 'usuario', texto: 'Aún tengo problemas' },
        ],
      },
    },
    {
      id: '#TK-7901',
      solicitanteId: '123e4567-e89b-12d3-a456-426614174000',
      asunto: 'Error en descarga de boleta',
      estado: 'ATENDIDO',
      prioridad: 'NORMAL',
      categoria: 'Pagos / Matrícula',
      fechaCreacion: '2026-09-08',
    },
    {
      id: '#TK-7850',
      solicitanteId: '123e4567-e89b-12d3-a456-426614174000',
      asunto: 'Acceso denegado al módulo RRHH',
      estado: 'ATENDIDO',
      prioridad: 'NORMAL',
      categoria: 'Cuentas y Accesos',
      fechaCreacion: '2026-09-05',
    },
  ]

  private faqItems = [
    {
      id: '1',
      titulo: '¿Cómo regularizar una marcación omitida?',
      categoria: 'RRHH / Marcaciones',
      contenido:
        'Para regularizar una marcación omitida: 1. Ingresa al módulo "Solicitudes Omitidas", 2. Selecciona la fecha con incidencia, 3. Adjunta justificación, 4. Envía dentro de 48 horas.',
      palabrasClave: 'marcación, regularizar, omitida, falta',
    },
    {
      id: '2',
      titulo: '¿Cómo cambiar mi contraseña?',
      categoria: 'Cuentas y Accesos',
      contenido:
        'Para cambiar tu contraseña: 1. Ingresa a Mi Cuenta, 2. Haz clic en Seguridad, 3. Selecciona Cambiar Contraseña, 4. Ingresa contraseña actual y nueva.',
      palabrasClave: 'contraseña, seguridad, acceso',
    },
    {
      id: '3',
      titulo: '¿Dónde descargo mi boleta de pago?',
      categoria: 'Pagos / Matrícula',
      contenido:
        'Para descargar tu boleta: 1. Ingresa al Portal Académico, 2. Ve a Pagos, 3. Selecciona el periodo, 4. Descarga el PDF.',
      palabrasClave: 'boleta, pago, descarga, recibo',
    },
  ]

  private agentes = [
    {
      id: 'agent-1',
      nombre: 'Carlos Díaz',
      nivel: 'N1',
      ticketsAsignados: 3,
      activo: true,
    },
    {
      id: 'agent-2',
      nombre: 'Patricia Flores',
      nivel: 'N2',
      ticketsAsignados: 1,
      activo: true,
    },
  ]

  // Simular búsqueda en FAQ
  buscarEnFAQ(consulta: string): any {
    const consultaBaja = consulta.toLowerCase()

    const resultado = this.faqItems.find((faq) => {
      const contenidoBajo = faq.contenido.toLowerCase()
      const palabrasBajo = faq.palabrasClave.toLowerCase()
      return (
        contenidoBajo.includes(consultaBaja) ||
        palabrasBajo.includes(consultaBaja)
      )
    })

    if (resultado) {
      return {
        resuelto: true,
        respuesta: resultado.contenido,
        confianza: 0.95,
      }
    }

    return {
      resuelto: false,
      respuesta: null,
      confianza: 0,
    }
  }

  // CUS02: Simular respuesta IA
  obtenerRespuestaIA(consulta: string): any {
    const resultado = this.buscarEnFAQ(consulta)

    return {
      resuelto: resultado.resuelto,
      respuesta: resultado.respuesta || 'No encontré la respuesta en mi base de conocimiento.',
      sugerirTicket: !resultado.resuelto,
      confianza: resultado.confianza,
    }
  }

  // CUS03: Crear ticket
  crearTicket(usuarioId: string, datos: any): string {
    const nuevoId = `#TK-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0')}`

    const nuevoTicket = {
      id: nuevoId,
      solicitanteId: usuarioId,
      asunto: datos.descripcion,
      estado: 'ABIERTO',
      prioridad: datos.prioridad || 'NORMAL',
      categoria: datos.categoria || 'Sin categoría',
      fechaCreacion: new Date().toISOString().split('T')[0],
      historialIA: datos.historialIA || { mensajes: [] },
    }

    this.tickets.unshift(nuevoTicket)
    return nuevoId
  }

  // CUS06: Cambiar estado
  cambiarEstadoTicket(ticketId: string, nuevoEstado: string): any {
    const ticket = this.tickets.find((t) => t.id === ticketId)
    if (ticket) {
      ticket.estado = nuevoEstado
      return { success: true, ticket }
    }
    return { success: false, error: 'Ticket no encontrado' }
  }

  // Obtener todos los datos
  getTickets(): any[] {
    return this.tickets
  }

  getUsuarios(): any[] {
    return this.usuarios
  }

  getAgentes(): any[] {
    return this.agentes
  }

  getFAQ(): any[] {
    return this.faqItems
  }

  // CUS01: Validar usuario
  validarUsuario(email: string): any {
    const usuario = this.usuarios.find((u) => u.email === email)
    if (usuario && usuario.estado === 'ACTIVO') {
      return { valido: true, usuario }
    }
    return { valido: false, error: 'Usuario no encontrado o inactivo' }
  }

  // Obtener ticket por ID
  getTicketById(ticketId: string): any {
    return this.tickets.find((t) => t.id === ticketId)
  }

  // Obtener tickets del usuario
  getTicketsByUsuario(usuarioId: string): any[] {
    return this.tickets.filter((t) => t.solicitanteId === usuarioId)
  }
}
