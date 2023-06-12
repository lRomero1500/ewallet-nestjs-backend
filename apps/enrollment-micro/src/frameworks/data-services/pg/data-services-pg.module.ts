import { Module } from '@nestjs/common';
import { TypeOrmConfigPgService } from './config/data-services-typeorm-pg-config.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AccountEntity,
  DocumentTypeEntity,
  GenderEntity,
  PersonEntity,
  StatusEntity,
  UserEntity,
} from './entities';
import {
  AccountRepository,
  DocumentTypeRepository,
  GenderRepository,
  PersonRepository,
  StatusRepository,
  UserRepository,
  EnrollmentRepository,
} from './repositories';
import { Configuration } from 'apps/enrollment-micro/src/config';

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
  providers: [
    DocumentTypeRepository,
    StatusRepository,
    GenderRepository,
    AccountRepository,
    UserRepository,
    PersonRepository,
    EnrollmentRepository,
  ],
  exports: [
    TypeOrmModule,
    DocumentTypeRepository,
    StatusRepository,
    GenderRepository,
    AccountRepository,
    UserRepository,
    PersonRepository,
    EnrollmentRepository,
  ],
})
export class DataServicesPgModule {}
