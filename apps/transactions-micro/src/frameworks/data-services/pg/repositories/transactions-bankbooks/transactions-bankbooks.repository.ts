import { Injectable } from '@nestjs/common';
import {
  ICommonResponse,
  ITransactionsBankBooksRepository,
} from 'apps/transactions-micro/src/core/interfaces';
import { DataSource } from 'typeorm';
import { TransactionEntity } from '../../entities';
@Injectable()
export class TransactionsBankbooksRepository
  implements ITransactionsBankBooksRepository
{
  constructor(private dataSource: DataSource) {}
  async welcomingBonus(
    transaction: TransactionEntity,
  ): Promise<ICommonResponse<null>> {
    throw new Error('Method not implemented.');
  }
}
