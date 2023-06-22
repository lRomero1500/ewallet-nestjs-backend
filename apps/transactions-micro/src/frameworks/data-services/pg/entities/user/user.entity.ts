import { Column, Entity } from 'typeorm';

@Entity({
  name: 'user',
  schema: 'operations',
})
export class UserEntity {
  @Column({
    name: 'id',
    type: 'uuid',
    primary: true,
  })
  id: string;
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
