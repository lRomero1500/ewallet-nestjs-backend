import { NestFactory } from '@nestjs/core';
import { AuthMicroModule } from './auth-micro.module';

import { TCPConfigs } from './config/tcp.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthMicroModule, TCPConfigs);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen();
  console.log(`🚀 Microservice is listening `);
}
bootstrap();
