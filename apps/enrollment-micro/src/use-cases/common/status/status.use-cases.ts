import { Mapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { IStatusRepository, StatusDTO } from 'apps/enrollment-micro/src/core';
import { StatusEntity } from 'apps/enrollment-micro/src/frameworks';

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
