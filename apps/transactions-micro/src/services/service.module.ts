import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TCPAuthConfigs, TCPConfigs } from '../config/tcp.config';
import { AuthProxyService } from './auth';
import { EnrollmentProxyService } from './enrollment/enrollment-proxy.service';
import { KafkaProxyService } from './kafka/kafka-proxy.service';
import { KafkaClientOptions } from '../config/kafka-microservices.config';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ClientsModule.register(TCPAuthConfigs),
    ClientsModule.register(TCPConfigs),
    ClientsModule.register(KafkaClientOptions),
  ],
  providers: [AuthProxyService, EnrollmentProxyService, KafkaProxyService],
  exports: [AuthProxyService, EnrollmentProxyService, KafkaProxyService],
})
export class ServiceModule {}
