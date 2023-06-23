import { Inject, Injectable } from '@nestjs/common';
import {
  IStatusRepository,
  ITransactionsBankBooksRepository,
  ITransactionsRepository,
} from '../../core/interfaces';
import { ICommonResponse } from 'apps/enrollment-micro/src/core';
import {
  TransactionsDTO,
  UserStatusBalanceBindingDTO,
  UserStatusBalanceResponseDTO,
} from '../../core/dtos';
import { getMapperToken } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { TransactionEntity } from '../../frameworks/data-services/pg';
import { ClientProxy } from '@nestjs/microservices';
import { AccountDTO } from '../../core/dtos/account';
import Decimal from 'decimal.js';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class TransactionsUseCases {
  constructor(
    @Inject(getMapperToken()) private readonly mapper: Mapper,
    @Inject('ITransactionsBankBooksRepository')
    private readonly transactionsBankbooksRepository: ITransactionsBankBooksRepository,
    @Inject('IStatusRepository')
    private readonly statusRepository: IStatusRepository,
    @Inject('ITransactionsRepository')
    private readonly transactionsRepository: ITransactionsRepository,
    @Inject('KAFKA_SERVICE')
    private kafkaClientProxy: ClientProxy,
    @Inject('ENROLLMENT_SERVICE')
    private enrollmentClientProxy: ClientProxy,
  ) {}
  async welcomingBonus(
    transactionDTO: TransactionsDTO,
  ): Promise<ICommonResponse> {
    try {
      const transaction = await this.mapper.mapAsync(
        transactionDTO,
        TransactionsDTO,
        TransactionEntity,
      );
      const result = await this.transactionsBankbooksRepository.welcomingBonus(
        transaction,
      );
      if (result?.isSuccess) {
        const accountDTO = new AccountDTO();
        accountDTO.balance = new Decimal(1000);
        accountDTO.userId = transactionDTO.userToId;
        this.kafkaClientProxy.emit('topic.balance_update', {
          accountDTO,
        });
      }
      return result;
    } catch (error) {
      console.log('welcomingBonus error: ', error);
      throw error;
    }
  }
  async transferAmount(
    amount: Decimal,
    transactionDTO: TransactionsDTO,
  ): Promise<ICommonResponse> {
    const transaction = await this.mapper.mapAsync(
      transactionDTO,
      TransactionsDTO,
      TransactionEntity,
    );
    try {
      const userFromInfo = await firstValueFrom(
        this.enrollmentClientProxy.send<
          ICommonResponse<UserStatusBalanceResponseDTO>
        >({ cmd: 'getUserStatusAndBalance' }, {
          searchType: 'userId',
          userSearchParam: transaction.userFromId,
        } as UserStatusBalanceBindingDTO),
      );
      const userToInfo = await firstValueFrom(
        this.enrollmentClientProxy.send<
          ICommonResponse<UserStatusBalanceResponseDTO>
        >({ cmd: 'getUserStatusAndBalance' }, {
          searchType: 'phone',
          userSearchParam: transaction.userToId,
        } as UserStatusBalanceBindingDTO),
      );
      if (!userFromInfo.isSuccess) {
        return {
          isSuccess: false,
          error: userFromInfo.error,
        };
      }
      if (!userToInfo.isSuccess) {
        return {
          isSuccess: false,
          error: userToInfo.error,
        };
      }
      const userFromData = userFromInfo.data as UserStatusBalanceResponseDTO;
      const userToData = userToInfo.data as UserStatusBalanceResponseDTO;
      transaction.userToId = userToData.userId;
      transaction.id = await this.makeTransaction(transaction);
      const validationsResult = await this.validations(
        transaction,
        userFromData,
        userToData,
        amount,
      );
      if (!validationsResult.isSuccess) {
        return validationsResult;
      }
      const movementsResult =
        await this.transactionsBankbooksRepository.transferAmount(
          amount,
          transaction,
        );
      if (!movementsResult.isSuccess) {
        await this.updateTransaction(transaction, 'Error');
        return movementsResult;
      }
      await this.updateTransaction(transaction, 'Approved');
      const accountFromDTO = new AccountDTO();
      accountFromDTO.balance = new Decimal(userFromData.balance).minus(amount);
      accountFromDTO.userId = transaction.userFromId;
      this.kafkaClientProxy.emit('topic.balance_update', {
        accountDTO: accountFromDTO,
      });
      const accountToDTO = new AccountDTO();
      accountToDTO.balance = new Decimal(userToData.balance).plus(amount);
      accountToDTO.userId = transactionDTO.userToId;
      this.kafkaClientProxy.emit('topic.balance_update', {
        accountDTO: accountToDTO,
      });
      return {
        isSuccess: true,
      };
    } catch (error) {
      await this.updateTransaction(transaction, 'Error');
      throw error;
    }
  }
  async validations(
    transaction: TransactionEntity,
    userFromData: UserStatusBalanceResponseDTO,
    userToData: UserStatusBalanceResponseDTO,
    amount: Decimal,
  ): Promise<ICommonResponse> {
    // #region User From Validations
    if (userFromData.status != 'Active') {
      await this.updateTransaction(transaction, 'Error');
      return {
        isSuccess: false,
        error: {
          statusCode: '9001',
          statusMessage: 'el usuario tiene un estatus diferente de activo',
          traceError: undefined,
        },
      };
    }
    if (new Decimal(userFromData.balance).lessThan(amount)) {
      await this.updateTransaction(transaction, 'Error');
      return {
        isSuccess: false,
        error: {
          statusCode: '9001',
          statusMessage:
            'el usuario no tiene fondos suficientes, para realizar la transaccion',
          traceError: undefined,
        },
      };
    }
    // #endregion
    // #region User To Validations
    if (userToData.status != 'Active') {
      await this.updateTransaction(transaction, 'Error');
      return {
        isSuccess: false,
        error: {
          statusCode: '9001',
          statusMessage: 'el usuario tiene un estatus diferente de activo',
          traceError: undefined,
        },
      };
    }
    // #endregion
    if (userFromData.userId == userToData.userId) {
      await this.updateTransaction(transaction, 'Error');
      return {
        isSuccess: false,
        error: {
          statusCode: '9001',
          statusMessage: 'no puede envar dinero a si mismo',
          traceError: undefined,
        },
      };
    }
    return {
      isSuccess: true,
    };
  }
  async makeTransaction(transaction: TransactionEntity): Promise<number> {
    const pendingStatus = await this.statusRepository.getByCondition({
      where: {
        status: 'Pending',
      },
    });
    if (!pendingStatus) throw new Error('El estatus pendiente no existe en DB');
    transaction.statusId = pendingStatus.id;
    transaction = await this.transactionsRepository.create(transaction);
    if (!transaction.id)
      throw new Error('Ocurrio un error al intentar crear la transaccion');
    return transaction.id;
  }
  async updateTransaction(
    transaction: TransactionEntity,
    status: string,
  ): Promise<TransactionEntity> {
    const statusEntity = await this.statusRepository.getByCondition({
      where: {
        status: status,
      },
    });
    if (!statusEntity) throw new Error(`El estatus ${status} no existe en DB`);
    transaction.statusId = statusEntity.id;
    transaction = await this.transactionsRepository.update(
      transaction.id,
      transaction,
    );
    return transaction;
  }
}
