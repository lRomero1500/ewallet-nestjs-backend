import { Module } from '@nestjs/common';
import { DataServicesPgModule } from './frameworks/data-services/pg/data-services-pg.module';
import { StatusUseCasesModule } from './use-cases/common/status/status.use-cases.module';
import { MovementTypesUseCasesModule } from './use-cases/common/movement-types/movement-types.use-cases.module';
import { TransactionTypesUseCasesModule } from './use-cases/common/transaction-types/transaction-types.use-cases.module';
import { TransactionsUseCasesModule } from './use-cases/transactions/transactions.use-cases.module';
import { TransactionsController } from './controllers/transactions/transactions.controller';
import { ActivityController } from './controllers/activity/activity.controller';
import { ServiceModule } from './services/service.module';

@Module({
  imports: [
    DataServicesPgModule,
    StatusUseCasesModule,
    MovementTypesUseCasesModule,
    TransactionTypesUseCasesModule,
    TransactionsUseCasesModule,
    ServiceModule,
  ],
  controllers: [TransactionsController, ActivityController],
  providers: [],
})
export class TransactionsMicroModule {}
