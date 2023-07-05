import { Injectable } from '@nestjs/common';
import { GenderEntity } from '../../entities';
import {
  BaseRepositoryAbstract,
  IGenderRepository,
} from 'apps/enrollment-micro/src/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GenderRepository
  extends BaseRepositoryAbstract<GenderEntity>
  implements IGenderRepository
{
  constructor(
    @InjectRepository(GenderEntity)
    private readonly repository: Repository<GenderEntity>,
  ) {
    super(repository);
  }
}
