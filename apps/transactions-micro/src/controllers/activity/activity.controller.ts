import { Controller, Get, Param } from '@nestjs/common';
import { TransactionsUseCases } from '../../use-cases/transactions/transactions.use-cases';
import { ActivityDTO, ICommonResponse } from '../../core';

@Controller('activity')
export class ActivityController {
  constructor(private readonly transactionUseCases: TransactionsUseCases) {}

  @Get(':userId')
  getUserActivity(
    @Param('userId') userId: string,
  ): Promise<ICommonResponse<ActivityDTO[]>> {
    return this.transactionUseCases.getUserActivity(userId);
  }
}
