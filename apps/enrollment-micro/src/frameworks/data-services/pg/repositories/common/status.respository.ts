import { Injectable } from '@nestjs/common';
import {
  BaseRepositoryAbstract,
  IStatusRepository,
} from 'apps/enrollment-micro/src/core';
import { StatusEntity } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StatusRepository
  extends BaseRepositoryAbstract<StatusEntity>
  implements IStatusRepository
{
  constructor(
    @InjectRepository(StatusEntity)
    private readonly repository: Repository<StatusEntity>,
  ) {
    super(repository);
  }
}
