import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TCPConfigs } from '../../config/tcp.config';
import { DataServicesPgModule } from '../../frameworks/data-services/pg';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TransactionsBankbooksRepository } from '../../frameworks/data-services/pg/repositories/transactions-bankbooks/transactions-bankbooks.repository';
import { TransactionsMappingProfile } from '../mapping/transactions/transactions.mapping.profile';
import { TransactionsUseCases } from './transactions.use-cases';
import { StatusMappingProfile } from '../mapping/common/status.mapping.profile';
import { KafkaClientOptions } from '../../config/kafka-microservices.config';

@Module({
  imports: [
    DataServicesPgModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    //ClientsModule.register(TCPConfigs),
    ClientsModule.register(KafkaClientOptions),
  ],
  providers: [
    TransactionsUseCases,
    {
      provide: 'ITransactionsBankBooksRepository',
      useClass: TransactionsBankbooksRepository,
    },
    TransactionsMappingProfile,
    StatusMappingProfile,
  ],
  exports: [TransactionsUseCases],
})
export class TransactionsUseCasesModule {}
