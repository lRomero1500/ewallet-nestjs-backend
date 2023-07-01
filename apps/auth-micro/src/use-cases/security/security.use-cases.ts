import { Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import {
  Auth0ErrorResponseDTO,
  Auth0LoginResponseDTO,
  Auth0UserCreateDTO,
  Auth0UserCreateResponseDTO,
  IAuth0Repository,
  IAuth0Service,
  IRoleRepository,
  IUserRepository,
} from '../../core';
import {
  Auth0ApiTokenEntity,
  RoleEntity,
  UserEntity,
} from '../../frameworks/data-services/pg';
import { AxiosError, AxiosResponse } from 'axios';
@Injectable()
export class SecurityUseCases {
  constructor(
    @Inject('IAuth0Service')
    private readonly auth0Service: IAuth0Service,
    @Inject('IAuth0Repository')
    private readonly auth0Repository: IAuth0Repository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IRoleRepository')
    private readonly roleRepository: IRoleRepository,
  ) {}

  async newEnrollment(
    userAuth0DTO: Auth0UserCreateDTO,
  ): Promise<Auth0UserCreateResponseDTO | Auth0ErrorResponseDTO> {
    try {
      let activeToken = await this.auth0Repository.get(1);
      const isActive = activeToken
        ? moment(activeToken.expiresAt).diff(moment(), 'hours') > 0
        : false;
      if (!isActive) {
        const token = await this.auth0Service.getAppAuth0Token();
        if ((token as Auth0ErrorResponseDTO).error) {
          throw new Error(
            `Error Auth0 Service ${(token as Auth0ErrorResponseDTO).error} - ${
              (token as Auth0ErrorResponseDTO).message
            }`,
          );
        } else if ((token as Auth0LoginResponseDTO).access_token) {
          const expiresAt = moment()
            .add((token as Auth0LoginResponseDTO).expires_in, 'seconds')
            .toDate();
          const newAuthToken = new Auth0ApiTokenEntity();
          newAuthToken.id = 1;
          newAuthToken.apiToken = (token as Auth0LoginResponseDTO).access_token;
          newAuthToken.expiresAt = expiresAt;
          if (activeToken)
            activeToken = await this.auth0Repository.update(1, newAuthToken);
          else activeToken = await this.auth0Repository.create(newAuthToken);
        }
      }
      const auth0UserCreate = await this.auth0Service.createAuthUser(
        userAuth0DTO,
        activeToken?.apiToken as string,
      );
      if ((auth0UserCreate as Auth0ErrorResponseDTO).error)
        throw new Error((auth0UserCreate as Auth0ErrorResponseDTO).error);
      else if ((auth0UserCreate as Auth0UserCreateResponseDTO).user_id) {
        const naturalPersonRole = await this.roleRepository.get(2);
        const newUser = new UserEntity();
        newUser.id = (
          auth0UserCreate as Auth0UserCreateResponseDTO
        ).user_id.split('|')[1];
        newUser.roles = [naturalPersonRole as RoleEntity];
        const userLocalCreated = await this.userRepository.create(newUser);
        if (userLocalCreated)
          return auth0UserCreate as Auth0UserCreateResponseDTO;
        else
          throw new Error('Error local repository, saving User on Auth Schema');
      }
      return new Auth0UserCreateResponseDTO();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.code && error.code == 'ERR_BAD_REQUEST') {
          return ((error as AxiosError).response as AxiosResponse)
            .data as Auth0ErrorResponseDTO;
        }
      }
      throw error;
    }
  }
  async validatePermission(
    userId: string,
    permission: string,
  ): Promise<boolean> {
    const userPermission = await this.userRepository.getByCondition({
      where: {
        id: userId,
        roles: {
          permissions: {
            permission: permission,
          },
        },
      },
    });
    return userPermission ? true : false;
  }
}
