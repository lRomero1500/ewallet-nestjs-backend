import { AutoMap } from '@automapper/classes';
import Decimal from 'decimal.js';

export class AccountDTO {
  @AutoMap()
  id?: string;
  @AutoMap()
  userId: string;
  @AutoMap()
  balance: Decimal;
}
