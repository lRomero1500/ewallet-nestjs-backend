import { Controller, Get, Req, UseGuards, Param } from '@nestjs/common';
import { TransactionsUseCases } from '../../use-cases/transactions/transactions.use-cases';
import {
  ActivityDTO,
  ICommonResponse,
  PermissionsEnum,
  PermissionsGuard,
  Permissions,
  AuthGuard,
  DetailedActivityDTO,
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
  @Permissions(PermissionsEnum.ACTIVITY_READ)
  @UseGuards(AuthGuard, PermissionsGuard)
  @Get(':transactionId')
  getUserActivityDetailed(
    @Param('transactionId') transactionId: number,
    @Req() request: any,
  ): Promise<ICommonResponse<DetailedActivityDTO>> {
    const userId = request.user;
    return this.transactionUseCases.getUserActivityDetailed(
      userId,
      transactionId,
    );
  }
}
