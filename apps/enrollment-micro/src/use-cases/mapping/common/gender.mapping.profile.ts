import { Inject, Injectable } from '@nestjs/common';
import { AutomapperProfile, getMapperToken } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';
import { GenderEntity } from 'apps/enrollment-micro/src/frameworks';
import { GenderDTO } from 'apps/enrollment-micro/src/core/dtos/common';

@Injectable()
export class GenderMappingProfile extends AutomapperProfile {
  constructor(@Inject(getMapperToken()) mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, GenderEntity, GenderDTO);
    };
  }
}
