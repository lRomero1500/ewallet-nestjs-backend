import { Module } from '@nestjs/common';
import {
  AccountRepository,
  DataServicesPgModule,
  UserRepository,
} from '../../frameworks/data-services/pg';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AccountUseCases } from './account.use-cases';

@Module({
  imports: [
    DataServicesPgModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [
    AccountUseCases,
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [AccountUseCases],
})
export class AccountUseCasesModule {}
