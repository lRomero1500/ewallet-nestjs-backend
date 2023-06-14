import { Inject, Injectable } from '@nestjs/common';
import { IEnrollmentRepository } from '../../core/interfaces/repositories/enrollment/enrollment-repository.interface';
import { getMapperToken } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { IPersonRepository, PersonDTO, UserDTO } from '../../core';

@Injectable()
export class EnrollmentUseCases {
  constructor(
    @Inject(getMapperToken()) private readonly mapper: Mapper,
    @Inject('IEnrollmentRepository')
    private readonly enrollmentRepository: IEnrollmentRepository,
    @Inject('IPersonRepository')
    private readonly personRepository: IPersonRepository,
  ) {}

  async newEnrollment(personDto: PersonDTO, userDto: UserDTO) {
    //previous validations
    const person = this.personRepository.getByCondition({
      where: [
        { email: personDto.email },
        { phoneNumber: personDto.phoneNumber },
      ],
    });
  }
}
