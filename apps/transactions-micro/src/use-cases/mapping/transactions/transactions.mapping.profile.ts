import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, getMapperToken } from '@automapper/nestjs';
import { Inject } from '@nestjs/common';
import { TransactionsDTO } from 'apps/transactions-micro/src/core';
import { TransactionEntity } from 'apps/transactions-micro/src/frameworks/data-services/pg';

export class TransactionsMappingProfile extends AutomapperProfile {
  constructor(@Inject(getMapperToken()) mapper: Mapper) {
    super(mapper);
  }
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, TransactionEntity, TransactionsDTO);
      createMap(mapper, TransactionsDTO, TransactionEntity);
    };
  }
}
