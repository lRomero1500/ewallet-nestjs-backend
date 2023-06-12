import { Module } from '@nestjs/common';
import { TypeOrmConfigPgService } from './config/data-services-typeorm-pg-config.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '../../../config/configuration.config';
import {
  AccountEntity,
  DocumentTypeEntity,
  GenderEntity,
  PersonEntity,
  StatusEntity,
  UserEntity,
} from './entities';
import { DocumentTypeRepository } from './repositories';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigPgService,
    }),
    TypeOrmModule.forFeature([
      GenderEntity,
      DocumentTypeEntity,
      StatusEntity,
      PersonEntity,
      AccountEntity,
      UserEntity,
    ]),
  ],
  providers: [DocumentTypeRepository],
  exports: [TypeOrmModule, DocumentTypeRepository],
})
export class DataServicesPgModule {}
