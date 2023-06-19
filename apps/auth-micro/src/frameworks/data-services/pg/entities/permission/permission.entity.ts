import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from '../role/role.entity';

@Entity({
  name: 'permission',
  schema: 'auth',
})
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'permission',
    type: 'varchar',
    length: 50,
  })
  permission: string;
  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];
}
