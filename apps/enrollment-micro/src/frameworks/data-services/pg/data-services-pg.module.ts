import { Module } from '@nestjs/common';
import { DataServicesPgService } from './data-services-pg.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '../../../config/configuration.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DataServicesPgService,
    }),
    TypeOrmModule.forFeature([]),
  ],
  providers: [DataServicesPgService],
  exports: [TypeOrmModule],
})
export class DataServicesPgModule {}
