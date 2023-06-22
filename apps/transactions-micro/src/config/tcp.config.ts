import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const TCPConfigs: ClientsModuleOptions = [
  {
    name: 'ENROLLMENT_SERVICE',
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3000,
    },
  },
];
