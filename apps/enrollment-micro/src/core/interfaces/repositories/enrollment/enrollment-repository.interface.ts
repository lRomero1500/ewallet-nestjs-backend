import { PersonEntity, UserEntity } from 'apps/enrollment-micro/src/frameworks';

export interface IEnrollmentRepository {
  newEnrollment(person: PersonEntity, user: UserEntity): Promise<boolean>;
}
