# SmartCampus OmniDesk - Guía del Proyecto

**Plataforma de Gestión de Incidencias Omnicanal para UCIN**

---

## 📖 Visión General

SmartCampus OmniDesk es un sistema enterprise de gestión de tickets omnicanal que centraliza la atención de estudiantes, docentes y personal administrativo de la Universidad Científica del Norte (UCIN). Implementa un flujo trazable completo desde consulta inicial hasta resolución, con IA para autoatención y cumplimiento automático de SLA.

**Objetivos:**
- Reducir 45% tickets Nivel 1 manuales
- Garantizar 100% trazabilidad
- Asignar tickets críticos en <15 minutos

---

## 🏛️ 1. ENFOQUE DE NEGOCIO: Reglas Core y Restricciones

### RNS-01: Restricción de Canal por Rol

**Descripción:** El canal de atención está condicionado por el rol del usuario.

| Rol | Canal Permitido | Descripción |
|-----|-----------------|-------------|
| Estudiante | WhatsApp API | Solo vía WhatsApp (móvil) |
| Docente | WhatsApp API | Solo vía WhatsApp (móvil) |
| Administrativo | Portal Web | Solo vía navegador web |

**Implementación en Controlador:**
```typescript
// CtrlIdentidad - verificar antes de cualquier interacción
if (user.role === 'STUDENT' && channel !== 'WHATSAPP') {
  throw new ForbiddenException('Canal no permitido para este rol');
}
```

---

### RNS-02: Filtro de Autoatención Obligatorio

**Descripción:** Ningún usuario puede crear un ticket de soporte directamente. Solo se habilita tras registrar ≥1 intento fallido con el MotorIA.

**Flujo:**
1. Usuario inicia consulta → MotorIA intenta resolver
2. Si MotorIA FALLA → Se registra `intentos_fallidos++`
3. Si `intentos_fallidos >= 1` → Se habilita creación de ticket

**Validación en CtrlTicket:**
```typescript
POST /api/tickets {
  consulta_id: "...",
  descripcion: "...",
  archivo: "..."
}

if (consulta.intentos_fallidos < 1) {
  throw new BadRequestException(
    'Debe intentar autoatención primero'
  );
}
```

---

### RNS-03: Herencia de Contexto Inmutable

**Descripción:** Todo ticket adjunta el historial completo de IA. Este historial está BLOQUEADO para edición.

**Propiedades:**
- `HistorialIA` se copia íntegra al crear ticket
- Marcado como `inmutable: true` en BD
- Agente Soporte no reitera información existente
- Auditoría completa de interacción previa

**Modelo de Datos:**
```typescript
class Ticket {
  id: string;
  historialIA: HistorialIA; // Inmutable, no-editable
  solicitante: UsuarioInstitucional;
  descripcion: string;
  // ...
}

class HistorialIA {
  id: string;
  mensajes: Array<{ emisor, contenido, timestamp }>;
  bloqueado: true; // No permite DELETE ni UPDATE
}
```

---

### RNS-04: Acuerdos de Nivel de Servicio (SLA)

**Tiempos por Prioridad:**

| Prioridad | Tiempo Máximo | Descripción |
|-----------|---------------|-------------|
| **Alta** | 8 horas laborables | Incidencias críticas (ej: no puede pagar) |
| **Normal** | 24 horas laborables | Consultas regulares |
| **Baja** | 48 horas laborables | Solicitudes informativas |

**Implementación en CtrlClasificacion:**
```typescript
class PoliticaSLA {
  asignarSLA(prioridad: string): Date {
    const horasLaborables = {
      'ALTA': 8,
      'NORMAL': 24,
      'BAJA': 48
    };
    const vencimiento = ahora + horasLaborables[prioridad] * 3600 * 1000;
    return vencimiento;
  }
}
```

---

### RNS-05: Notificaciones Unidireccionales

**Descripción:** Cambios de estado disparan notificación por el **canal original exacto** del ticket.

| Cambio de Estado | Canal de Notificación |
|------------------|----------------------|
| En revisión → Resuelto | Mismo canal origen (WhatsApp o Portal) |
| Escalado a N2 | Notificación inmediata |
| Cerrado | Encuesta CSAT automática |

**Eventos Disparadores:**
- Ticket creado
- Asignado a agente
- Estado → "En revisión"
- Estado → "Resuelto"
- SLA a punto de vencer
- Ticket cerrado

---

### RNS-06: Validación Activa en Banner Ellucian

**Descripción:** Antes de iniciar cualquier flujo, validar que usuario tiene estado "activo" en Banner.

**Proceso en CtrlIdentidad:**
```
1. Usuario ingresa correo/DNI
2. Consultar GatewayInstitucional → Banner Ellucian
3. Verificar: estado = "ACTIVO"
4. Si INACTIVO → Bloquear acceso
5. Si ACTIVO → Continuar flujo
```

---

## 🔧 2. ENFOQUE BACKEND: Arquitectura y Modelado

### Estructura de Carpetas

```
backend/src/
├── modules/
│   ├── identity/           # CUS01 - Validación
│   │   ├── identity.controller.ts
│   │   ├── identity.service.ts
│   │   ├── dto/
│   │   └── identity.module.ts
│   ├── consultation/       # CUS02 - Autoatención IA
│   ├── tickets/            # CUS03 - Generación de tickets
│   ├── classification/     # CUS04 - Categorización
│   ├── assignment/         # CUS05 - Asignación automática
│   ├── resolution/         # CUS06 - Resolución
│   ├── notifications/      # CUS07 - Notificaciones
│   └── knowledge-base/     # CUS08 - FAQs
├── domain/
│   ├── entities/           # TypeORM entities
│   └── interfaces/         # Contratos
├── gateways/
│   ├── banner/             # Integración Ellucian
│   ├── whatsapp/           # WhatsApp Cloud API
│   └── portal-web/         # Portal institucional
├── common/
│   ├── guards/             # Auth, roles
│   ├── pipes/              # Validación
│   ├── interceptors/       # Logging, transformación
│   └── exceptions/         # Excepciones custom
├── config/                 # Configuración global
└── main.ts                 # Entry point
```

### Controladores (Clases Control)

#### CtrlIdentidad
```typescript
@Controller('api/auth')
export class IdentityController {
  @Post('validate')
  async validateUser(@Body() dto: ValidateUserDto): Promise<UserDTO> {
    // 1. Validar que usuario existe en Banner
    // 2. Verificar estado = ACTIVO
    // 3. Determinar rol (Student/Teacher/Admin)
    // 4. Validar canal permitido
    // 5. Generar JWT
    return userDTO;
  }
}
```

#### CtrlConsulta
```typescript
@Controller('api/consultations')
export class ConsultationController {
  @Post()
  async iniciarConsulta(@Body() dto: ConsultaDTO): Promise<ConsultaDTO> {
    // 1. Crear registro de Consulta
    // 2. Llamar MotorIA
    // 3. Registrar respuesta IA
    // 4. Si MotorIA falla → intentos_fallidos++
    return consultaDTO;
  }

  @Get(':id/history')
  async obtenerHistorial(@Param('id') consultaId: string) {
    // Retornar HistorialIA completo (bloqueado)
  }
}
```

#### CtrlTicket
```typescript
@Controller('api/tickets')
@UseGuards(JwtAuthGuard)
export class TicketController {
  @Post()
  async crearTicket(@Body() dto: CrearTicketDTO): Promise<TicketDTO> {
    // 1. Verificar RNS-02: intentos_fallidos >= 1
    // 2. Adjuntar HistorialIA inmutable
    // 3. Generar ID único (#TK-XXXX)
    // 4. Guardar ticket
    // 5. Disparar evento "TicketCreado"
    return ticketDTO;
  }

  @Get(':id')
  async obtenerTicket(@Param('id') ticketId: string) {
    // Retornar ticket + HistorialIA + detalles
  }
}
```

#### CtrlClasificacion
```typescript
@Controller('api/classification')
export class ClassificationController {
  @Post(':ticketId/classify')
  async clasificarTicket(@Param('ticketId') id: string): Promise<ClassificationDTO> {
    // 1. Analizar descripción del ticket
    // 2. Determinar categoría (Académica, Financiera, TI, etc.)
    // 3. Asignar prioridad (Alta/Normal/Baja)
    // 4. Aplicar RNS-04: calcular SLA
    return classificationDTO;
  }
}
```

#### CtrlAsignacion
```typescript
@Controller('api/assignment')
export class AssignmentController {
  @Post(':ticketId/assign')
  async asignarTicket(@Param('ticketId') id: string): Promise<AssignmentDTO> {
    // 1. Obtener categoría y prioridad
    // 2. Seleccionar AgenteSoporte disponible
    // 3. Validar capacidad de agente
    // 4. Asignar ticket
    // 5. Notificar agente (por email/dashboard)
    return assignmentDTO;
  }
}
```

#### CtrlResolucion
```typescript
@Controller('api/resolution')
export class ResolutionController {
  @Put(':ticketId/status')
  async cambiarEstado(
    @Param('ticketId') id: string,
    @Body() dto: CambiarEstadoDTO
  ): Promise<ResolutionDTO> {
    // 1. Validar transición de estado permitida
    // 2. Si estado = "Resuelto" → almacenar diagnóstico
    // 3. Disparar RNS-05: notificación a usuario
    // 4. Calcular métricas (tiempo resolución, etc.)
    // 5. Si derivación a N2 → RNS-05 notifica agente N2
    return resolutionDTO;
  }
}
```

#### CtrlNotificacion
```typescript
@Controller('api/notifications')
export class NotificationController {
  async enviarNotificacion(event: TicketEventDTO): Promise<void> {
    // 1. Obtener canal origen del ticket (WhatsApp o Portal)
    // 2. Si origen = WhatsApp → enviar a CanalWhatsApp
    // 3. Si origen = Portal → enviar a PortalWeb
    // 4. Registrar en BD: Notificacion { usuario_id, ticket_id, estado, timestamp }
    // 5. Manejar reintentos
  }
}
```

#### CtrlConocimiento
```typescript
@Controller('api/faq')
@UseGuards(AdminGuard)
export class KnowledgeController {
  @Post('articles')
  async crearArticulo(@Body() dto: ArticuloFAQDTO): Promise<ArticuloFAQDTO> {
    // 1. Validar que solo Admin puede crear
    // 2. Redactar artículo
    // 3. Entrenar MotorIA con nuevo contenido (sandbox)
    // 4. Publicar globalmente
    return articuloDTO;
  }

  @Get('gaps')
  async obtenerBrechasConocimiento(): Promise<GapDTO[]> {
    // Analizar tickets sin resolver → topics faltantes en FAQ
  }
}
```

### Entidades del Dominio (TypeORM Entities)

```typescript
// domain/entities/usuario-institucional.entity.ts
@Entity('usuarios_institucionales')
export class UsuarioInstitucional {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  email: string;

  @Column('varchar', { length: 20 })
  dni: string;

  @Column('enum', { enum: ['STUDENT', 'TEACHER', 'ADMIN'] })
  rol: string;

  @Column('enum', { enum: ['ACTIVO', 'INACTIVO', 'SUSPENDIDO'] })
  estado: string;

  @Column('varchar', { length: 50 })
  nombreCompleto: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}

// domain/entities/consulta.entity.ts
@Entity('consultas')
export class Consulta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsuarioInstitucional)
  usuario: UsuarioInstitucional;

  @Column('enum', { enum: ['WHATSAPP', 'PORTAL_WEB'] })
  canal: string;

  @Column('int', { default: 0 })
  intentos_fallidos: number;

  @CreateDateColumn()
  fechaInicio: Date;

  @Column('timestamp', { nullable: true })
  fechaCierre: Date;

  @OneToOne(() => HistorialIA)
  historialIA: HistorialIA;
}

// domain/entities/historial-ia.entity.ts
@Entity('historiales_ia')
export class HistorialIA {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => MensajeIA, msg => msg.historial)
  mensajes: MensajeIA[];

  @Column('boolean', { default: true })
  bloqueado: boolean; // Inmutable

  @CreateDateColumn()
  fechaCreacion: Date;
}

// domain/entities/ticket.entity.ts
@Entity('tickets')
export class Ticket {
  @PrimaryColumn('varchar', { length: 20 }) // #TK-9041
  id: string;

  @ManyToOne(() => UsuarioInstitucional)
  solicitante: UsuarioInstitucional;

  @Column('enum', { enum: ['WHATSAPP', 'PORTAL_WEB'] })
  canalOrigen: string;

  @OneToOne(() => HistorialIA)
  historialIA: HistorialIA; // Inmutable

  @Column('text')
  descripcion: string;

  @Column('enum', { enum: ['ABIERTO', 'EN_REVISIÓN', 'RESUELTO', 'CERRADO'] })
  estado: string;

  @Column('enum', { enum: ['ALTA', 'NORMAL', 'BAJA'] })
  prioridad: string;

  @ManyToOne(() => AgenteSoporte, { nullable: true })
  agenteAsignado: AgenteSoporte;

  @Column('timestamp')
  slaVencimiento: Date;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}

// domain/entities/agente-soporte.entity.ts
@Entity('agentes_soporte')
export class AgenteSoporte {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('enum', { enum: ['N1', 'N2'] })
  nivel: string;

  @Column('int', { default: 0 })
  ticketsAsignados: number;

  @Column('int', { default: 5 })
  capacidadMaxima: number;

  @Column('boolean', { default: true })
  activo: boolean;
}

// domain/entities/atencion-ticket.entity.ts
@Entity('atenciones_tickets')
export class AtencionTicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Ticket)
  ticket: Ticket;

  @ManyToOne(() => AgenteSoporte)
  agente: AgenteSoporte;

  @Column('text', { nullable: true })
  diagnostico: string;

  @Column('text', { nullable: true })
  solucion: string;

  @Column('text', { nullable: true })
  notaDerivacion: string; // Si se escala a N2

  @CreateDateColumn()
  fechaAtencion: Date;
}

// domain/entities/notificacion.entity.ts
@Entity('notificaciones')
export class Notificacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsuarioInstitucional)
  usuario: UsuarioInstitucional;

  @ManyToOne(() => Ticket)
  ticket: Ticket;

  @Column('enum', { enum: ['WHATSAPP', 'PORTAL_WEB', 'EMAIL'] })
  canal: string;

  @Column('text')
  mensaje: string;

  @Column('boolean', { default: false })
  enviado: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;
}

// domain/entities/articulo-faq.entity.ts
@Entity('articulos_faq')
export class ArticuloFAQ {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  titulo: string;

  @Column('text')
  contenido: string;

  @Column('varchar', { length: 100 })
  categoria: string;

  @Column('int', { default: 0 })
  indiceResolucion: number; // % de consultas resueltas

  @Column('boolean', { default: true })
  publicado: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}
```

### Integraciones (Boundary Classes)

```typescript
// gateways/banner/banner.gateway.ts
@Injectable()
export class BannerGateway {
  async validarUsuario(email: string): Promise<BannerUserDTO> {
    // Llamar a Banner Ellucian API
    // Retornar datos de usuario + estado
  }

  async obtenerCursosEstudiante(dni: string): Promise<CursoDTO[]> {
    // Retornar lista de cursos inscritos
  }
}

// gateways/whatsapp/whatsapp.gateway.ts
@Injectable()
export class WhatsAppGateway {
  async enviarMensaje(phoneNumber: string, mensaje: string): Promise<void> {
    // Usar WhatsApp Cloud API
  }

  async enviarTarjeta(phoneNumber: string, tarjeta: TarjetaDTO): Promise<void> {
    // Enviar tarjeta interactiva
  }
}

// gateways/portal-web/portal-web.gateway.ts
@Injectable()
export class PortalWebGateway {
  async notificarEstado(usuarioId: string, evento: EventoDTO): Promise<void> {
    // Enviar WebSocket o Server-Sent Events al frontend
  }
}
```

---

## 🎨 3. ENFOQUE FRONTEND: Interfaces y Flujos (UI/UX)

### Estructura de Componentes por Bloque

```
frontend/src/blocks/
├── students/
│   ├── ChatWhatsAppScreen.tsx       # E-01 a E-11
│   ├── ValidateUserScreen.tsx       # E-01
│   ├── ValidationErrorScreen.tsx    # E-02
│   ├── TicketGenerationScreen.tsx   # E-06/07
│   ├── NotificationCards.tsx        # E-08/09
│   └── CSATSurvey.tsx               # E-10/11
├── teachers/
│   ├── TeacherChatScreen.tsx        # D-01 a D-07
│   ├── CriticalIncidentCard.tsx     # D-04/05
│   └── TeacherSLAIndicator.tsx
├── admin/
│   ├── AdminLandingPage.tsx         # A-01/02
│   ├── AdminChatWidget.tsx          # A-03/04
│   ├── TicketFormModal.tsx          # A-05/06
│   ├── MyTicketsTable.tsx           # A-07/10
│   └── StatusBadges.tsx
├── faq-manager/
│   ├── FAQDashboard.tsx             # F-01 a F-05
│   ├── ArticleEditor.tsx
│   ├── KnowledgeGapAnalysis.tsx
│   └── SandboxChat.tsx
├── ticket-center/
│   ├── SupportDashboard.tsx         # S-01 a S-07
│   ├── N1Inbox.tsx
│   ├── TicketDetailView.tsx
│   ├── RootCauseForm.tsx
│   └── SLATrafficLight.tsx
└── executive-dashboard/
    ├── ExecutiveDashboard.tsx       # J-01/02
    ├── HeatmapByFaculty.tsx
    ├── SLAComplianceMetrics.tsx
    └── LiveSemaphore.tsx
```

### Pantallas Clave (Mockups)

#### Bloque 1: Estudiantes (WhatsApp)

**E-01: Chat WhatsApp - Validación**
```
┌─────────────────────────────────┐
│ SmartCampus UCIN Bot    [✓ Oficial]
├─────────────────────────────────┤
│                                 │
│ ¡Hola! Bienvenido al sistema... │
│ Ingresa tu correo institucional  │
│ o tu DNI para validar tu perfil. │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ juan.perez@ucin.edu.pe      │ │
│ └─────────────────────────────┘ │
│                   [ VALIDAR ]    │
└─────────────────────────────────┘
```

**E-03: Validación Exitosa**
```
┌─────────────────────────────────┐
│ SmartCampus UCIN Bot            │
├─────────────────────────────────┤
│ ✅ ¡Validación exitosa!          │
│                                 │
│ Hola Juan Pablo Pérez Ramos     │
│ Estudiante de Pregrado          │
│ Medicina Humana                 │
│                                 │
│ ¿En qué te puedo ayudar hoy?    │
│                                 │
│ [ Pagos ]  [ Académico ]        │
│ [ Banca ] [ Otro ]              │
└─────────────────────────────────┘
```

#### Bloque 3: Administrativos (Portal Web)

**A-01: Landing Page**
```
┌──────────────────────────────────────┐
│ SmartCampus OmniDesk       [Google SSO]
├──────────────────────────────────────┤
│                                      │
│  Bienvenido al Portal de Soporte    │
│                                      │
│  FAQs Rápidas:                       │
│  □ Cómo cambiar contraseña           │
│  □ Solicitar certificado             │
│  □ Reportar incidencia técnica       │
│                                      │
│              💬                      │ ← Widget Chat (animado)
│            Soporte                   │
│                                      │
└──────────────────────────────────────┘
```

**A-05: Modal Generar Ticket**
```
┌─────────────────────────────┐
│ Generar Ticket        [X]    │
├─────────────────────────────┤
│ Clasificación:              │
│ [▼ Seleccionar categoría] │
│                            │
│ Descripción:              │
│ ┌──────────────────────┐  │
│ │ Describe tu problema │  │
│ └──────────────────────┘  │
│                            │
│ Prioridad: [▼ Normal]     │
│                            │
│ Adjuntar archivo:         │
│ [📎 Seleccionar archivo] │
│                            │
│ Fecha requerida:          │
│ [📅 dd/mm/yyyy]           │
│                            │
│     [CANCELAR]  [CREAR]    │
└─────────────────────────────┘
```

**A-07: Mis Tickets (Tabla Histórica)**
```
┌────────────────────────────────────────────┐
│ Mis Tickets                [Filtrar]       │
├────────────────────────────────────────────┤
│ ID    │ Asunto        │ Estado    │ SLA   │
├───────┼───────────────┼───────────┼───────┤
│#TK-01 │Cambio pass    │[🔵 ABIERTO] │8h   │
│#TK-02 │Certificado    │[🟡 EN REVISIÓN] │24h│
│#TK-03 │Incidencia TI  │[🟠 ESCALADO N2]  │5h│
│#TK-04 │Beca solicitada│[🟢 RESUELTO] │✓  │
└────────────────────────────────────────────┘
```

---

## ✅ 4. ENFOQUE QA: Criterios de Aceptación

### Tests Unitarios (Backend)

```typescript
// test/unit/identity/identity.controller.spec.ts
describe('IdentityController - RNS-01', () => {
  it('debe rechazar admin por WhatsApp', async () => {
    const user = { id: '1', role: 'ADMIN', email: 'admin@ucin.edu.pe' };
    const channel = 'WHATSAPP';

    expect(() =>
      identityService.validateChannel(user, channel)
    ).toThrow(ForbiddenException);
  });
});

// test/unit/tickets/ticket.controller.spec.ts
describe('TicketController - RNS-02', () => {
  it('debe bloquear creación sin intentos_fallidos >= 1', async () => {
    const consulta = { id: '1', intentos_fallidos: 0 };
    const dto = { consultaId: '1', descripcion: '...' };

    const result = await ticketService.createTicket(dto);

    expect(result).toThrowError('Debe intentar autoatención primero');
  });
});

// test/unit/tickets/historial-ia.spec.ts
describe('HistorialIA - RNS-03', () => {
  it('debe bloquear mutaciones en historial inmutable', async () => {
    const historial = { id: '1', bloqueado: true, mensajes: [...] };

    expect(() =>
      historialIA.eliminarMensaje(historial.mensajes[0].id)
    ).toThrow('HistorialIA está bloqueado para edición');
  });
});

// test/unit/classification/sla-policy.spec.ts
describe('PoliticaSLA - RNS-04', () => {
  it('debe asignar 8 horas laborables para prioridad ALTA', () => {
    const vencimiento = slaPolicy.calcularVencimiento('ALTA');
    const diferenciaHoras = (vencimiento - ahora) / 3600 / 1000;

    expect(diferenciaHoras).toBe(8);
  });
});

// test/unit/notifications/notification.service.spec.ts
describe('NotificationController - RNS-05', () => {
  it('debe enviar notif a WhatsApp si ticket originado en WhatsApp', async () => {
    const ticket = { id: '#TK-01', canalOrigen: 'WHATSAPP' };
    const evento = { tipo: 'RESUELTO', timestamp: new Date() };

    await notificationService.enviarNotificacion(ticket, evento);

    expect(whatsappGateway.enviarMensaje).toHaveBeenCalled();
    expect(portalWebGateway.notificar).not.toHaveBeenCalled();
  });
});

// test/unit/identity/banner-validation.spec.ts
describe('BannerGateway - RNS-06', () => {
  it('debe rechazar usuario con estado INACTIVO', async () => {
    const usuario = { dni: '12345678', estado: 'INACTIVO' };
    bannerGateway.mockResolvedValue(usuario);

    expect(() =>
      identityService.validateActive(usuario)
    ).toThrow('Usuario inactivo');
  });
});
```

### Tests de Integración

```typescript
// test/integration/ticket-creation.spec.ts
describe('Flujo Completo: Creación de Ticket', () => {
  it('debe completar ciclo: validación → consulta → ticket → notificación', async () => {
    // 1. Validar usuario contra Banner
    const usuario = await request(app.getHttpServer())
      .post('/api/auth/validate')
      .send({ email: 'student@ucin.edu.pe' })
      .expect(200);

    // 2. Iniciar consulta IA
    const consulta = await request(app.getHttpServer())
      .post('/api/consultations')
      .send({ canal: 'WHATSAPP', pregunta: '¿Cómo pago mi matrícula?' })
      .expect(200);

    // 3. Simular fallo IA
    expect(consulta.body.intentos_fallidos).toBe(1);

    // 4. Crear ticket
    const ticket = await request(app.getHttpServer())
      .post('/api/tickets')
      .send({
        consultaId: consulta.body.id,
        descripcion: 'No puedo pagar',
      })
      .expect(201);

    expect(ticket.body.id).toMatch(/^#TK-\d+$/);

    // 5. Verificar notificación enviada
    expect(whatsappGateway.enviarMensaje).toHaveBeenCalled();
  });
});
```

---

## 📦 Dependencias Críticas

### Backend
- NestJS 10.3+
- TypeORM 0.3+
- PostgreSQL 16+
- Passport.js con Google OAuth2

### Frontend
- React 18+
- Tailwind CSS 3.3+
- Vite 5+

---

## 🚀 Próximos Pasos

1. ✅ Crear estructura base (completado)
2. ⏳ Implementar controladores backend
3. ⏳ Crear migraciones de BD
4. ⏳ Construir componentes frontend
5. ⏳ Integraciones (Banner, WhatsApp)
6. ⏳ Tests unitarios e integración
7. ⏳ Deployment con Docker

---

**Última actualización:** 2026-09-11
**Autor:** Tech Lead - SmartCampus UCIN
