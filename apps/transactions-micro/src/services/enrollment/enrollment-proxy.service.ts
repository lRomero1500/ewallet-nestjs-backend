import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ICommonResponse,
  UserProfileDTO,
  UserStatusBalanceBindingDTO,
  UserStatusBalanceResponseDTO,
} from '../../core';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EnrollmentProxyService {
  constructor(
    @Inject('ENROLLMENT_SERVICE')
    private enrollmentClientProxy: ClientProxy,
  ) {}
  async getUserStatusAndBalance(
    userId: string,
    searchType: 'userId' | 'phone',
  ): Promise<ICommonResponse<UserStatusBalanceResponseDTO>> {
    return await firstValueFrom(
      this.enrollmentClientProxy.send<
        ICommonResponse<UserStatusBalanceResponseDTO>
      >({ cmd: 'getUserStatusAndBalance' }, {
        searchType,
        userSearchParam: userId,
      } as UserStatusBalanceBindingDTO),
    );
  }
  async getProfileInfo(userId: string): Promise<UserProfileDTO> {
    return await firstValueFrom(
      this.enrollmentClientProxy.send<UserProfileDTO>(
        { cmd: 'get_profile_information_by_id' },
        userId,
      ),
    );
  }
}
