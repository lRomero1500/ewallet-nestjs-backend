import { Injectable } from '@nestjs/common';
import { BaseRepositoryAbstract } from 'apps/enrollment-micro/src/core';
import { AccountEntity } from '../../entities';
import { IAccountRepository } from 'apps/enrollment-micro/src/core/interfaces/repositories/account/account-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountRepository
  extends BaseRepositoryAbstract<AccountEntity>
  implements IAccountRepository
{
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {
    super(accountRepository);
  }
}
