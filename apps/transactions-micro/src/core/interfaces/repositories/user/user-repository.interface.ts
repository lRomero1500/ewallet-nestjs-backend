import { UserEntity } from 'apps/transactions-micro/src/frameworks/data-services/pg';
import { BaseRepositoryInterface } from '../base';

export interface IUserRepository extends BaseRepositoryInterface<UserEntity> {}
