import { Inject, Injectable } from '@nestjs/common';
import { IEnrollmentRepository } from '../../core/interfaces/repositories/enrollment/enrollment-repository.interface';

@Injectable()
export class EnrollmentUseCases {
  constructor(
    @Inject('IEnrollmentRepository')
    private readonly enrollmentRepository: IEnrollmentRepository,
  ) {}
}
