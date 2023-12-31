import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, getMapperToken } from '@automapper/nestjs';
import { Inject } from '@nestjs/common';
import { StatusDTO } from 'apps/enrollment-micro/src/core';
import { StatusEntity } from 'apps/enrollment-micro/src/frameworks';
export class StatusMappingProfile extends AutomapperProfile {
  constructor(@Inject(getMapperToken()) mapper: Mapper) {
    super(mapper);
  }
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, StatusEntity, StatusDTO);
    };
  }
}
