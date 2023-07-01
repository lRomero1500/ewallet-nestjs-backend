import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TransactionsUseCases } from '../../use-cases/transactions/transactions.use-cases';
import {
  ActivityDTO,
  ICommonResponse,
  PermissionsEnum,
  PermissionsGuard,
  Permissions,
  AuthGuard,
} from '../../core';

@Controller('activity')
export class ActivityController {
  constructor(private readonly transactionUseCases: TransactionsUseCases) {}

  @Permissions(PermissionsEnum.ACTIVITY_READ)
  @UseGuards(AuthGuard, PermissionsGuard)
  @Get()
  getUserActivity(
    @Req() request: any,
  ): Promise<ICommonResponse<ActivityDTO[]>> {
    const userId = request.user;
    return this.transactionUseCases.getUserActivity(userId);
  }
}
