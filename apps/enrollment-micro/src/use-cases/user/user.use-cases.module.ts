import { Module } from '@nestjs/common';
import { DataServicesPgModule, UserRepository } from '../../frameworks';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UserUseCases } from './user.use-cases';

@Module({
  imports: [
    DataServicesPgModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [
    UserUseCases,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [UserUseCases],
})
export class UserUseCasesModule {}
