import { getMapperToken } from '@automapper/nestjs';
import { DocumentTypeDTO } from '../../../core/dtos/common/document-type.dto';
import { IDocumentTypeRepository } from '../../../core/interfaces/repositories/common/document-type-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { DocumentTypeEntity } from 'apps/enrollment-micro/src/frameworks';

@Injectable()
export class DocumentTypeUseCases {
  constructor(
    @Inject(getMapperToken()) private readonly mapper: Mapper,
    @Inject('IDocumentTypeRepository')
    private readonly documentTypeRepository: IDocumentTypeRepository,
  ) {}

  async getDocumentTypes(): Promise<DocumentTypeDTO[]> {
    return await this.mapper.mapArrayAsync(
      await this.documentTypeRepository.getAll(),
      DocumentTypeEntity,
      DocumentTypeDTO,
    );
  }
}
