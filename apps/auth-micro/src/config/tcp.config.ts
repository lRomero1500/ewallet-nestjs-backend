import {
  ClientsModuleOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { join } from 'node:path';

dotenv.config({
  path: join(
    process.cwd(),
    'environments',
    `.env.${process.env.SCOPE?.trim()}`,
  ),
});

export const TCPConfigs: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: `${process.env.AUTH_MICRO}`,
    port: 3001,
  },
};

export const TCPEnrollmentConfigs: ClientsModuleOptions = [
  {
    name: 'ENROLLMENT_SERVICE',
    transport: Transport.TCP,
    options: {
      host: `${process.env.ENROLLMENT_MICRO}`,
      port: 3000,
    },
  },
];
