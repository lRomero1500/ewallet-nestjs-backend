import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  ICommonResponse,
  PermissionsEnum,
  TransactionsDTO,
  Permissions,
  TransferAmountDTO,
  AuthGuard,
  PermissionsGuard,
} from '../../core';
import { TransactionsUseCases } from '../../use-cases/transactions/transactions.use-cases';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionUseCases: TransactionsUseCases) {}
  @EventPattern('topic.welcoming_bonus')
  handleWelcomingBonus(data: { transactionDTO: TransactionsDTO }) {
    this.transactionUseCases.welcomingBonus(data.transactionDTO);
  }
  @Permissions(PermissionsEnum.TRANSACTION_CREATE)
  @UseGuards(AuthGuard, PermissionsGuard)
  @Post('/transferAmount')
  async transferAmount(
    @Body() data: TransferAmountDTO,
    @Req() request: any,
  ): Promise<ICommonResponse> {
    const userId = request.user;
    data.transaction.userFromId = userId;
    return await this.transactionUseCases.transferAmount(
      data.amount,
      data.transaction,
    );
  }
}
