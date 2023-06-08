import { Module } from '@nestjs/common';
import { DataServicesPgModule } from './frameworks/data-services/pg/data-services-pg.module';

@Module({
  imports: [DataServicesPgModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
