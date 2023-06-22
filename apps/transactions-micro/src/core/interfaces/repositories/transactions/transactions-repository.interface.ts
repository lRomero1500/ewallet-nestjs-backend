import { TransactionEntity } from 'apps/transactions-micro/src/frameworks/data-services/pg';
import { BaseRepositoryInterface } from '../base';

export interface ITransactionsRepository
  extends BaseRepositoryInterface<TransactionEntity> {}
