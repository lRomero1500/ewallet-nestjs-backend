import { Module } from '@nestjs/common';
import { DocumentTypeUseCases } from './document-type.use-case';
import { DocumentTypeRepository } from '../../../frameworks/data-services/pg/repositories';
import { DataServicesPgModule } from '../../../frameworks';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { DocumentTypeMappingProfile } from '../../mapping/common/document-types.mapping.profile';

@Module({
  imports: [
    DataServicesPgModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [
    DocumentTypeUseCases,
    {
      provide: 'IDocumentTypeRepository',
      useClass: DocumentTypeRepository,
    },
    DocumentTypeMappingProfile,
  ],
  exports: [DocumentTypeUseCases],
})
export class DocumentTypeUseCasesTsModule {}
