import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({
  name: 'status',
  schema: 'enrollment',
})
export class StatusEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'status',
    type: 'varchar',
    length: '50',
  })
  status: string;
  @OneToMany(() => UserEntity, (user) => user.status, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  users: UserEntity[];
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
