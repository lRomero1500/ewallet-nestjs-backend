import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  Auth0ErrorResponseDTO,
  Auth0UserCreateDTO,
  Auth0UserCreateResponseDTO,
  PersonDTO,
  UserDTO,
  UserPermissionDTO,
  UserValidateTokenResponseDTO,
} from '../../core/dtos';

@Injectable()
export class AuthProxyService {
  constructor(
    @Inject('AUTH_SERVICE')
    private authClientProxy: ClientProxy,
  ) {}
  async validatePermission(
    userPermissionDTO: UserPermissionDTO,
  ): Promise<boolean> {
    const result = await firstValueFrom(
      this.authClientProxy.send<boolean>(
        { cmd: 'validate_user_permission' },
        userPermissionDTO,
      ),
    );
    return result;
  }
  async validateToken(token: string): Promise<UserValidateTokenResponseDTO> {
    const result = await firstValueFrom(
      this.authClientProxy.send<UserValidateTokenResponseDTO>(
        { cmd: 'validate_user_token' },
        { token },
      ),
    );
    return result;
  }
  async createAuth0User(
    personDto: PersonDTO,
    userDto: UserDTO,
  ): Promise<Auth0UserCreateResponseDTO | Auth0ErrorResponseDTO> {
    return await firstValueFrom(
      this.authClientProxy.send<
        Auth0UserCreateResponseDTO | Auth0ErrorResponseDTO
      >({ cmd: 'create_user_security' }, {
        email: personDto.email,
        blocked: false,
        email_verified: false,
        given_name: personDto.name,
        family_name: personDto.lastName,
        name: `${personDto.name} ${personDto.lastName}`,
        picture:
          'https://secure.gravatar.com/avatar/15626c5e0c749cb912f9d1ad48dba440?s=480&r=pg&d=https%3A%2F%2Fssl.gstatic.com%2Fs2%2Fprofiles%2Fimages%2Fsilhouette80.png',
        user_id: userDto.id,
        connection: 'Username-Password-Authentication',
        password: userDto.password,
        verify_email: false,
      } as Auth0UserCreateDTO),
    );
  }
}
