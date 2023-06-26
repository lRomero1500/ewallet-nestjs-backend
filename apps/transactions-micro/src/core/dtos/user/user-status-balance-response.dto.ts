import Decimal from 'decimal.js';

export class UserStatusBalanceResponseDTO {
  userId: string;
  status: string;
  balance: Decimal;
}
