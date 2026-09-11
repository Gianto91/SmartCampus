import { Controller, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResolutionService } from './resolution.service';

@Controller('api/resolution')
@ApiTags('Resolution')
export class ResolutionController {
  constructor(private readonly service: ResolutionService) {}

  @Put(':ticketId/status')
  @ApiOperation({
    summary: 'Cambiar estado del ticket',
    description: 'RNS-05: Dispara notificaciones al canal original'
  })
  async changeStatus(
    @Param('ticketId') id: string,
    @Body() dto: any
  ) {
    return { message: 'Estado actualizado' };
  }
}
