import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'node:path';
import {
  AccountEntity,
  DocumentTypeEntity,
  GenderEntity,
  PersonEntity,
  StatusEntity,
  UserEntity,
} from '../entities';
import {
  EnrollmentInitial1686519654565,
  AddingPersonidColumnToUserTable1686702514923,
} from '../migrations';
import { AddingMissingUniqueIndexToPersonTable1687056807640 } from '../migrations/1687056807640-adding_missing_unique_index_to_person_table';

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
  schema: 'enrollment',
  entities: [
    DocumentTypeEntity,
    GenderEntity,
    StatusEntity,
    UserEntity,
    PersonEntity,
    AccountEntity,
  ],
  migrations: [
    EnrollmentInitial1686519654565,
    AddingPersonidColumnToUserTable1686702514923,
    AddingMissingUniqueIndexToPersonTable1687056807640,
  ],
  synchronize: false,
  logging: process.env.DATABASE_LOGGING === 'true' ? true : false,
};

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
