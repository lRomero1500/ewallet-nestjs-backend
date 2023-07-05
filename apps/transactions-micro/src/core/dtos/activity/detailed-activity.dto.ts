import Decimal from 'decimal.js';
import { UserActivityDTO } from '../user/user-activity.dto';

export class DetailedActivityDTO {
  transactionId: number;
  status: string;
  userFrom: UserActivityDTO;
  userTo: UserActivityDTO;
  amount: Decimal;
  date: Date;
  isInCome: boolean;
  transactionType: string;
}
