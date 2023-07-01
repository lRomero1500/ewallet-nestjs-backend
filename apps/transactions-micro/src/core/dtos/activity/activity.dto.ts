import Decimal from 'decimal.js';

export class ActivityDTO {
  transactionId: number;
  transactionType: string;
  movementType: string;
  amount: Decimal;
  isInCome: boolean;
  status: string;
}
