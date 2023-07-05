import { BaseRepositoryInterface } from 'apps/auth-micro/src/core';
import { UserEntity } from 'apps/auth-micro/src/frameworks/data-services/pg/entities';

export interface IUserRepository extends BaseRepositoryInterface<UserEntity> {}
