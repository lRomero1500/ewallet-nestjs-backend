import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionEntity } from '../permission/permission.entity';
import { UserEntity } from '../user';
import { AutoMap } from '@automapper/classes';

@Entity({
  name: 'role',
  schema: 'auth',
})
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'role',
    type: 'varchar',
    length: 50,
  })
  role: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
  @AutoMap()
  @ManyToMany(() => PermissionEntity, (permission) => permission.roles, {
    cascade: ['insert'],
  })
  @JoinTable()
  permissions: PermissionEntity[];
}
