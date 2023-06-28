import { Module } from '@nestjs/common';
import { DataServicesPgModule } from '../../frameworks/data-services/pg';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ClientsModule } from '@nestjs/microservices';
import { TCPEnrollmentConfigs } from '../../config/tcp.config';
import { Auth0Service } from '../../services/auth0/auth0.service';
import { UserRepository } from '../../frameworks/data-services/pg/repositories';
import { AuthUseCases } from './auth.use-cases';
import { PermissionMappingProfile } from '../mapping/permission';
import { RoleMappingProfile } from '../mapping/role/role.mapping.profile';

@Module({
  imports: [
    DataServicesPgModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ClientsModule.register(TCPEnrollmentConfigs),
  ],
  providers: [
    AuthUseCases,
    {
      provide: 'IAuth0Service',
      useClass: Auth0Service,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    PermissionMappingProfile,
    RoleMappingProfile,
  ],
  exports: [AuthUseCases],
})
export class AuthUseCasesTsModule {}
