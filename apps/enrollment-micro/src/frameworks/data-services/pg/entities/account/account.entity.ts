import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';

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
