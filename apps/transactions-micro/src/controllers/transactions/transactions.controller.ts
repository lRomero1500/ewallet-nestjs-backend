import { Body, Controller, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ICommonResponse, TransactionsDTO } from '../../core';
import { TransactionsUseCases } from '../../use-cases/transactions/transactions.use-cases';
import { TransferAmountDTO } from '../../core/dtos/transactions/transferAmount.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionUseCases: TransactionsUseCases) {}
  @EventPattern('topic.welcoming_bonus')
  handleWelcomingBonus(data: { transactionDTO: TransactionsDTO }) {
    this.transactionUseCases.welcomingBonus(data.transactionDTO);
  }

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
