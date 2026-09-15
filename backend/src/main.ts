import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cors from 'cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Servir frontend compilado como archivos estáticos
  const frontendPath = join(__dirname, '../../frontend/dist');
  app.useStaticAssets(frontendPath, {
    prefix: '/',
    maxAge: '1d',
    etag: false,
  });

  // SPA fallback - redirigir rutas desconocidas a index.html
  app.use((req, res, next) => {
    // Si no es una ruta de API y no es un archivo estático, servir index.html
    if (!req.path.startsWith('/api') && !req.path.includes('.')) {
      res.sendFile(join(frontendPath, 'index.html'));
    } else {
      next();
    }
  });

  // CORS Configuration
  app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const messages = errors
          .map(err => `${err.property}: ${Object.values(err.constraints || {}).join(', ')}`)
          .join('; ');
        return new BadRequestException(messages);
      },
    }),
  );

  // Swagger/OpenAPI Documentation
  const config = new DocumentBuilder()
    .setTitle('SmartCampus OmniDesk API')
    .setDescription(
      'API REST para plataforma de gestión de incidencias omnicanal - UCIN'
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Auth', 'Autenticación y validación')
    .addTag('Consultations', 'Consultas y autoatención IA')
    .addTag('Tickets', 'Gestión de tickets')
    .addTag('Classification', 'Clasificación y priorización')
    .addTag('Assignment', 'Asignación automática')
    .addTag('Resolution', 'Resolución de tickets')
    .addTag('Notifications', 'Notificaciones')
    .addTag('FAQ', 'Base de conocimientos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.BACKEND_PORT || 3001;
  await app.listen(port, () => {
    console.log(`✅ SmartCampus OmniDesk API escuchando en puerto ${port}`);
    console.log(`📖 Documentación: http://localhost:${port}/api/docs`);
  });
}

bootstrap().catch(err => {
  console.error('❌ Error al iniciar aplicación:', err);
  process.exit(1);
});
