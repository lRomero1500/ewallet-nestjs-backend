import Decimal from 'decimal.js';

export class AccountDTO {
  id?: string;
  userId: string;
  balance: Decimal;
}
