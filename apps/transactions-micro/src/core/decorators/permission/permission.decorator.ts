import { SetMetadata } from '@nestjs/common';
import { PermissionsEnum } from '../../enums';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permission: PermissionsEnum[]) =>
  SetMetadata(PERMISSIONS_KEY, permission);
