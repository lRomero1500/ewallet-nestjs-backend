import {
  ClientsModuleOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

export const TCPConfigs: ClientsModuleOptions = [
  {
    name: 'AUTH_SERVICE',
    transport: Transport.TCP,
    options: {
      host: `${process.env.AUTH_MICRO}`,
      port: 3001,
    },
  },
];

export const TCPLocalConfigs: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: `${process.env.ENROLLMENT_MICRO}`,
    port: 3000,
  },
};
