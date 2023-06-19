import { GenderEntity } from 'apps/enrollment-micro/src/frameworks';
import { BaseRepositoryInterface } from '../base/base-repository.interface';

export interface IGenderRepository
  extends BaseRepositoryInterface<GenderEntity> {}
