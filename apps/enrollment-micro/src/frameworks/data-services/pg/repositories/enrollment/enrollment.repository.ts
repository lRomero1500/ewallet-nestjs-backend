import { Injectable } from '@nestjs/common';
import { IEnrollmentRepository } from 'apps/enrollment-micro/src/core/interfaces/repositories/enrollment/enrollment-repository.interface';
import { Observable } from 'rxjs';
import { DataSource } from 'typeorm';

@Injectable()
export class EnrollmentRepository implements IEnrollmentRepository {
  constructor(private dataSource: DataSource) {}
  newEnrollment(enrollmentDTO: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
