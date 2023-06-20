import { NestFactory } from '@nestjs/core';
import { AuthMicroModule } from './auth-micro.module';

import { TCPConfigs } from './config/tcp.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthMicroModule, TCPConfigs);
  await app.listen();
  console.log(`🚀 Microservice is listening `);
}
bootstrap();
