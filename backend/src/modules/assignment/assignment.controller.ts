import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AssignmentService } from './assignment.service';

@Controller('api/assignment')
@ApiTags('Assignment')
export class AssignmentController {
  constructor(private readonly service: AssignmentService) {}

  @Post(':ticketId/assign')
  @ApiOperation({ summary: 'Asignar ticket automáticamente a agente disponible' })
  async assign(@Param('ticketId') id: string, @Body() dto: any) {
    return { message: 'Asignación completada' };
  }
}
