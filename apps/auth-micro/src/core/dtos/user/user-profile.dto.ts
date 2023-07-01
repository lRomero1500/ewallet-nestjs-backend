import { AutoMap } from '@automapper/classes';
import { PersonDTO } from '../person';
import { RoleDTO } from '../role/role.dto';

export class UserProfileDTO {
  id: string;
  @AutoMap()
  person: PersonDTO;
  roles: RoleDTO[];
  token: string;
  expires_at: Date;
}
