import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class BannerGateway {
  private readonly bannerApiUrl: string;
  private readonly bannerApiKey: string;

  constructor(private configService: ConfigService) {
    this.bannerApiUrl = this.configService.get<string>('BANNER_API_URL', '');
    this.bannerApiKey = this.configService.get<string>('BANNER_API_KEY', '');
  }

  async validateUser(email: string): Promise<any> {
    // RNS-06: Validar usuario en Banner Ellucian
    try {
      const response = await axios.get(
        `${this.bannerApiUrl}/users/${email}`,
        {
          headers: { 'X-API-Key': this.bannerApiKey },
        }
      );

      return {
        id: response.data.id,
        email: response.data.email,
        nombre: response.data.nombre,
        rol: response.data.rol,
        estado: response.data.estado, // ACTIVO, INACTIVO, SUSPENDIDO
      };
    } catch (error) {
      throw new HttpException('Error validando usuario en Banner', 500);
    }
  }

  async validateUserByDNI(dni: string): Promise<any> {
    // Validar por DNI
    try {
      const response = await axios.get(
        `${this.bannerApiUrl}/users/dni/${dni}`,
        {
          headers: { 'X-API-Key': this.bannerApiKey },
        }
      );
      return response.data;
    } catch (error) {
      throw new HttpException('Error validando DNI en Banner', 500);
    }
  }

  async getCourses(studentId: string): Promise<any[]> {
    // Obtener cursos del estudiante
    try {
      const response = await axios.get(
        `${this.bannerApiUrl}/students/${studentId}/courses`,
        {
          headers: { 'X-API-Key': this.bannerApiKey },
        }
      );
      return response.data;
    } catch (error) {
      throw new HttpException('Error obteniendo cursos', 500);
    }
  }
}
