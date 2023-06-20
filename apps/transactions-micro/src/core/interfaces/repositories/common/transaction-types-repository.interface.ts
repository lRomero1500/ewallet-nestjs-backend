import { TransactionTypesEntity } from 'apps/transactions-micro/src/frameworks/data-services/pg';
import { BaseRepositoryAbstract } from '../../../abstracts';

export interface ITransactionTypesRepository
  extends BaseRepositoryAbstract<TransactionTypesEntity> {}
