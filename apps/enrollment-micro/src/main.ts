import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3000,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.startAllMicroservices();
  await app.listen(3000);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
