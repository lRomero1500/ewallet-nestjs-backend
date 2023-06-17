import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configuration } from '../../config/configuration.config';
import { SecurityService } from '../../services/security/security.service';
import { SecurityUseCases } from './security.use-cases';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: 'ISecurityService',
      useClass: SecurityService,
    },
    SecurityUseCases,
  ],
  exports: [SecurityUseCases],
})
export class SecurityUseCasesTsModule {}
