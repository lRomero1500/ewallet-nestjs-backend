import { Inject, Injectable } from '@nestjs/common';
import { IEnrollmentRepository } from '../../core/interfaces/repositories/enrollment/enrollment-repository.interface';
import { getMapperToken } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import {
  ICommonResponse,
  IPersonRepository,
  PersonDTO,
  TransactionsDTO,
  UserDTO,
} from '../../core';
import { PersonEntity, UserEntity } from '../../frameworks';
import { Auth0ErrorResponseDTO } from '../../core/dtos/auth0/errors';
import { AuthProxyService, KafkaProxyService } from '../../services';

@Injectable()
export class EnrollmentUseCases {
  constructor(
    @Inject(getMapperToken()) private readonly mapper: Mapper,
    @Inject('IEnrollmentRepository')
    private readonly enrollmentRepository: IEnrollmentRepository,
    @Inject('IPersonRepository')
    private readonly personRepository: IPersonRepository,
    private readonly authProxyService: AuthProxyService,
    private readonly kafkaProxyService: KafkaProxyService,
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
      const authResponse = await this.authProxyService.createAuth0User(
        personDto,
        userDto,
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
        if (result.isSuccess) {
          const transactionDTO = new TransactionsDTO();
          transactionDTO.statusId = 2;
          transactionDTO.typeId = 2;
          transactionDTO.userToId = userDto.id;
          this.kafkaProxyService.welcomingBonus(transactionDTO);
        }
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
