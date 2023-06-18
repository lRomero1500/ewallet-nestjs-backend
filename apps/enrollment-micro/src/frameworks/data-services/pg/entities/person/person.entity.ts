import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { GenderEntity } from '../common/gender.entity';
import { DocumentTypeEntity } from '../common/document_type.entity';
import { AutoMap } from '@automapper/classes';
import { type } from 'os';

@Entity({
  name: 'person',
  schema: 'enrollment',
})
@Index(['identificationNumber', 'docTypeId'], { unique: true })
export class PersonEntity {
  @AutoMap()
  @Column({
    name: 'id',
    type: 'uuid',
    primary: true,
  })
  id: string;
  @AutoMap()
  @Column({
    name: 'name',
    type: 'varchar',
    length: '50',
  })
  name: string;
  @AutoMap()
  @Column({
    name: 'last_name',
    type: 'varchar',
    length: '50',
  })
  lastName: string;
  @AutoMap()
  @Column({
    name: 'gender_id',
    type: 'int',
  })
  genderId: number;
  @OneToOne(() => GenderEntity, (gender) => gender.Persons, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'gender_id', referencedColumnName: 'id' }])
  gender: GenderEntity;
  @AutoMap()
  @Column({
    name: 'identification_number',
    type: 'varchar',
    length: '50',
  })
  identificationNumber: string;
  @Column({
    name: 'doc_type_id',
    type: 'int',
  })
  docTypeId: number;
  @OneToOne(() => DocumentTypeEntity, (docType) => docType.Persons, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'doc_type_id', referencedColumnName: 'id' }])
  documentType: DocumentTypeEntity;
  @AutoMap()
  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: '50',
    unique: true,
  })
  phoneNumber: string;
  @AutoMap()
  @Column({
    name: 'email',
    type: 'varchar',
    length: '50',
    unique: true,
  })
  email: string;
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
