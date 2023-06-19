import { Module } from '@nestjs/common';
import { Auth0Service } from './services/auth0/auth0.service';
import { SecurityUseCasesTsModule } from './use-cases/security/security.use-cases.ts.module';
import { DataServicesPgModule } from './frameworks/data-services/pg/data-services-pg.module';
import { SecurityController } from './controllers/security/security.controller';

@Module({
  imports: [DataServicesPgModule, SecurityUseCasesTsModule],
  controllers: [SecurityController],
  providers: [Auth0Service],
})
export class AuthMicroModule {}
