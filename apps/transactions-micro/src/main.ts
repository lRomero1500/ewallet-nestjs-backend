import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KafkaMicroservices } from './config/kafka-microservices.config';
import { TransactionsMicroModule } from './transactions-micro.module';

async function bootstrap() {
  const app = await NestFactory.create(TransactionsMicroModule);
  app.connectMicroservice<MicroserviceOptions>(KafkaMicroservices);
  await app.startAllMicroservices();
  await app.listen(3002);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
