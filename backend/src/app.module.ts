import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Modules
import { IdentityModule } from '@modules/identity/identity.module';
import { ConsultationModule } from '@modules/consultation/consultation.module';
import { TicketModule } from '@modules/tickets/ticket.module';
import { ClassificationModule } from '@modules/classification/classification.module';
import { AssignmentModule } from '@modules/assignment/assignment.module';
import { ResolutionModule } from '@modules/resolution/resolution.module';
import { NotificationModule } from '@modules/notifications/notification.module';
import { KnowledgeBaseModule } from '@modules/knowledge-base/knowledge-base.module';

// Gateways
import { BannerModule } from '@gateways/banner/banner.module';
import { WhatsAppModule } from '@gateways/whatsapp/whatsapp.module';
import { PortalWebModule } from '@gateways/portal-web/portal-web.module';

// Common
import { DatabaseConfig } from '@config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => DatabaseConfig.getConfig(configService),
    }),

    // Authentication
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'dev-secret-key',
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION') || '7d',
        },
      }),
    }),

    // Feature Modules
    IdentityModule,
    ConsultationModule,
    TicketModule,
    ClassificationModule,
    AssignmentModule,
    ResolutionModule,
    NotificationModule,
    KnowledgeBaseModule,

    // Gateway Modules
    BannerModule,
    WhatsAppModule,
    PortalWebModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
