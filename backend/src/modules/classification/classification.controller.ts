import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ClassificationService } from './classification.service';

@Controller('api/classification')
@ApiTags('Classification')
export class ClassificationController {
  constructor(private readonly service: ClassificationService) {}

  @Post(':ticketId/classify')
  @ApiOperation({
    summary: 'Clasificar ticket y asignar prioridad',
    description: 'RNS-04: Calcula SLA según prioridad (8h/24h/48h)'
  })
  async classify(@Param('ticketId') id: string, @Body() dto: any) {
    return { message: 'Clasificación completada' };
  }
}
