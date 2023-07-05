import { BankBookEntity } from 'apps/transactions-micro/src/frameworks/data-services/pg';
import { BaseRepositoryInterface } from '../base';

export interface IBankBooksRepository
  extends BaseRepositoryInterface<BankBookEntity> {}
