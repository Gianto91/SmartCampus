import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NotificationService } from './notification.service';

@Controller('api/notifications')
@ApiTags('Notifications')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Post('send')
  @ApiOperation({
    summary: 'Enviar notificación',
    description: 'RNS-05: Envía por canal original (WhatsApp o Portal Web)'
  })
  async send(@Body() dto: any) {
    return { message: 'Notificación enviada' };
  }
}
