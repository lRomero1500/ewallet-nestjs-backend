import { Module } from '@nestjs/common';
import { TypeOrmConfigPgService } from './config/data-services-typeorm-pg-config.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BankBookEntity,
  StatusEntity,
  TransactionEntity,
  UserEntity,
  MovementTypesEntity,
} from './entities';

import { Configuration } from 'apps/enrollment-micro/src/config';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { StatusRepository } from './repositories';

@Module({
  imports: [
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    ConfigModule.forRoot({
      load: [Configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigPgService,
    }),
    TypeOrmModule.forFeature([
      StatusEntity,
      UserEntity,
      TransactionEntity,
      BankBookEntity,
      MovementTypesEntity,
    ]),
  ],
  providers: [StatusRepository],
  exports: [TypeOrmModule, StatusRepository],
})
export class DataServicesPgModule {}
