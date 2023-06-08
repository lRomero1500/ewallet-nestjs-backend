import { Module } from '@nestjs/common';
import { TransactionsMicroController } from './transactions-micro.controller';
import { TransactionsMicroService } from './transactions-micro.service';

@Module({
  imports: [],
  controllers: [TransactionsMicroController],
  providers: [TransactionsMicroService],
})
export class TransactionsMicroModule {}
