import { Exclude, Expose } from 'class-transformer';
export class DocumentTypeEntity {
  @Expose()
  id: number;
  @Expose()
  type: string;
  @Exclude({ toPlainOnly: true })
  created_at: Date;
  @Exclude({ toPlainOnly: true })
  updated_at: Date | null;

  constructor(partial?: Partial<DocumentTypeEntity>) {
    Object.assign(this, partial);
  }
}
