import { Module } from '@nestjs/common';
import { DocumentTypeUseCases } from './document-type.use-case';
import { DocumentTypeRepository } from '../../../frameworks/data-services/pg/repositories';
import { DataServicesPgModule } from '../../../frameworks';

@Module({
  imports: [DataServicesPgModule],
  providers: [
    DocumentTypeUseCases,
    {
      provide: 'IDocumentTypeRepository',
      useClass: DocumentTypeRepository,
    },
  ],
  exports: [DocumentTypeUseCases],
})
export class DocumentTypeUseCasesTsModule {}
