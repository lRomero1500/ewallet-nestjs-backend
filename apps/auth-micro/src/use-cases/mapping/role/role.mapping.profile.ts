import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, getMapperToken } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { RoleDTO } from 'apps/auth-micro/src/core/dtos/role/role.dto';
import { RoleEntity } from 'apps/auth-micro/src/frameworks/data-services/pg';

@Injectable()
export class RoleMappingProfile extends AutomapperProfile {
  constructor(@Inject(getMapperToken()) mapper: Mapper) {
    super(mapper);
  }
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        RoleEntity,
        RoleDTO,
        forMember(
          (rol) => rol.role,
          mapFrom((ent) => ent.role),
        ),
        forMember(
          (rol) => rol.permissions,
          mapFrom((ent) => ent.permissions),
        ),
      );
    };
  }
}
