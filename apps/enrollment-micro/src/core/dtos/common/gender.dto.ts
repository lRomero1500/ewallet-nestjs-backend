import { AutoMap } from '@automapper/classes';
import { Exclude, Expose } from 'class-transformer';

export class GenderDTO {
  @AutoMap()
  @Expose()
  id: number;
  @AutoMap()
  @Expose()
  gender: string;
  @Exclude({ toPlainOnly: true })
  created_at: Date;
  @Exclude({ toPlainOnly: true })
  updated_at: Date | null;

  constructor(partial?: Partial<GenderDTO>) {
    Object.assign(this, partial);
  }
}
