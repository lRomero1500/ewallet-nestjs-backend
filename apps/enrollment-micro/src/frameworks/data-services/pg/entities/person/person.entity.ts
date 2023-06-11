import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { GenderEntity } from '../common/gender.entity';
import { DocumentTypeEntity } from '../common/document_type.entity';

@Entity({
  name: 'person',
  schema: 'enrollment',
})
export class PersonEntity {
  @Column({
    name: 'id',
    type: 'uuid',
    primary: true,
  })
  id: string;
  @Column({
    name: 'name',
    type: 'varchar',
    length: '50',
  })
  name: string;
  @Column({
    name: 'last_name',
    type: 'varchar',
    length: '50',
  })
  lastName: string;
  @OneToOne(() => GenderEntity, (gender) => gender.Persons, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'gender_id', referencedColumnName: 'id' }])
  gender: GenderEntity;
  @Column({
    name: 'identification_number',
    type: 'varchar',
    length: '50',
  })
  identificationNumber: string;
  @OneToOne(() => DocumentTypeEntity, (docType) => docType.Persons, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'doc_type_id', referencedColumnName: 'id' }])
  documentType: DocumentTypeEntity;
  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: '50',
    unique: true,
  })
  phoneNumber: string;
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
