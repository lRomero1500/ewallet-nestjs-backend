import Decimal from 'decimal.js';
import { TransactionsDTO } from './transactions.dto';

export class TransferAmountDTO {
  transaction: TransactionsDTO;
  amount: Decimal;
}
