import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TCPConfigs } from '../../config/tcp.config';

@Module({
  imports: [ClientsModule.register(TCPConfigs)],
})
export class TransactionsUseCasesModule {}
