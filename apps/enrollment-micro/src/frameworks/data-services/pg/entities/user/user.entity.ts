import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { StatusEntity } from '../common/status.entity';
import { AccountEntity } from '../account/account.entity';
import { PersonEntity } from '../person';

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

  @OneToOne(() => StatusEntity, (status) => status.users, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'status_id', referencedColumnName: 'id' }])
  status: StatusEntity;
  @Column({
    name: 'person_id',
    type: 'uuid',
  })
  personId: string;
  @OneToOne(() => PersonEntity, (person) => person.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'person_id', referencedColumnName: 'id' }])
  person: PersonEntity;
  @Column({
    name: 'account_id',
    type: 'uuid',
  })
  accountId: string;
  @OneToOne(() => AccountEntity, (account) => account.user, {
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
