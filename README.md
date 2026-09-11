# SmartCampus OmniDesk 🎓

**Sistema de Gestión de Incidencias y Requerimientos Omnicanal impulsado por IA**

Plataforma enterprise para la Universidad Científica del Norte (UCIN) que centraliza la atención de tickets a través de múltiples canales (WhatsApp, Portal Web) con inteligencia artificial y cumplimiento de SLA automático.

## 🎯 Objetivos Principales

- ✅ Reducir en 45% el volumen de tickets Nivel 1 atendidos manualmente
- ✅ Garantizar 100% de trazabilidad de tickets
- ✅ Asignar tickets críticos en menos de 15 minutos
- ✅ Automatizar respuestas a través de IA
- ✅ Mantener cumplimiento de SLA en tiempo real

## 🏗️ Arquitectura del Proyecto

```
smartcampus-omnidesk/
├── backend/          # API REST (NestJS + PostgreSQL)
├── frontend/         # UI (React + Tailwind CSS)
├── docs/             # Documentación técnica
└── docker-compose.yml # Infraestructura local
```

## 🚀 Instalación y Configuración

### Prerequisitos

- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 16+ (o usar Docker)
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd smartcampus-omnidesk
   ```

2. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env con tus valores
   ```

3. **Levantar la infraestructura con Docker**
   ```bash
   docker-compose up -d
   ```

4. **Instalar dependencias del backend**
   ```bash
   cd backend
   npm install
   npm run migration:run
   cd ..
   ```

5. **Instalar dependencias del frontend**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

6. **Iniciar servicios en desarrollo**
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run start:dev

   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

7. **Acceder a la aplicación**
   - Frontend: http://localhost:3000
   - API: http://localhost:3001/api
   - Swagger API Docs: http://localhost:3001/api/docs
   - PgAdmin: http://localhost:5050

## 📋 Especificaciones Técnicas

### Reglas de Negocio (RNS)

| Código | Descripción |
|--------|-------------|
| RNS-01 | Restricción de Canal por Rol |
| RNS-02 | Filtro de Autoatención Obligatorio |
| RNS-03 | Herencia de Contexto Inmutable |
| RNS-04 | Acuerdos de Nivel de Servicio (SLA) |
| RNS-05 | Notificaciones Unidireccionales |
| RNS-06 | Validación Activa en Banner Ellucian |

### Stack Tecnológico

**Backend:**
- NestJS (Framework)
- TypeORM (ORM)
- PostgreSQL (Base de datos)
- Redis (Caché)
- Passport.js (Autenticación)

**Frontend:**
- React 18
- Tailwind CSS
- TypeScript
- Vite
- Zustand (State Management)

**Integraciones:**
- WhatsApp Cloud API
- Banner Ellucian
- Google OAuth2

## 📚 Documentación

- [Arquitectura de Negocio](./docs/architecture.md)
- [Especificación de API](./docs/api-spec.md)
- [Guía de Deployment](./docs/deployment.md)
- [Guía del Proyecto](./CLAUDE.md)

## 🧪 Testing

### Backend
```bash
cd backend
npm run test              # Unit tests
npm run test:integration  # Integration tests
npm run test:cov          # Coverage report
```

### Frontend
```bash
cd frontend
npm run test              # Unit tests
npm run test:ui           # UI mode
```

## 🔐 Seguridad

- JWT para autenticación stateless
- CORS configurado por origen
- Rate limiting en endpoints públicos
- Validación de entrada en todos los controladores
- Protección contra inyección SQL (TypeORM)
- HTTPS en producción

## 📞 Soporte

Para reportar issues o sugerencias, crear un ticket en este repositorio.

---

**Desarrollado por:** Tech Lead - SmartCampus UCIN
**Última actualización:** 2026-09-11
