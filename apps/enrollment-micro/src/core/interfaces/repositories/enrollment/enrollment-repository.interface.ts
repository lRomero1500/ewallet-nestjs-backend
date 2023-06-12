import { Observable } from 'rxjs';
import { PersonDTO, AccountDTO, UserDTO } from '../../../dtos';

export interface IEnrollmentRepository {
  newEnrollment(
    personDto: PersonDTO,
    accountDto: AccountDTO,
    userDto: UserDTO,
  ): Observable<any>;
}
