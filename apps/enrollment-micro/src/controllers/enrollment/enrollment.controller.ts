import { Body, Controller, Post } from '@nestjs/common';
import { EnrollmentUseCases } from '../../use-cases/enrollment/enrollment.use-cases';
import { Observable, from } from 'rxjs';
import { EnrollmentDTO } from '../../core/dtos/enrollment/enrollment.dto';
import { ICommonResponse } from '../../core';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentUseCases: EnrollmentUseCases) {}

  @Post('/new')
  newEnrollment(
    @Body() args: EnrollmentDTO,
  ): Observable<ICommonResponse<null>> {
    return from(this.enrollmentUseCases.newEnrollment(args.person, args.user));
  }
}
