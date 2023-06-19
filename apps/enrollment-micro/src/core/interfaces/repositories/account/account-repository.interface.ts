import { AccountEntity } from 'apps/enrollment-micro/src/frameworks';
import { BaseRepositoryInterface } from '../base';

export interface IAccountRepository
  extends BaseRepositoryInterface<AccountEntity> {}
