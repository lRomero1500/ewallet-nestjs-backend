import {
  ClientsModuleOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

export const TCPConfigs: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 3001,
  },
};

export const TCPEnrollmentConfigs: ClientsModuleOptions = [
  {
    name: 'ENROLLMENT_SERVICE',
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3000,
    },
  },
];
