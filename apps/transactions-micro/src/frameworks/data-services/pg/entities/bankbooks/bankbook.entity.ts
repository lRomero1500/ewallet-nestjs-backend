import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MovementTypesEntity } from '../common/movement-types.entity';
import { TransactionEntity } from '../transactions/transaction.entity';
import { DecimalTransformer } from '../../transformers/decimal.transformer';
import Decimal from 'decimal.js';
import { UserEntity } from '../user';

@Entity({
  name: 'bank_books',
  schema: 'operations',
})
export class BankBookEntity {
  @Column({
    name: 'id',
    type: 'uuid',
    primary: true,
    default: () => 'gen_random_uuid()',
  })
  id: string;
  @Column({
    name: 'type_id',
    type: 'int',
  })
  typeId: number;
  @ManyToOne(() => MovementTypesEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'type_id', referencedColumnName: 'id' }])
  type: MovementTypesEntity;
  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  amount: Decimal;
  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId: string;
  @ManyToOne(() => UserEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UserEntity;
  @Column({
    name: 'transaction_id',
    type: 'bigint',
  })
  transactionId: number;
  @ManyToOne(() => TransactionEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'transaction_id', referencedColumnName: 'id' }])
  transaction: TransactionEntity;
  @Column({
    name: 'created_at',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
  @Column({
    name: 'updated_at',
    type: 'timestamp without time zone',
    nullable: true,
  })
  updated_at: Date | null;
}
