import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class InitialSchema1726056000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Usuarios Institucionales
    await queryRunner.createTable(
      new Table({
        name: 'usuarios_institucionales',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
          { name: 'email', type: 'varchar', length: '100', isUnique: true },
          { name: 'dni', type: 'varchar', length: '20', isUnique: true },
          { name: 'rol', type: 'enum', enum: ['STUDENT', 'TEACHER', 'ADMIN'] },
          { name: 'estado', type: 'enum', enum: ['ACTIVO', 'INACTIVO', 'SUSPENDIDO'] },
          { name: 'nombreCompleto', type: 'varchar', length: '200' },
          { name: 'fechaCreacion', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          { name: 'fechaActualizacion', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
        ],
      })
    )

    // Consultas (para el flujo de autoatención)
    await queryRunner.createTable(
      new Table({
        name: 'consultas',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
          { name: 'usuarioId', type: 'uuid' },
          { name: 'canal', type: 'enum', enum: ['WHATSAPP', 'PORTAL_WEB'] },
          { name: 'intentosFallidos', type: 'int', default: 0 },
          { name: 'descripcion', type: 'text' },
          { name: 'fechaInicio', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          { name: 'fechaCierre', type: 'timestamp', isNullable: true },
        ],
        foreignKeys: [
          {
            columnNames: ['usuarioId'],
            referencedTableName: 'usuarios_institucionales',
            referencedColumnNames: ['id'],
          },
        ],
      })
    )

    // Historial IA (inmutable)
    await queryRunner.createTable(
      new Table({
        name: 'historiales_ia',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
          { name: 'consultaId', type: 'uuid', isUnique: true },
          { name: 'contenido', type: 'jsonb' },
          { name: 'bloqueado', type: 'boolean', default: true },
          { name: 'fechaCreacion', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
        ],
        foreignKeys: [
          {
            columnNames: ['consultaId'],
            referencedTableName: 'consultas',
            referencedColumnNames: ['id'],
          },
        ],
      })
    )

    // Tickets de Soporte
    await queryRunner.createTable(
      new Table({
        name: 'tickets',
        columns: [
          { name: 'id', type: 'varchar', length: '20', isPrimary: true },
          { name: 'solicitanteId', type: 'uuid' },
          { name: 'consultaId', type: 'uuid', isNullable: true },
          { name: 'canalOrigen', type: 'enum', enum: ['WHATSAPP', 'PORTAL_WEB'] },
          { name: 'descripcion', type: 'text' },
          { name: 'estado', type: 'enum', enum: ['ABIERTO', 'EN_REVISIÓN', 'RESUELTO', 'CERRADO'], default: "'ABIERTO'" },
          { name: 'prioridad', type: 'enum', enum: ['ALTA', 'NORMAL', 'BAJA'], default: "'NORMAL'" },
          { name: 'categoria', type: 'varchar', length: '100' },
          { name: 'agenteAsignadoId', type: 'uuid', isNullable: true },
          { name: 'slaVencimiento', type: 'timestamp' },
          { name: 'fechaCreacion', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          { name: 'fechaActualizacion', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
        ],
        foreignKeys: [
          {
            columnNames: ['solicitanteId'],
            referencedTableName: 'usuarios_institucionales',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['consultaId'],
            referencedTableName: 'consultas',
            referencedColumnNames: ['id'],
          },
        ],
      })
    )

    // Agentes de Soporte
    await queryRunner.createTable(
      new Table({
        name: 'agentes_soporte',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
          { name: 'nombre', type: 'varchar', length: '100' },
          { name: 'nivel', type: 'enum', enum: ['N1', 'N2'] },
          { name: 'ticketsAsignados', type: 'int', default: 0 },
          { name: 'capacidadMaxima', type: 'int', default: 5 },
          { name: 'activo', type: 'boolean', default: true },
          { name: 'fechaCreacion', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
        ],
      })
    )

    // Atención de Tickets
    await queryRunner.createTable(
      new Table({
        name: 'atenciones_tickets',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
          { name: 'ticketId', type: 'varchar', length: '20' },
          { name: 'agenteId', type: 'uuid' },
          { name: 'diagnostico', type: 'text', isNullable: true },
          { name: 'solucion', type: 'text', isNullable: true },
          { name: 'notaDerivacion', type: 'text', isNullable: true },
          { name: 'fechaAtencion', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
        ],
        foreignKeys: [
          {
            columnNames: ['ticketId'],
            referencedTableName: 'tickets',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['agenteId'],
            referencedTableName: 'agentes_soporte',
            referencedColumnNames: ['id'],
          },
        ],
      })
    )

    // Notificaciones
    await queryRunner.createTable(
      new Table({
        name: 'notificaciones',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
          { name: 'usuarioId', type: 'uuid' },
          { name: 'ticketId', type: 'varchar', length: '20' },
          { name: 'canal', type: 'enum', enum: ['WHATSAPP', 'PORTAL_WEB', 'EMAIL'] },
          { name: 'mensaje', type: 'text' },
          { name: 'enviado', type: 'boolean', default: false },
          { name: 'fechaCreacion', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
        ],
        foreignKeys: [
          {
            columnNames: ['usuarioId'],
            referencedTableName: 'usuarios_institucionales',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['ticketId'],
            referencedTableName: 'tickets',
            referencedColumnNames: ['id'],
          },
        ],
      })
    )

    // Base de Conocimientos (FAQs)
    await queryRunner.createTable(
      new Table({
        name: 'articulos_faq',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
          { name: 'titulo', type: 'varchar', length: '200' },
          { name: 'contenido', type: 'text' },
          { name: 'categoria', type: 'varchar', length: '100' },
          { name: 'palabrasClave', type: 'text' },
          { name: 'indiceResolucion', type: 'int', default: 0 },
          { name: 'publicado', type: 'boolean', default: true },
          { name: 'fechaCreacion', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          { name: 'fechaActualizacion', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('articulos_faq')
    await queryRunner.dropTable('notificaciones')
    await queryRunner.dropTable('atenciones_tickets')
    await queryRunner.dropTable('agentes_soporte')
    await queryRunner.dropTable('tickets')
    await queryRunner.dropTable('historiales_ia')
    await queryRunner.dropTable('consultas')
    await queryRunner.dropTable('usuarios_institucionales')
  }
}
