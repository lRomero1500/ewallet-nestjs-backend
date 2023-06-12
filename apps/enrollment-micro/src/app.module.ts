import { Module } from '@nestjs/common';
import { DataServicesPgModule } from './frameworks/data-services/pg/data-services-pg.module';
import { DocumentTypeUseCasesTsModule } from './use-cases/common/document-type/document-type.use-cases.ts.module';
import { GenderUseCasesTsModule } from './use-cases/common/gender/gender.use-cases.ts.module';
import { StatusUseCasesTsModule } from './use-cases/common/status/status.use-cases.ts.module';
import { CommonController } from './controllers';
import { EnrollmentUseCasesTsModule } from './use-cases/enrollment/enrollment.use-cases.ts.module';

@Module({
  imports: [
    DataServicesPgModule,
    DocumentTypeUseCasesTsModule,
    GenderUseCasesTsModule,
    StatusUseCasesTsModule,
    EnrollmentUseCasesTsModule,
  ],
  controllers: [CommonController],
  providers: [],
})
export class AppModule {}
