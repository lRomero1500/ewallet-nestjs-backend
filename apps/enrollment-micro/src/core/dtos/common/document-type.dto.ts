import { Exclude, Expose } from 'class-transformer';
import { AutoMap } from '@automapper/classes';
export class DocumentTypeDTO {
  @AutoMap()
  @Expose()
  id: number;
  @AutoMap()
  @Expose()
  type: string;
  @Exclude({ toPlainOnly: true })
  created_at: Date;
  @Exclude({ toPlainOnly: true })
  updated_at: Date | null;

  constructor(partial?: Partial<DocumentTypeDTO>) {
    Object.assign(this, partial);
  }
}
