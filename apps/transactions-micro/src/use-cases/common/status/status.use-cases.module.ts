import { Module } from '@nestjs/common';
import {
  DataServicesPgModule,
  StatusRepository,
} from 'apps/transactions-micro/src/frameworks/data-services/pg';
import { StatusUseCases } from './status.use-cases';
import { StatusMappingProfile } from '../../mapping/common/status.mapping.profile';

@Module({
  imports: [DataServicesPgModule],
  providers: [
    StatusUseCases,
    {
      provide: 'IStatusRepository',
      useClass: StatusRepository,
    },
    StatusMappingProfile,
  ],
  exports: [StatusUseCases],
})
export class StatusUseCasesModule {}
