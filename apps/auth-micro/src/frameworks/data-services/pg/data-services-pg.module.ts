import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from 'apps/auth-micro/src/config/configuration.config';
import { Auth0ApiTokenEntity } from './entities/auth0/auth0_api_tokens.entity';
import { UserEntity } from './entities/user/user.entity';
import { TypeOrmConfigPgService } from './config/data-services-typeorm-pg-config.service';
import { Auth0Repository, UserRepository } from './repositories';
import { RoleRepository } from './repositories/role/role.repository';
import { PermissionEntity, RoleEntity } from './entities';

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
      Auth0ApiTokenEntity,
      UserEntity,
      RoleEntity,
      PermissionEntity,
    ]),
  ],
  providers: [Auth0Repository, UserRepository, RoleRepository],
  exports: [TypeOrmModule, Auth0Repository, UserRepository, RoleRepository],
})
export class DataServicesPgModule {}
