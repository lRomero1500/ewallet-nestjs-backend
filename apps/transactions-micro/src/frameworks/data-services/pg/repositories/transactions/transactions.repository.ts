import { Injectable } from '@nestjs/common';
import { BaseRepositoryAbstract } from 'apps/transactions-micro/src/core';
import { TransactionEntity } from '../../entities';
import { ITransactionsRepository } from '../../../../../core/interfaces/repositories/transactions/transactions-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
export class TransactionRepository
  extends BaseRepositoryAbstract<TransactionEntity>
  implements ITransactionsRepository
{
  constructor(
    private dataSource: DataSource,
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {
    super(transactionRepository);
  }
  async getUserActivity(userId: string): Promise<TransactionEntity[]> {
    try {
      const queryBuilder = this.transactionRepository
        .createQueryBuilder('transaction')
        .innerJoinAndSelect(
          'transaction.bankbooks',
          'bankbook',
          'bankbook.userId = :userId',
          { userId },
        )
        .leftJoinAndSelect('transaction.type', 'transactionType')
        .leftJoinAndSelect('transaction.status', 'transactionStatus')
        .leftJoinAndSelect('bankbook.type', 'bankbookType')
        .where(
          'transaction.userFromId = :userId OR transaction.userToId = :userId',
          { userId },
        );

      return queryBuilder.getMany();
    } catch (error) {
      throw error;
    }
  }
}
