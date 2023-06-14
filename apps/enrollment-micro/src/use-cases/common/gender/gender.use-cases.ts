import { Mapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Inject } from '@nestjs/common';
import { GenderDTO, IGenderRepository } from 'apps/enrollment-micro/src/core';
import { GenderEntity } from 'apps/enrollment-micro/src/frameworks';

export class GenderUseCases {
  constructor(
    @Inject(getMapperToken()) private readonly mapper: Mapper,
    @Inject('IGenderRepository')
    private readonly genderRepository: IGenderRepository,
  ) {}

  async getGenders(): Promise<GenderDTO[]> {
    return await this.mapper.mapArrayAsync(
      await this.genderRepository.getAll(),
      GenderEntity,
      GenderDTO,
    );
  }
}
