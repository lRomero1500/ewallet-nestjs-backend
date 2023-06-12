import { Module } from '@nestjs/common';
import {
  DataServicesPgModule,
  StatusRepository,
} from 'apps/enrollment-micro/src/frameworks';
import { StatusUseCases } from './status.use-cases';

@Module({
  imports: [DataServicesPgModule],
  providers: [
    StatusUseCases,
    {
      provide: 'IStatusRepository',
      useClass: StatusRepository,
    },
  ],
  exports: [StatusUseCases],
})
export class StatusUseCasesTsModule {}
