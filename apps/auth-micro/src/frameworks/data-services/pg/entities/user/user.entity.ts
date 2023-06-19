import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { RoleEntity } from '../role/role.entity';

@Entity({
  name: 'user',
  schema: 'auth',
})
export class UserEntity {
  @Column({
    name: 'id',
    type: 'uuid',
    primary: true,
  })
  id: string;
  @Column({
    name: 'status_id',
    type: 'int',
  })
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
  @ManyToMany(() => RoleEntity, (role) => role.users, {
    cascade: ['insert'],
  })
  @JoinTable()
  roles: RoleEntity[];
}
