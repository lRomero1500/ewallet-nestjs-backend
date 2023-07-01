import { Inject } from '@nestjs/common';
import { IAuth0Service, IUserRepository } from '../../core/interfaces';
import {
  Auth0ErrorResponseDTO,
  Auth0LoginResponseDTO,
  SignInDTO,
  UserProfileDTO,
} from '../../core/dtos';
import * as moment from 'moment';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { getMapperToken } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { RoleEntity } from '../../frameworks/data-services/pg';
import { RoleDTO } from '../../core/dtos/role/role.dto';
import { UserValidateTokenResponseDTO } from '../../core/dtos/user/user-validate-token-response.dto';

export class AuthUseCases {
  constructor(
    @Inject(getMapperToken()) private readonly mapper: Mapper,
    @Inject('IAuth0Service')
    private readonly auth0Service: IAuth0Service,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ENROLLMENT_SERVICE')
    private enrollmentClientProxy: ClientProxy,
  ) {}
  async authSignIn(signInDTO: SignInDTO): Promise<UserProfileDTO> {
    const authResponse = await this.auth0Service.getAppUserAuth0Token(
      signInDTO.email,
      signInDTO.password,
    );
    if ((authResponse as Auth0ErrorResponseDTO).error)
      throw new Error(
        `${(authResponse as Auth0ErrorResponseDTO).error} - ${
          (authResponse as Auth0ErrorResponseDTO).message
        }`,
      );
    const auth0Token = authResponse as Auth0LoginResponseDTO;
    const profile = await firstValueFrom(
      this.enrollmentClientProxy.send<UserProfileDTO>(
        { cmd: 'get_profile_information' },
        signInDTO.email,
      ),
    );
    const userPermissions = await this.userRepository.getByCondition({
      where: {
        id: profile.id,
      },
      relations: {
        roles: {
          permissions: true,
        },
      },
    });
    if (userPermissions) {
      profile.roles = await this.mapper.mapArrayAsync(
        userPermissions.roles,
        RoleEntity,
        RoleDTO,
      );
    }
    profile.token = auth0Token.access_token;
    profile.expires_at = moment()
      .add(auth0Token.expires_in, 'seconds')
      .toDate();
    return profile;
  }
  async validateAuth0Token(
    token: string,
  ): Promise<UserValidateTokenResponseDTO> {
    return await this.auth0Service.validateAuth0Token(token);
  }
}
