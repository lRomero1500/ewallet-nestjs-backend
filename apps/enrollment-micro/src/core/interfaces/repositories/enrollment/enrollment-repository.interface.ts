import { PersonEntity, UserEntity } from 'apps/enrollment-micro/src/frameworks';
import { ICommonResponse } from '../../ICommonResponse';

export interface IEnrollmentRepository {
  newEnrollment(
    person: PersonEntity,
    user: UserEntity,
  ): Promise<ICommonResponse>;
}
