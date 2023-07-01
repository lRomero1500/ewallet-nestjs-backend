import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccountDTO } from '../../core/dtos';

@Injectable()
export class KafkaProxyService {
  constructor(
    @Inject('KAFKA_SERVICE')
    private kafkaClientProxy: ClientProxy,
  ) {}
  balanceUpdate(accountFromDTO: AccountDTO): void {
    this.kafkaClientProxy.emit('topic.balance_update', {
      accountDTO: accountFromDTO,
    });
  }
}
