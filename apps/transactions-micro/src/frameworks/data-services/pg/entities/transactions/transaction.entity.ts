import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusEntity } from '../common/status.entity';
import { UserEntity } from '../user/user.entity';
import { TransactionTypesEntity } from '../common/transaction-types.entity';

@Entity({
  name: 'transaction',
  schema: 'operations',
})
export class TransactionEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;
  @Column({
    name: 'status_id',
    type: 'int',
  })
  statusId: number;
  @OneToOne(() => StatusEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'status_id', referencedColumnName: 'id' }])
  status: StatusEntity;
  @Column({
    name: 'type_id',
    type: 'int',
  })
  typeId: number;
  @OneToOne(() => TransactionTypesEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'type_id', referencedColumnName: 'id' }])
  type: TransactionTypesEntity;
  @Column({
    name: 'user_from_id',
    type: 'uuid',
  })
  userFromId: string;
  @OneToOne(() => UserEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_from_id', referencedColumnName: 'id' }])
  userFrom: UserEntity;
  @Column({
    name: 'user_to_id',
    type: 'uuid',
  })
  userToId: string;
  @OneToOne(() => UserEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_to_id', referencedColumnName: 'id' }])
  userTo: UserEntity;
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
