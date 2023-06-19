import { NestFactory } from '@nestjs/core';
import { AuthMicroModule } from './auth-micro.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KafkaMicroservices } from './config/kafka-microservices.config';
import { TCPConfigs } from './config/tcp.config';

// async function bootstrap() {
//   const app = await NestFactory.create(AuthMicroModule);
//   await app.listen(3001);
//   console.log(`🚀 Application is running on: ${await app.getUrl()}`);
// }
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthMicroModule, TCPConfigs);
  await app.listen();
  console.log(`🚀 Microservice is listening `);
}
bootstrap();
