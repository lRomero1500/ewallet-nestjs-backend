import { NestFactory } from '@nestjs/core';
import { TransactionsMicroModule } from './transactions-micro.module';

async function bootstrap() {
  const app = await NestFactory.create(TransactionsMicroModule);
  await app.listen(3000);
}
bootstrap();
