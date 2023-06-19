import {
  Mapper,
  MappingConfiguration,
  MappingProfile,
  createMap,
  extend,
} from '@automapper/core';
import { AutomapperProfile, getMapperToken } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { DocumentTypeDTO as DocumentTypeDTO } from '../../../core/dtos/common/document-type.dto';
import { DocumentTypeEntity } from 'apps/enrollment-micro/src/frameworks';

@Injectable()
export class DocumentTypeMappingProfile extends AutomapperProfile {
  constructor(@Inject(getMapperToken()) mapper: Mapper) {
    super(mapper);
  }
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, DocumentTypeEntity, DocumentTypeDTO);
    };
  }
}
