import { Module } from '@nestjs/common';
import { BannerGateway } from './banner.gateway';

@Module({
  providers: [BannerGateway],
  exports: [BannerGateway],
})
export class BannerModule {}
