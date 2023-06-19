import { Entity } from 'typeorm';

@Entity({
  name: 'user',
  schema: 'operations',
})
export class TransactionEntity {}
