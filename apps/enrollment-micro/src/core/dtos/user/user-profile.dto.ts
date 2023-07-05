import { AutoMap } from '@automapper/classes';
import { AccountDTO } from '../account';
import { PersonDTO } from '../person';

export class UserProfileDTO {
  id: string;
  @AutoMap()
  person: PersonDTO;
}
