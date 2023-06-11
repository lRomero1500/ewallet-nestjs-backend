import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PersonEntity } from '../person/person.entity';

@Entity({
  name: 'gender',
  schema: 'enrollment',
})
export class GenderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'type',
    type: 'varchar',
    length: '20',
  })
  gender: string;
  @OneToMany(() => PersonEntity, (person) => person.gender, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  Persons: PersonEntity[];
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
