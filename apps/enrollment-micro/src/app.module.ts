import { Module } from '@nestjs/common';
import { DataServicesPgModule } from './frameworks/data-services/pg/data-services-pg.module';
import { DocumentTypesController } from './controllers/document-types/document-types.controller';
import { DocumentTypeUseCasesTsModule } from './use-cases/document-type/document-type.use-cases.ts.module';

@Module({
  imports: [DataServicesPgModule, DocumentTypeUseCasesTsModule],
  controllers: [DocumentTypesController],
  providers: [],
})
export class AppModule {}
