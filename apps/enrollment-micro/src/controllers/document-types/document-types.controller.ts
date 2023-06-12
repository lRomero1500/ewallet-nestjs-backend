import { Controller, Get } from '@nestjs/common';
import { DocumentTypeUseCases } from '../../use-cases/document-type/document-type.use-case';
import { Observable, from } from 'rxjs';
import { DocumentTypeEntity } from '../../core/entities/common/document-type.entity';

@Controller({
  version: '1',
  path: 'document-types',
})
export class DocumentTypesController {
  constructor(private readonly documentTypeUseCases: DocumentTypeUseCases) {}

  @Get()
  async getAll(): Promise<Observable<DocumentTypeEntity>> {
    return from(await this.documentTypeUseCases.getDocumentTypes());
  }
}
