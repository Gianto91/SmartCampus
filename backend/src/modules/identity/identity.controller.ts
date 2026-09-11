import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IdentityService } from './identity.service';

@Controller('api/auth')
@ApiTags('Auth')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('validate')
  @ApiOperation({
    summary: 'Validar usuario contra Banner Ellucian',
    description: 'RNS-01, RNS-06: Valida identidad, estado activo y canal permitido'
  })
  async validateUser(@Body() dto: any) {
    // TODO: Implementar validación contra Banner
    return { message: 'Validación en implementación' };
  }

  @Post('login')
  @ApiOperation({ summary: 'Autenticación con OAuth2 Google' })
  async login(@Body() dto: any) {
    // TODO: Implementar OAuth2
    return { message: 'Login en implementación' };
  }

  @Get('profile')
  @UseGuards()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  async getProfile() {
    // TODO: Implementar
    return { message: 'Perfil en implementación' };
  }
}
