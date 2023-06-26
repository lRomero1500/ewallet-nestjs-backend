import { AutoMap } from '@automapper/classes';

export class TransactionsDTO {
  @AutoMap()
  id?: number;
  @AutoMap()
  statusId?: number;
  @AutoMap()
  typeId: number;
  @AutoMap()
  userFromId?: string;
  @AutoMap()
  userToId: string;
}
