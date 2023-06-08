import { Controller, Get } from '@nestjs/common';
import { TransactionsMicroService } from './transactions-micro.service';

@Controller()
export class TransactionsMicroController {
  constructor(private readonly transactionsMicroService: TransactionsMicroService) {}

  @Get()
  getHello(): string {
    return this.transactionsMicroService.getHello();
  }
}
