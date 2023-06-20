import { TransactionEntity } from '../../../../frameworks/data-services/pg/entities/transactions/transaction.entity';
import { ICommonResponse } from '../../ICommonResponse';
export interface ITransactionsBankBooksRepository {
  welcomingBonus(transaction: TransactionEntity): Promise<ICommonResponse>;
}
