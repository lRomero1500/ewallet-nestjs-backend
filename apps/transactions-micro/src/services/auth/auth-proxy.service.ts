import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserPermissionDTO } from '../../core';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthProxyService {
  constructor(
    @Inject('AUTH_SERVICE')
    private authClientProxy: ClientProxy,
  ) {}
  async validatePermission(
    userPermissionDTO: UserPermissionDTO,
  ): Promise<boolean> {
    const result = await firstValueFrom(
      this.authClientProxy.send<boolean>(
        { cmd: 'validate_user_permission' },
        userPermissionDTO,
      ),
    );
    return result;
  }
}
