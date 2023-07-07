import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const TCPConfigs: ClientsModuleOptions = [
  {
    name: 'ENROLLMENT_SERVICE',
    transport: Transport.TCP,
    options: {
      host: `${process.env.ENROLLMENT_MICRO}`,
      port: 3003,
    },
  },
];

export const TCPAuthConfigs: ClientsModuleOptions = [
  {
    name: 'AUTH_SERVICE',
    transport: Transport.TCP,
    options: {
      host: `${process.env.AUTH_MICRO}`,
      port: 3004,
    },
  },
];
