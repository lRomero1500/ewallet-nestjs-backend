import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsMicroService {
  getHello(): string {
    return 'Hello World!';
  }
}
