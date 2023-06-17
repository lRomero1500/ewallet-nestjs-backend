import { Module } from '@nestjs/common';
import { SecurityService } from './services/security/security.service';
import { SecurityUseCasesTsModule } from './use-cases/security/security.use-cases.ts.module';
import { DataServicesPgModule } from './frameworks/data-services/pg/data-services-pg.module';

@Module({
  imports: [
    DataServicesPgModule,
    SecurityUseCasesTsModule,
    DataServicesPgModule,
  ],
  controllers: [],
  providers: [SecurityService],
})
export class AuthMicroModule {}
