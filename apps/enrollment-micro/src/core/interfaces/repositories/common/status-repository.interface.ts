import { StatusEntity } from 'apps/enrollment-micro/src/frameworks';
import { BaseRepositoryInterface } from '../base/base-repository.interface';

export interface IStatusRepository
  extends BaseRepositoryInterface<StatusEntity> {}
