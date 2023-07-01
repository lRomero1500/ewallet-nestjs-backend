import { Inject, Injectable } from '@nestjs/common';
import {
  IStatusRepository,
  ITransactionsBankBooksRepository,
  ITransactionsRepository,
} from '../../core/interfaces';
import { ICommonResponse } from 'apps/enrollment-micro/src/core';
import {
  ActivityDTO,
  DetailedActivityDTO,
  TransactionsDTO,
  UserActivityDTO,
  UserStatusBalanceResponseDTO,
} from '../../core/dtos';
import { getMapperToken } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { TransactionEntity } from '../../frameworks/data-services/pg';
import { AccountDTO } from '../../core/dtos/account';
import Decimal from 'decimal.js';
import { EnrollmentProxyService, KafkaProxyService } from '../../services';
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
    private readonly kafkaService: KafkaProxyService,
    private readonly enrollmentService: EnrollmentProxyService,
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
        this.kafkaService.balanceUpdate(accountDTO);
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
      const userFromInfo = await this.enrollmentService.getUserStatusAndBalance(
        transaction.userFromId,
        'userId',
      );
      const userToInfo = await this.enrollmentService.getUserStatusAndBalance(
        transaction.userToId,
        'phone',
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
      this.kafkaService.balanceUpdate(accountFromDTO);
      const accountToDTO = new AccountDTO();
      accountToDTO.balance = new Decimal(userToData.balance).plus(amount);
      accountToDTO.userId = transactionDTO.userToId;
      this.kafkaService.balanceUpdate(accountToDTO);
      return {
        isSuccess: true,
      };
    } catch (error) {
      await this.updateTransaction(transaction, 'Error');
      throw error;
    }
  }
  async getUserActivity(
    userId: string,
  ): Promise<ICommonResponse<ActivityDTO[]>> {
    try {
      const transactions = await this.transactionsRepository.getUserActivity(
        userId,
      );
      const activity = await this.mapper.mapArrayAsync(
        transactions,
        TransactionEntity,
        ActivityDTO,
      );
      return {
        isSuccess: true,
        data: activity,
      };
    } catch (error) {
      throw error;
    }
  }
  async getUserActivityDetailed(
    userId: string,
    transactionId: number,
  ): Promise<ICommonResponse<DetailedActivityDTO>> {
    try {
      const transaction = await this.transactionsRepository.getByCondition({
        where: {
          id: transactionId,
          bankbooks: {
            userId: userId,
          },
        },
        relations: {
          bankbooks: {
            type: true,
          },
          type: true,
        },
      });
      const userActivityDetailed = await this.mapper.mapAsync(
        transaction,
        TransactionEntity,
        DetailedActivityDTO,
      );
      const userFromData = transaction?.userFromId
        ? await this.enrollmentService.getProfileInfo(transaction?.userFromId)
        : null;
      if (userFromData) {
        userActivityDetailed.userFrom = {
          fullName: `${userFromData.person.name} ${userFromData.person.lastName}`,
          documentType: userFromData.person.documentType.type,
          documentNumber: userFromData.person.identificationNumber,
        } as UserActivityDTO;
      }
      const userToData = await this.enrollmentService.getProfileInfo(
        transaction?.userToId as string,
      );
      userActivityDetailed.userTo = {
        fullName: `${userToData.person.name} ${userToData.person.lastName}`,
        documentType: userToData.person.documentType.type,
        documentNumber: userToData.person.identificationNumber,
      } as UserActivityDTO;
      return {
        isSuccess: true,
        data: userActivityDetailed,
      };
    } catch (error) {
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
