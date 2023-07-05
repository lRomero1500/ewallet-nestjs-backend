import { Injectable } from '@nestjs/common';
import {
  ICommonResponse,
  ITransactionsBankBooksRepository,
} from 'apps/transactions-micro/src/core/interfaces';
import { DataSource } from 'typeorm';
import { BankBookEntity, TransactionEntity, UserEntity } from '../../entities';
import Decimal from 'decimal.js';

@Injectable()
export class TransactionsBankbooksRepository
  implements ITransactionsBankBooksRepository
{
  constructor(private dataSource: DataSource) {}
  async welcomingBonus(
    transaction: TransactionEntity,
  ): Promise<ICommonResponse<null>> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let user = new UserEntity();
      user.id = transaction.userToId;
      user = await queryRunner.manager.save(user);
      transaction = await queryRunner.manager.save(transaction);
      const movement = new BankBookEntity();
      movement.transactionId = transaction.id;
      movement.amount = new Decimal(1000.0);
      movement.typeId = 2;
      movement.userId = user.id;
      await queryRunner.manager.save(movement);
      await queryRunner.commitTransaction();
      return {
        isSuccess: true,
      } satisfies ICommonResponse;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async transferAmount(
    amount: Decimal,
    transaction: TransactionEntity,
  ): Promise<ICommonResponse<null>> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const movementFrom = new BankBookEntity();
      movementFrom.transactionId = transaction.id;
      movementFrom.amount = amount;
      movementFrom.typeId = 1;
      movementFrom.userId = transaction.userFromId;
      const movementTo = new BankBookEntity();
      movementTo.transactionId = transaction.id;
      movementTo.amount = amount;
      movementTo.typeId = 2;
      movementTo.userId = transaction.userToId;
      await queryRunner.manager.save(movementFrom);
      await queryRunner.manager.save(movementTo);
      await queryRunner.commitTransaction();
      return {
        isSuccess: true,
      } satisfies ICommonResponse;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
