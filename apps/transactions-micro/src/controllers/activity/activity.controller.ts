import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TransactionsUseCases } from '../../use-cases/transactions/transactions.use-cases';
import { ActivityDTO, ICommonResponse } from '../../core';
import { AuthGuard } from '@nestjs/passport';

@Controller('activity')
export class ActivityController {
  constructor(private readonly transactionUseCases: TransactionsUseCases) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':userId')
  getUserActivity(
    @Param('userId') userId: string,
  ): Promise<ICommonResponse<ActivityDTO[]>> {
    return this.transactionUseCases.getUserActivity(userId);
  }
}
