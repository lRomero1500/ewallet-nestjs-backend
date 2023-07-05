import {
  BaseRepositoryAbstract,
  ITransactionTypesRepository,
} from 'apps/transactions-micro/src/core';
import { TransactionTypesEntity } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionTypesRepository
  extends BaseRepositoryAbstract<TransactionTypesEntity>
  implements ITransactionTypesRepository
{
  constructor(
    @InjectRepository(TransactionTypesEntity)
    private readonly transactionTypesRepository: Repository<TransactionTypesEntity>,
  ) {
    super(transactionTypesRepository);
  }
}
