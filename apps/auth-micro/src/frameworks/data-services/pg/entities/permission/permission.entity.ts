import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from '../role/role.entity';
import { AutoMap } from '@automapper/classes';

@Entity({
  name: 'permission',
  schema: 'auth',
})
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @AutoMap()
  @Column({
    name: 'permission',
    type: 'varchar',
    length: 50,
  })
  permission: string;
  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];
}
