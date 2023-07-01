import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import {
  Auth0ErrorResponseDTO,
  Auth0UserCreateDTO,
  Auth0UserCreateResponseDTO,
  UserPermissionDTO,
  UserValidateTokenRequestDTO,
  UserValidateTokenResponseDTO,
} from '../../core';
import { AuthUseCases, SecurityUseCases } from '../../use-cases';

@Controller('security')
export class SecurityController {
  constructor(
    private readonly securityUseCases: SecurityUseCases,
    private readonly authUseCases: AuthUseCases,
  ) {}
  @MessagePattern({ cmd: 'create_user_security' }, Transport.TCP)
  async handleUserCreate(
    @Payload() data: Auth0UserCreateDTO,
  ): Promise<Auth0UserCreateResponseDTO | Auth0ErrorResponseDTO> {
    return await this.securityUseCases.newEnrollment(data);
  }
  @MessagePattern({ cmd: 'validate_user_permission' }, Transport.TCP)
  async handleValidateUserPermission(
    @Payload() data: UserPermissionDTO,
  ): Promise<boolean> {
    return await this.securityUseCases.validatePermission(
      data.userId,
      data.permission,
    );
  }
  @MessagePattern({ cmd: 'validate_user_token' }, Transport.TCP)
  async validateAuth0Token(
    @Payload() token: UserValidateTokenRequestDTO,
  ): Promise<UserValidateTokenResponseDTO> {
    return await this.authUseCases.validateAuth0Token(token?.token);
  }
}
