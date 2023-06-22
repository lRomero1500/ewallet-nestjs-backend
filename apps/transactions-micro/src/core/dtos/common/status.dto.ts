import { AutoMap } from '@automapper/classes';
import { Exclude, Expose } from 'class-transformer';

export class StatusDTO {
  @AutoMap()
  @Expose()
  id: number;
  @AutoMap()
  @Expose()
  status: string;
  @Exclude({ toPlainOnly: true })
  created_at: Date;
  @Exclude({ toPlainOnly: true })
  updated_at: Date | null;

  constructor(partial?: Partial<StatusDTO>) {
    Object.assign(this, partial);
  }
}
