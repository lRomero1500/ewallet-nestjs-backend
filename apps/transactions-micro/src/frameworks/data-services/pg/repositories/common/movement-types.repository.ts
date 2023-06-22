import { IMovementTypesRepository } from 'apps/transactions-micro/src/core';
import { BaseRepositoryAbstract } from '../../../../../core/abstracts/base/base-repository.abstract';
import { MovementTypesEntity } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MovementTypesRepository
  extends BaseRepositoryAbstract<MovementTypesEntity>
  implements IMovementTypesRepository
{
  constructor(
    @InjectRepository(MovementTypesEntity)
    private readonly movementTypesRepository: Repository<MovementTypesEntity>,
  ) {
    super(movementTypesRepository);
  }
}
