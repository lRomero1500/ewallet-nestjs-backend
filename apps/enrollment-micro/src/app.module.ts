import { Module } from '@nestjs/common';
import { DataServicesPgModule } from './frameworks/data-services/pg/data-services-pg.module';
import { DocumentTypeUseCasesTsModule } from './use-cases/common/document-type/document-type.use-cases.ts.module';
import { GenderUseCasesTsModule } from './use-cases/common/gender/gender.use-cases.ts.module';
import { StatusUseCasesTsModule } from './use-cases/common/status/status.use-cases.ts.module';
import { CommonController } from './controllers';
import { EnrollmentUseCasesTsModule } from './use-cases/enrollment/enrollment.use-cases.ts.module';
import { EnrollmentController } from './controllers/enrollment/enrollment.controller';
import { BalanceController } from './controllers/balance/balance.controller';
import { AccountUseCasesModule } from './use-cases/account/account.use-cases.module';

@Module({
  imports: [
    DataServicesPgModule,
    DocumentTypeUseCasesTsModule,
    GenderUseCasesTsModule,
    StatusUseCasesTsModule,
    EnrollmentUseCasesTsModule,
    AccountUseCasesModule,
  ],
  controllers: [CommonController, EnrollmentController, BalanceController],
  providers: [],
})
export class AppModule {}
