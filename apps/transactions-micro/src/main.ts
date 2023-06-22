import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KafkaMicroservices } from './config/kafka-microservices.config';
import { TransactionsMicroModule } from './transactions-micro.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(TransactionsMicroModule);
  app.connectMicroservice<MicroserviceOptions>(KafkaMicroservices);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.startAllMicroservices();
  await app.listen(3002);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
