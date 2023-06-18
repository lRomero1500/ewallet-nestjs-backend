import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  DataServicesPgModule,
  EnrollmentRepository,
  PersonRepository,
} from '../../frameworks';
import { EnrollmentUseCases } from './enrollment.use-cases';

@Module({
  imports: [
    DataServicesPgModule,
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
  ],
  exports: [EnrollmentUseCases],
})
export class EnrollmentUseCasesTsModule {}
