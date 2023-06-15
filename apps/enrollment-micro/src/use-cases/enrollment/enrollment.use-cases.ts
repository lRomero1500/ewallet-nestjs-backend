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
import { PersonEntity } from '../../frameworks';

@Injectable()
export class EnrollmentUseCases {
  constructor(
    @Inject(getMapperToken()) private readonly mapper: Mapper,
    @Inject('IEnrollmentRepository')
    private readonly enrollmentRepository: IEnrollmentRepository,
    @Inject('IPersonRepository')
    private readonly personRepository: IPersonRepository,
  ) {}

  async newEnrollmentValidations(
    personDto: PersonDTO,
    userDto: UserDTO,
  ): Promise<ICommonResponse> {
    try {
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
      const personEntity = await this.mapper.mapAsync(
        personDto,
        PersonDTO,
        PersonEntity,
      );
      return {
        data: null,
        isSuccess: true,
      };
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
    //previous validations
  }
}
