import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { TransactionsDTO } from '../../core';
import { TransactionsUseCases } from '../../use-cases/transactions/transactions.use-cases';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionUseCases: TransactionsUseCases) {}
  @EventPattern('topic.welcoming_bonus')
  handleWelcomingBonus(data: { transactionDTO: TransactionsDTO }) {
    console.log('datos: ', data.transactionDTO);
    this.transactionUseCases.welcomingBonus(data.transactionDTO);
  }
}
