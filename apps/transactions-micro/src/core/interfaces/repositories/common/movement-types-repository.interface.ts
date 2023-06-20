import { MovementTypesEntity } from 'apps/transactions-micro/src/frameworks/data-services/pg';
import { BaseRepositoryInterface } from '../base';

export interface IMovementTypesRepository
  extends BaseRepositoryInterface<MovementTypesEntity> {}
