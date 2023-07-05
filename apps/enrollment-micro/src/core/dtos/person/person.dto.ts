import { AutoMap } from '@automapper/classes';
import { DocumentTypeDTO } from '../common';
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
  documentType: DocumentTypeDTO;
  @AutoMap()
  phoneNumber: string;
  @AutoMap()
  email: string;
}
