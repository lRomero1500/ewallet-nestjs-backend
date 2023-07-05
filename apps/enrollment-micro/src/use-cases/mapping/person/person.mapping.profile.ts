import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, getMapperToken } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { PersonDTO } from 'apps/enrollment-micro/src/core';
import { PersonEntity } from 'apps/enrollment-micro/src/frameworks';

@Injectable()
export class PersonMappingProfile extends AutomapperProfile {
  constructor(@Inject(getMapperToken()) mapper: Mapper) {
    super(mapper);
  }
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, PersonEntity, PersonDTO);
      createMap(mapper, PersonDTO, PersonEntity);
    };
  }
}
