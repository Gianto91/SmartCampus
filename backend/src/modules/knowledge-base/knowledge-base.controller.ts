import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { KnowledgeBaseService } from './knowledge-base.service';

@Controller('api/faq')
@ApiTags('FAQ')
export class KnowledgeBaseController {
  constructor(private readonly service: KnowledgeBaseService) {}

  @Post('articles')
  @ApiOperation({ summary: 'Crear nuevo artículo FAQ' })
  async createArticle(@Body() dto: any) {
    return { message: 'Artículo creado' };
  }

  @Get('gaps')
  @ApiOperation({ summary: 'Obtener brechas de conocimiento' })
  async getKnowledgeGaps() {
    return { gaps: [] };
  }
}
