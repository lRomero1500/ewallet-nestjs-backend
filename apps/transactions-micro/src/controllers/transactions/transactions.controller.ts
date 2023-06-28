import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  ICommonResponse,
  PermissionsEnum,
  TransactionsDTO,
  Permissions,
  TransferAmountDTO,
} from '../../core';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../../core/guards/permissions.guard';
import { TransactionsUseCases } from '../../use-cases/transactions/transactions.use-cases';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionUseCases: TransactionsUseCases) {}
  @EventPattern('topic.welcoming_bonus')
  handleWelcomingBonus(data: { transactionDTO: TransactionsDTO }) {
    this.transactionUseCases.welcomingBonus(data.transactionDTO);
  }
  @Permissions(PermissionsEnum.TRANSACTION_CREATE)
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post('/transferAmount')
  async transferAmount(
    @Body() data: TransferAmountDTO,
  ): Promise<ICommonResponse> {
    return await this.transactionUseCases.transferAmount(
      data.amount,
      data.transaction,
    );
  }
}
