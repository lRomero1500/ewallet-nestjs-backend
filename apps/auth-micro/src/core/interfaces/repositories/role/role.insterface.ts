import { BaseRepositoryInterface } from 'apps/auth-micro/src/core';
import { RoleEntity } from 'apps/auth-micro/src/frameworks/data-services/pg/entities';

export interface IRoleRepository extends BaseRepositoryInterface<RoleEntity> {}
