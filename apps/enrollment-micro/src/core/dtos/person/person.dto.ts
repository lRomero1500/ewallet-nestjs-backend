import { AutoMap } from '@automapper/classes';
export class PersonDTO {
  @AutoMap()
  id: string;
  @AutoMap()
  name: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  genderId: number;
  @AutoMap()
  identificationNumber: string;
  @AutoMap()
  docTypeId: number;
  @AutoMap()
  phoneNumber: string;
  @AutoMap()
  email: string;
}
