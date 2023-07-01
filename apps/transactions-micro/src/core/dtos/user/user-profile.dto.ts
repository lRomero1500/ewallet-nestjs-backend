import { AutoMap } from '@automapper/classes';
import { PersonDTO } from '../person';

export class UserProfileDTO {
  id: string;
  @AutoMap()
  person: PersonDTO;
}
