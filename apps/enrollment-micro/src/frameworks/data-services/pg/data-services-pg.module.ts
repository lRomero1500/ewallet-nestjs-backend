import { Module } from '@nestjs/common';
import { DataServicesPgService } from './data-services-pg.service';
import { ConfigModule } from '@nestjs/config';
import { Configuration } from 'src/config/configuration.config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
