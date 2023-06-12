import { Inject } from '@nestjs/common';
import { IGenderRepository } from 'apps/enrollment-micro/src/core';
import { GenderEntity } from 'apps/enrollment-micro/src/frameworks';

export class GenderUseCases {
  constructor(
    @Inject('IGenderRepository')
    private readonly genderRepository: IGenderRepository,
  ) {}

  async getGenders(): Promise<GenderEntity[]> {
    return await this.genderRepository.getAll();
  }
}
