import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configuration } from '../../config/configuration.config';
import { Auth0Service } from '../../services/auth0/auth0.service';
import { SecurityUseCases } from './security.use-cases';
import {
  Auth0Repository,
  RoleRepository,
  UserRepository,
} from '../../frameworks/data-services/pg/repositories';
import * as moment from 'moment';
import { DataServicesPgModule } from '../../frameworks/data-services/pg/data-services-pg.module';

@Module({
  imports: [
    DataServicesPgModule,
    ConfigModule.forRoot({
      load: [Configuration],
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: 'IAuth0Service',
      useClass: Auth0Service,
    },
    SecurityUseCases,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IAuth0Repository',
      useClass: Auth0Repository,
    },
    {
      provide: 'IRoleRepository',
      useClass: RoleRepository,
    },
    {
      provide: 'IMoment',
      useValue: moment,
    },
  ],
  exports: [SecurityUseCases],
})
export class SecurityUseCasesTsModule {}
