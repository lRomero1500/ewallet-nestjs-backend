import { BaseRepositoryInterface } from 'apps/auth-micro/src/core';
import { Auth0ApiTokenEntity } from 'apps/auth-micro/src/frameworks/data-services/pg/entities';

export interface IAuth0Repository
  extends BaseRepositoryInterface<Auth0ApiTokenEntity> {}
