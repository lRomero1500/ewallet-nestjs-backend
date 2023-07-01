import { Module } from '@nestjs/common';
import { Auth0Service } from './services/auth0/auth0.service';
import { SecurityUseCasesTsModule } from './use-cases/security/security.use-cases.ts.module';
import { DataServicesPgModule } from './frameworks/data-services/pg/data-services-pg.module';
import { SecurityController } from './controllers/security/security.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthUseCasesTsModule } from './use-cases/auth/auth.use-cases.ts.module';

@Module({
  imports: [
    DataServicesPgModule,
    SecurityUseCasesTsModule,
    AuthUseCasesTsModule,
  ],
  controllers: [SecurityController, AuthController],
  providers: [Auth0Service],
})
export class AuthMicroModule {}
