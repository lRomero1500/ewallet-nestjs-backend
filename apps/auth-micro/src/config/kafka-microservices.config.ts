import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { join } from 'node:path';

dotenv.config({
  path: join(
    process.cwd(),
    'environments',
    `.env.${process.env.SCOPE?.trim()}`,
  ),
});

export const KafkaMicroservices: MicroserviceOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [`${process.env.KAFKA_SERVICES}:9093`],
      clientId: 'Auth-Micro',
    },
  },
};
