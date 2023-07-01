import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AccountUseCases } from '../../use-cases/account/account.use-cases';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import {
  UserStatusBalanceBindingDTO,
  UserStatusBalanceResponseDTO,
} from '../../core/dtos';
import { ICommonResponse } from '../../core/interfaces';
import Decimal from 'decimal.js';
import { AuthGuard, PermissionsGuard } from '../../core/guards';
import { PermissionsEnum } from '../../core/enums';
import { Permissions } from '../../core/decorators';

@Controller('account')
export class AccountController {
  constructor(private readonly accountUseCases: AccountUseCases) {}
  @MessagePattern({ cmd: 'getUserStatusAndBalance' }, Transport.TCP)
  async handleGetUserStatusAndBalance(
    @Payload() data: UserStatusBalanceBindingDTO,
  ): Promise<ICommonResponse<UserStatusBalanceResponseDTO>> {
    return await this.accountUseCases.getUserStatusAndBalance(data);
  }
  @Permissions(PermissionsEnum.BALANCE_READ)
  @UseGuards(AuthGuard, PermissionsGuard)
  @Get('/balance')
  async getUserBalance(@Req() request: any): Promise<Decimal> {
    const userId = request.user;
    const userBalance = await this.accountUseCases.getUserStatusAndBalance({
      searchType: 'userId',
      userSearchParam: userId,
    });
    return (userBalance.data as UserStatusBalanceResponseDTO).balance;
  }
}
