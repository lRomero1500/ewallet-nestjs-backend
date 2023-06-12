import { Inject, Injectable } from '@nestjs/common';
import { IStatusRepository } from 'apps/enrollment-micro/src/core';
import { StatusEntity } from 'apps/enrollment-micro/src/frameworks';

@Injectable()
export class StatusUseCases {
  constructor(
    @Inject('IStatusRepository')
    private readonly statusRepository: IStatusRepository,
  ) {}
  async getStatuses(): Promise<StatusEntity[]> {
    return await this.statusRepository.getAll();
  }
}
