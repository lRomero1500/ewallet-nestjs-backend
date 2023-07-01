import { AutoMap } from '@automapper/classes';
import { PermissionDTO } from '../permission/permission.dto';

export class RoleDTO {
  role: string;
  @AutoMap()
  permissions: PermissionDTO[];
}
