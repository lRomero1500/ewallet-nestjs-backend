import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, getMapperToken } from '@automapper/nestjs';
import { Inject } from '@nestjs/common';
import {
  ActivityDTO,
  DetailedActivityDTO,
} from 'apps/transactions-micro/src/core';
import { TransactionEntity } from 'apps/transactions-micro/src/frameworks/data-services/pg';

export class ActivityMappingProfile extends AutomapperProfile {
  constructor(@Inject(getMapperToken()) mapper: Mapper) {
    super(mapper);
  }
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        TransactionEntity,
        ActivityDTO,
        forMember(
          (act) => act.transactionType,
          mapFrom((tr) => tr.type?.type),
        ),
        forMember(
          (act) => act.movementType,
          mapFrom((tr) => tr.bankbooks[0]?.type?.type),
        ),
        forMember(
          (act) => act.isInCome,
          mapFrom((tr) => tr.bankbooks[0]?.typeId == 2),
        ),
        forMember(
          (act) => act.status,
          mapFrom((tr) => tr.status?.status),
        ),
        forMember(
          (act) => act.amount,
          mapFrom((tr) => tr.bankbooks[0]?.amount),
        ),
        forMember(
          (act) => act.transactionId,
          mapFrom((tr) => tr.id),
        ),
      );
      createMap(
        mapper,
        TransactionEntity,
        DetailedActivityDTO,
        forMember(
          (act) => act.transactionType,
          mapFrom((tr) => tr.type?.type),
        ),
        forMember(
          (act) => act.isInCome,
          mapFrom((tr) => tr.bankbooks[0]?.typeId == 2),
        ),
        forMember(
          (act) => act.status,
          mapFrom((tr) => tr.status?.status),
        ),
        forMember(
          (act) => act.amount,
          mapFrom((tr) => tr.bankbooks[0]?.amount),
        ),
        forMember(
          (act) => act.transactionId,
          mapFrom((tr) => tr.id),
        ),
        forMember(
          (act) => act.date,
          mapFrom((tr) => tr.created_at),
        ),
      );
    };
  }
}
