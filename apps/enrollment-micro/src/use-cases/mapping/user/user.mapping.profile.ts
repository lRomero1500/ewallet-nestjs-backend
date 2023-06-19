import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, getMapperToken } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { UserDTO } from 'apps/enrollment-micro/src/core';
import { UserEntity } from 'apps/enrollment-micro/src/frameworks';

@Injectable()
export class UserMappingProfile extends AutomapperProfile {
  constructor(@Inject(getMapperToken()) mapper: Mapper) {
    super(mapper);
  }
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, UserEntity, UserDTO);
      createMap(mapper, UserDTO, UserEntity);
    };
  }
}
