import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsEnum } from '../../enums';
import { PERMISSIONS_KEY } from '../../decorators';
import { AuthProxyService } from 'apps/enrollment-micro/src/services/auth/auth-proxy.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthProxyService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionsEnum[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const can = await this.authService.validatePermission({
      userId: user,
      permission: requiredPermissions[0],
    });
    return can;
  }
}
