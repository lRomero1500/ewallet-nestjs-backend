import { Injectable } from '@nestjs/common';
import { BaseRepositoryAbstract } from 'apps/enrollment-micro/src/core';
import { UserEntity } from '../../entities';
import { IUserRepository } from 'apps/enrollment-micro/src/core/interfaces/repositories/user/user-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository
  extends BaseRepositoryAbstract<UserEntity>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }
}
