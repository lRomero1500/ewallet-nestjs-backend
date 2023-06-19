import { Injectable } from '@nestjs/common';
import { Auth0ApiTokenEntity } from '../../entities';
import { BaseRepositoryAbstract } from 'apps/auth-micro/src/core';
import { IAuth0Repository } from 'apps/auth-micro/src/core/interfaces/repositories/auth0/auth0.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class Auth0Repository
  extends BaseRepositoryAbstract<Auth0ApiTokenEntity>
  implements IAuth0Repository
{
  constructor(
    @InjectRepository(Auth0ApiTokenEntity)
    private readonly auth0Repository: Repository<Auth0ApiTokenEntity>,
  ) {
    super(auth0Repository);
  }
}
