import {
  ClientsModuleOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
export const KafkaClientOptions: ClientsModuleOptions = [
  {
    name: 'KAFKA_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'Enrollment-micro',
        brokers: [`${process.env.KAFKA_SERVICES}:9093`],
      },
      consumer: {
        groupId: 'transaction-micro',
      },
    },
  },
];
export const KafkaMicroservices: MicroserviceOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [`${process.env.KAFKA_SERVICES}:9093`],
      clientId: 'Enrollment-Micro',
    },
    consumer: {
      groupId: 'enrollment-micro',
    },
  },
};
