import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabaseConfig {
  static getConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get<string>('DB_HOST', 'localhost'),
      port: configService.get<number>('DB_PORT', 5432),
      username: configService.get<string>('DB_USERNAME', 'smartcampus'),
      password: configService.get<string>('DB_PASSWORD', 'password'),
      database: configService.get<string>('DB_NAME', 'smartcampus_omnidesk'),
      entities: [__dirname + '/../**/*.entity.ts'],
      migrations: [__dirname + '/../migrations/*.ts'],
      synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
      logging: configService.get<boolean>('DB_LOGGING', false),
      ssl: configService.get<boolean>('DB_SSL', false) ? { rejectUnauthorized: false } : false,
    };
  }
}
