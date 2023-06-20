import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'node:path';
import {
  BankBookEntity,
  MovementTypesEntity,
  StatusEntity,
  TransactionEntity,
  TransactionTypesEntity,
  UserEntity,
} from '../entities';
import {
  InitialMigration1687292601696,
  AddingMissingFieldBankbooksUserId1687295941762,
} from '../migrations';

dotenv.config({
  path: join(
    process.cwd(),
    'environments',
    `.env.${process.env.SCOPE?.trim()}`,
  ),
});
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME,
  schema: 'operations',
  entities: [
    TransactionTypesEntity,
    StatusEntity,
    MovementTypesEntity,
    UserEntity,
    TransactionEntity,
    BankBookEntity,
  ],
  migrations: [
    InitialMigration1687292601696,
    AddingMissingFieldBankbooksUserId1687295941762,
  ],
  synchronize: false,
  logging: process.env.DATABASE_LOGGING === 'true' ? true : false,
};

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
