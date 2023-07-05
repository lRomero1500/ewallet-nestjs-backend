import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, getMapperToken } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { PermissionDTO } from 'apps/auth-micro/src/core/dtos/permission/permission.dto';
import { PermissionEntity } from 'apps/auth-micro/src/frameworks/data-services/pg';

@Injectable()
export class PermissionMappingProfile extends AutomapperProfile {
  constructor(@Inject(getMapperToken()) mapper: Mapper) {
    super(mapper);
  }
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        PermissionEntity,
        PermissionDTO,
        forMember(
          (per) => per.permission,
          mapFrom((ent) => ent.permission),
        ),
      );
    };
  }
}
