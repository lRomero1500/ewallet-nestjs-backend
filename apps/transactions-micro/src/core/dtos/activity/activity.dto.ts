import Decimal from 'decimal.js';

export class ActivityDTO {
  transactionType: string;
  movementType: string;
  amount: Decimal;
  isInCome: boolean;
  status: string;
}
