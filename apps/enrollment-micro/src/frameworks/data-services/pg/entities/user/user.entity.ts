import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { StatusEntity } from '../common/status.entity';
import { AccountEntity } from '../account/account.entity';

@Entity({
  name: 'user',
  schema: 'enrollment',
})
export class UserEntity {
  @Column({
    name: 'id',
    type: 'uuid',
    primary: true,
  })
  id: string;
  @Column({
    name: 'user_name',
    type: 'varchar',
    length: '50',
    unique: true,
  })
  userName: string;
  @Column({
    name: 'password',
    type: 'varchar',
    length: '200',
  })
  password: string;
  @OneToOne(() => StatusEntity, (status) => status.users, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'status_id', referencedColumnName: 'id' }])
  status: StatusEntity;
  @OneToOne(() => AccountEntity, (account) => account.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  account: AccountEntity;
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
