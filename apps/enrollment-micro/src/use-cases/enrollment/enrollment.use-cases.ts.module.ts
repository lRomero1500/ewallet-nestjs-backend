import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  DataServicesPgModule,
  EnrollmentRepository,
  PersonRepository,
} from '../../frameworks';
import { EnrollmentUseCases } from './enrollment.use-cases';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UserMappingProfile } from '../mapping/user/user.mapping.profile';
import { PersonMappingProfile } from '../mapping/person/person.mapping.profile';

@Module({
  imports: [
    DataServicesPgModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001,
        },
      },
    ]),
  ],
  providers: [
    EnrollmentUseCases,
    {
      provide: 'IPersonRepository',
      useClass: PersonRepository,
    },
    {
      provide: 'IEnrollmentRepository',
      useClass: EnrollmentRepository,
    },
    UserMappingProfile,
    PersonMappingProfile,
  ],
  exports: [EnrollmentUseCases],
})
export class EnrollmentUseCasesTsModule {}
