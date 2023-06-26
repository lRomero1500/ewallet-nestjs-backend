import { Controller } from '@nestjs/common';
import { AccountUseCases } from '../../use-cases/account/account.use-cases';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import {
  UserStatusBalanceBindingDTO,
  UserStatusBalanceResponseDTO,
} from '../../core/dtos';
import { ICommonResponse } from '../../core/interfaces';

@Controller('account')
export class AccountController {
  constructor(private readonly accountUseCases: AccountUseCases) {}
  @MessagePattern({ cmd: 'getUserStatusAndBalance' }, Transport.TCP)
  async handleGetUserStatusAndBalance(
    @Payload() data: UserStatusBalanceBindingDTO,
  ): Promise<ICommonResponse<UserStatusBalanceResponseDTO>> {
    return await this.accountUseCases.getUserStatusAndBalance(data);
  }
}
