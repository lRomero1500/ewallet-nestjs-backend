import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity({
  name: 'status',
  schema: 'operations',
})
export class StatusEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;
  @AutoMap()
  @Column({
    name: 'status',
    type: 'varchar',
    length: '50',
  })
  status: string;
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
