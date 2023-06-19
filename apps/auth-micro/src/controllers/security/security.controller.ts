import { Controller, Inject, Post, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  Auth0ErrorResponseDTO,
  Auth0UserCreateDTO,
  Auth0UserCreateResponseDTO,
} from '../../core';
import { SecurityUseCases } from '../../use-cases/security/security.use-cases';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityUseCases: SecurityUseCases) {}
  @MessagePattern({ cmd: 'create_user_security' })
  async handleUserCreate(
    @Payload() data: Auth0UserCreateDTO,
  ): Promise<Auth0UserCreateResponseDTO | Auth0ErrorResponseDTO> {
    return await this.securityUseCases.newEnrollment(data);
  }
  @Post('/new')
  async UserCreate(
    @Body() data: Auth0UserCreateDTO,
  ): Promise<Auth0UserCreateResponseDTO | Auth0ErrorResponseDTO> {
    return await this.securityUseCases.newEnrollment(data);
  }
}
