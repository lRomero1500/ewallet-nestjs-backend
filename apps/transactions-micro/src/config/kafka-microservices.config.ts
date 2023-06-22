import {
  ClientsModuleOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

export const KafkaMicroservices: MicroserviceOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9091'],
      clientId: 'Transactions-Micro',
    },
    consumer: {
      groupId: 'transaction-micro',
    },
  },
};

export const KafkaClientOptions: ClientsModuleOptions = [
  {
    name: 'KAFKA_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'Transaction-micro',
        brokers: ['localhost:9091'],
      },
      consumer: {
        groupId: 'enrollment-micro',
      },
    },
  },
];
