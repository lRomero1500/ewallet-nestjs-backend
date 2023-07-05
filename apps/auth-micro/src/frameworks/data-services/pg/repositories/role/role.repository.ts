import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryAbstract } from 'apps/auth-micro/src/core/abstracts';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../entities';
import { IRoleRepository } from 'apps/auth-micro/src/core/interfaces/repositories/role/role.insterface';

@Injectable()
export class RoleRepository
  extends BaseRepositoryAbstract<RoleEntity>
  implements IRoleRepository
{
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {
    super(roleRepository);
  }
}
