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
import { FixedInitialMigration1687486781154 } from '../migrations';

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
  migrations: [FixedInitialMigration1687486781154],
  synchronize: false,
  logging: process.env.DATABASE_LOGGING === 'true' ? true : false,
};

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
