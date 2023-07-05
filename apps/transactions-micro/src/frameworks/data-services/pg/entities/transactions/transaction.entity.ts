import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusEntity } from '../common/status.entity';
import { UserEntity } from '../user/user.entity';
import { TransactionTypesEntity } from '../common/transaction-types.entity';
import { AutoMap } from '@automapper/classes';
import { BankBookEntity } from '../bankbooks';

@Entity({
  name: 'transaction',
  schema: 'operations',
})
export class TransactionEntity {
  @AutoMap()
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;
  @AutoMap()
  @Column({
    name: 'status_id',
    type: 'int',
  })
  statusId: number;
  @ManyToOne(() => StatusEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'status_id', referencedColumnName: 'id' }])
  status: StatusEntity;
  @AutoMap()
  @Column({
    name: 'type_id',
    type: 'int',
  })
  typeId: number;
  @ManyToOne(() => TransactionTypesEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'type_id', referencedColumnName: 'id' }])
  type: TransactionTypesEntity;
  @AutoMap()
  @Column({
    name: 'user_from_id',
    type: 'uuid',
    nullable: true,
  })
  userFromId: string;
  @ManyToOne(() => UserEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_from_id', referencedColumnName: 'id' }])
  userFrom: UserEntity;
  @AutoMap()
  @Column({
    name: 'user_to_id',
    type: 'uuid',
  })
  userToId: string;
  @ManyToOne(() => UserEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_to_id', referencedColumnName: 'id' }])
  userTo: UserEntity;
  @OneToMany(() => BankBookEntity, (bankbooks) => bankbooks.transaction)
  bankbooks: BankBookEntity[];
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
