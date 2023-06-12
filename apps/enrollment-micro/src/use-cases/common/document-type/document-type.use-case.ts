import { DocumentTypeEntity } from '../../../core/entities/common/document-type.entity';
import { IDocumentTypeRepository } from '../../../core/interfaces/repositories/common/document-type-repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DocumentTypeUseCases {
  constructor(
    @Inject('IDocumentTypeRepository')
    private readonly documentTypeRepository: IDocumentTypeRepository,
  ) {}

  async getDocumentTypes(): Promise<DocumentTypeEntity[]> {
    return await this.documentTypeRepository.getAll();
  }
}
