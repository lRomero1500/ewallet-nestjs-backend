import { Inject, Injectable } from '@nestjs/common';
import { IEnrollmentRepository } from '../../core/interfaces/repositories/enrollment/enrollment-repository.interface';
import { getMapperToken } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import {
  ICommonResponse,
  IPersonRepository,
  PersonDTO,
  UserDTO,
} from '../../core';
import { PersonEntity, UserEntity } from '../../frameworks';
import { ClientProxy } from '@nestjs/microservices';
import {
  Auth0UserCreateDTO,
  Auth0UserCreateResponseDTO,
} from '../../core/dtos/auth0/users';
import { Auth0ErrorResponseDTO } from '../../core/dtos/auth0/errors';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EnrollmentUseCases {
  constructor(
    @Inject(getMapperToken()) private readonly mapper: Mapper,
    @Inject('IEnrollmentRepository')
    private readonly enrollmentRepository: IEnrollmentRepository,
    @Inject('IPersonRepository')
    private readonly personRepository: IPersonRepository,
    @Inject('AUTH_SERVICE')
    private authClientProxy: ClientProxy,
  ) {}

  async newEnrollment(
    personDto: PersonDTO,
    userDto: UserDTO,
  ): Promise<ICommonResponse> {
    try {
      let result: ICommonResponse;
      const person = await this.personRepository.getByCondition({
        where: [
          { email: personDto.email },
          { phoneNumber: personDto.phoneNumber },
          {
            docTypeId: personDto.docTypeId,
            identificationNumber: personDto.identificationNumber,
          },
        ],
      });
      if (person) {
        return {
          isSuccess: false,
          error: {
            statusCode: '1001',
            statusMessage: 'Ya existe una persona con la misma información',
            traceError: null,
          },
        };
      }

      const authResponse = await firstValueFrom(
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
          user_id: userDto.id as string,
          connection: 'Username-Password-Authentication',
          password: userDto.password,
          verify_email: false,
        } as Auth0UserCreateDTO),
      );
      if ((authResponse as Auth0ErrorResponseDTO).error)
        throw new Error(
          `${(authResponse as Auth0ErrorResponseDTO).error} - ${
            (authResponse as Auth0ErrorResponseDTO).message
          }`,
        );
      else {
        const personEntity = await this.mapper.mapAsync(
          personDto,
          PersonDTO,
          PersonEntity,
        );
        const userEntity = await this.mapper.mapAsync(
          userDto,
          UserDTO,
          UserEntity,
        );
        result = await this.enrollmentRepository.newEnrollment(
          personEntity,
          userEntity,
        );
      }
      return result;
    } catch (error) {
      return {
        isSuccess: false,
        error: {
          statusCode: '9001',
          statusMessage: 'Ocurrio un error inesperado',
          traceError: error,
        },
      };
    }
  }
}
