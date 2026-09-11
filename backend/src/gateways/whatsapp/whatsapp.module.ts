import { Module } from '@nestjs/common';
import { WhatsAppGateway } from './whatsapp.gateway';

@Module({
  providers: [WhatsAppGateway],
  exports: [WhatsAppGateway],
})
export class WhatsAppModule {}
