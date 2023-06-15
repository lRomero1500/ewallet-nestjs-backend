import { PersonEntity, UserEntity } from 'apps/enrollment-micro/src/frameworks';
import { ICommonResponse } from '../../ICommonResponse';

export interface IEnrollmentRepository {
  newEnrollmentValidations(
    person: PersonEntity,
    user: UserEntity,
  ): Promise<ICommonResponse>;
}
