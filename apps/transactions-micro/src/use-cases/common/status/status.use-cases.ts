import { Mapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { StatusDTO } from 'apps/transactions-micro/src/core';
import { IStatusRepository } from 'apps/transactions-micro/src/core/interfaces';
import { StatusEntity } from 'apps/transactions-micro/src/frameworks/data-services/pg';
@Injectable()
export class StatusUseCases {
  constructor(
    @Inject(getMapperToken()) private readonly mapper: Mapper,
    @Inject('IStatusRepository')
    private readonly statusRepository: IStatusRepository,
  ) {}
  async getStatuses(): Promise<StatusDTO[]> {
    return await this.mapper.mapArrayAsync(
      await this.statusRepository.getAll(),
      StatusEntity,
      StatusDTO,
    );
  }
}
