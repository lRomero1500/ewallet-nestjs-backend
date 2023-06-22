import { StatusEntity } from 'apps/transactions-micro/src/frameworks/data-services/pg';
import { BaseRepositoryInterface } from '../base/base-repository.interface';

export interface IStatusRepository
  extends BaseRepositoryInterface<StatusEntity> {}
