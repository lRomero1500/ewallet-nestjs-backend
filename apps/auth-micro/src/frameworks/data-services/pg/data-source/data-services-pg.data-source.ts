import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'node:path';
import { Auth0ApiTokenEntity } from '../entities/auth0/auth0_api_tokens.entity';
import { PermissionEntity, RoleEntity, UserEntity } from '../entities';
import {
  InitialMigration1686944966502,
  UserRolesPermissions1686962728011,
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
  schema: 'auth',
  entities: [Auth0ApiTokenEntity, UserEntity, RoleEntity, PermissionEntity],
  migrations: [
    InitialMigration1686944966502,
    UserRolesPermissions1686962728011,
  ],
  synchronize: false,
  logging: process.env.DATABASE_LOGGING === 'true' ? true : false,
};

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
