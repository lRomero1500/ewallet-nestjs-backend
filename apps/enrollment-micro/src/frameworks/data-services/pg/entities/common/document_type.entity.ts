import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PersonEntity } from '../person/person.entity';
import { AutoMap } from '@automapper/classes';
@Entity({
  name: 'document_type',
  schema: 'enrollment',
})
export class DocumentTypeEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;
  @AutoMap()
  @Column({
    name: 'type',
    type: 'varchar',
    length: '50',
  })
  type: string;
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
