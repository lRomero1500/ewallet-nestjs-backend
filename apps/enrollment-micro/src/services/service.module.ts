import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TCPConfigs } from '../config/tcp.config';
import { KafkaClientOptions } from '../config/kafkaClient.config';
import { AuthProxyService } from './auth/auth-proxy.service';
import { KafkaProxyService } from './kafka/kafka-proxy.service';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ClientsModule.register(TCPConfigs),
    ClientsModule.register(KafkaClientOptions),
  ],
  providers: [AuthProxyService, KafkaProxyService],
  exports: [AuthProxyService, KafkaProxyService],
})
export class ServiceModule {}
