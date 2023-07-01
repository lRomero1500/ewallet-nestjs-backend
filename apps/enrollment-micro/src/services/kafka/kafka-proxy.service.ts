import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TransactionsDTO } from '../../core/dtos';

@Injectable()
export class KafkaProxyService {
  constructor(
    @Inject('KAFKA_SERVICE')
    private kafkaClientProxy: ClientProxy,
  ) {}
  welcomingBonus(transactionDTO: TransactionsDTO): void {
    this.kafkaClientProxy.emit('topic.welcoming_bonus', {
      transactionDTO,
    });
  }
}
