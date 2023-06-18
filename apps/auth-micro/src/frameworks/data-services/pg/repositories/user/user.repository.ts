import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryAbstract } from 'apps/auth-micro/src/core/abstracts';
import { IUserRepository } from 'apps/auth-micro/src/core/interfaces/repositories/user/user.interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities';

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
