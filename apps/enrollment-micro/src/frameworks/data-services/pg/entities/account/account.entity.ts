import { Column, Entity, OneToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { DecimalTransformer } from '../../transformers/decimal.transformer';
import Decimal from 'decimal.js';

@Entity({
  name: 'account',
  schema: 'enrollment',
})
export class AccountEntity {
  @Column({
    name: 'id',
    type: 'uuid',
    primary: true,
  })
  id: string;
  @Column({
    name: 'balance',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  balance: Decimal;
  @OneToOne(() => UserEntity, (user) => user.account, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  user: UserEntity;
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
