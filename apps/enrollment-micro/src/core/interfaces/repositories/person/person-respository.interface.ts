import { PersonEntity } from 'apps/enrollment-micro/src/frameworks';
import { BaseRepositoryInterface } from '../base';

export interface IPersonRepository
  extends BaseRepositoryInterface<PersonEntity> {}
