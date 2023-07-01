import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TCPConfigs } from '../../config/tcp.config';
import {
  DataServicesPgModule,
  StatusRepository,
  TransactionRepository,
} from '../../frameworks/data-services/pg';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TransactionsBankbooksRepository } from '../../frameworks/data-services/pg/repositories/transactions-bankbooks/transactions-bankbooks.repository';
import { TransactionsMappingProfile } from '../mapping/transactions/transactions.mapping.profile';
import { TransactionsUseCases } from './transactions.use-cases';
import { StatusMappingProfile } from '../mapping/common/status.mapping.profile';
import { ActivityMappingProfile } from '../mapping/activity/activity.mapping.profile';
import { ServiceModule } from '../../services';

@Module({
  imports: [
    DataServicesPgModule,
    ServiceModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [
    TransactionsUseCases,
    {
      provide: 'ITransactionsBankBooksRepository',
      useClass: TransactionsBankbooksRepository,
    },
    {
      provide: 'IStatusRepository',
      useClass: StatusRepository,
    },
    {
      provide: 'ITransactionsRepository',
      useClass: TransactionRepository,
    },
    TransactionsMappingProfile,
    StatusMappingProfile,
    ActivityMappingProfile,
  ],
  exports: [TransactionsUseCases],
})
export class TransactionsUseCasesModule {}
