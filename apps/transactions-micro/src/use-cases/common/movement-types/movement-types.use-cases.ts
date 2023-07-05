import { Mapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Inject } from '@nestjs/common';

export class MovementTypesUseCases {
  constructor(@Inject(getMapperToken()) private readonly mapper: Mapper) {}
}
