import { Inject, Injectable } from '@nestjs/common';
import { ITransactionsBankBooksRepository } from '../../core/interfaces';
import { ICommonResponse } from 'apps/enrollment-micro/src/core';
import { TransactionsDTO } from '../../core/dtos';
import { getMapperToken } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { TransactionEntity } from '../../frameworks/data-services/pg';
import { ClientProxy } from '@nestjs/microservices';
import { AccountDTO } from '../../core/dtos/account';
import Decimal from 'decimal.js';
@Injectable()
export class TransactionsUseCases {
  constructor(
    @Inject(getMapperToken()) private readonly mapper: Mapper,
    @Inject('ITransactionsBankBooksRepository')
    private readonly transactionsBankbooksRepository: ITransactionsBankBooksRepository,
    @Inject('KAFKA_SERVICE')
    private kafkaClientProxy: ClientProxy,
  ) {}
  async welcomingBonus(
    transactionDTO: TransactionsDTO,
  ): Promise<ICommonResponse> {
    try {
      console.log('welcomingBonus - incoming: ', transactionDTO);
      const transaction = await this.mapper.mapAsync(
        transactionDTO,
        TransactionsDTO,
        TransactionEntity,
      );
      console.log('welcomingBonus - entityMapped: ', transaction);
      const result = await this.transactionsBankbooksRepository.welcomingBonus(
        transaction,
      );
      console.log('------------- Result: ', result);
      if (result?.isSuccess) {
        const accountDTO = new AccountDTO();
        accountDTO.balance = new Decimal(1000);
        accountDTO.userId = transactionDTO.userToId;
        console.log('------------- Event called: ');
        this.kafkaClientProxy.emit('topic.balance_update', {
          accountDTO,
        });
        console.log('------------- Event Finished: ');
      }
      return result;
    } catch (error) {
      console.log('welcomingBonus error: ', error);
      throw error;
    }
  }
}
