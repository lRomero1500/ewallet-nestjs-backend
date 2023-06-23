import { Injectable } from '@nestjs/common';
import { BaseRepositoryAbstract } from 'apps/transactions-micro/src/core';
import { TransactionEntity } from '../../entities';
import { ITransactionsRepository } from '../../../../../core/interfaces/repositories/transactions/transactions-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class TransactionRepository
  extends BaseRepositoryAbstract<TransactionEntity>
  implements ITransactionsRepository
{
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {
    super(transactionRepository);
  }
}
