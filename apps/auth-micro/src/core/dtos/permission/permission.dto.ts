import { AutoMap } from '@automapper/classes';

export class PermissionDTO {
  @AutoMap()
  permission: string;
}
