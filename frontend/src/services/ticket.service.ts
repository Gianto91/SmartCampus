import apiClient from './api'

export const ticketService = {
  // CUS01: Validar usuario
  async validarUsuario(email: string) {
    try {
      const response = await apiClient.post('/tickets/validate-user', { email })
      return response.data
    } catch (error) {
      console.error('Error validando usuario:', error)
      throw error
    }
  },

  // CUS02: Consultar con IA
  async consultarIA(consulta: string, usuarioId: string) {
    try {
      const response = await apiClient.post('/tickets/consult-ia', {
        consulta,
        usuarioId,
      })
      return response.data
    } catch (error) {
      console.error('Error consultando IA:', error)
      throw error
    }
  },

  // CUS03: Crear ticket
  async crearTicket(datos: any) {
    try {
      const response = await apiClient.post('/tickets/create', datos)
      return response.data
    } catch (error) {
      console.error('Error creando ticket:', error)
      throw error
    }
  },

  // CUS06: Obtener ticket por ID
  async obtenerTicket(ticketId: string) {
    try {
      const response = await apiClient.get(`/tickets/${ticketId}`)
      return response.data
    } catch (error) {
      console.error('Error obteniendo ticket:', error)
      throw error
    }
  },

  // CUS06: Listar tickets del usuario
  async listarTickets(usuarioId: string) {
    try {
      const response = await apiClient.get(`/tickets/usuario/${usuarioId}`)
      return response.data
    } catch (error) {
      console.error('Error listando tickets:', error)
      throw error
    }
  },

  // CUS06: Cambiar estado del ticket
  async cambiarEstado(
    ticketId: string,
    nuevoEstado: string,
    diagnostico?: string,
    solucion?: string
  ) {
    try {
      const response = await apiClient.put(`/tickets/${ticketId}/status`, {
        nuevoEstado,
        diagnostico,
        solucion,
      })
      return response.data
    } catch (error) {
      console.error('Error cambiando estado:', error)
      throw error
    }
  },

  // CUS07: Obtener estado del ticket
  async obtenerEstado(ticketId: string) {
    try {
      const response = await apiClient.get(`/tickets/${ticketId}/status`)
      return response.data
    } catch (error) {
      console.error('Error obteniendo estado:', error)
      throw error
    }
  },

  // CUS08: Buscar en FAQs
  async buscarFAQ(query: string) {
    try {
      const response = await apiClient.get('/tickets/faq/search', {
        params: { query },
      })
      return response.data
    } catch (error) {
      console.error('Error buscando FAQ:', error)
      throw error
    }
  },

  // Obtener todos los tickets
  async obtenerTodosLosTickets() {
    try {
      const response = await apiClient.get('/tickets')
      return response.data
    } catch (error) {
      console.error('Error obteniendo tickets:', error)
      throw error
    }
  },
}
