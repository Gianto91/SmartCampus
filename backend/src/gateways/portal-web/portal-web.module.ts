import { Module } from '@nestjs/common';
import { PortalWebGateway } from './portal-web.gateway';

@Module({
  providers: [PortalWebGateway],
  exports: [PortalWebGateway],
})
export class PortalWebModule {}
