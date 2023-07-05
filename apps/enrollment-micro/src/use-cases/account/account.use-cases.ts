import { Inject, Injectable } from '@nestjs/common';
import { getMapperToken } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DateTime } from 'luxon';
import {
  IAccountRepository,
  IUserRepository,
} from '../../core/interfaces/repositories';
import {
  AccountDTO,
  ICommonResponse,
  IErrorResponse,
  UserStatusBalanceBindingDTO,
  UserStatusBalanceResponseDTO,
} from '../../core';

@Injectable()
export class AccountUseCases {
  constructor(
    @Inject(getMapperToken()) private readonly mapper: Mapper,
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async updateBalanceAccount(accountDTO: AccountDTO): Promise<ICommonResponse> {
    try {
      const account = (
        await this.userRepository.getByCondition({
          where: {
            id: accountDTO.userId,
          },
          relations: {
            account: true,
          },
        })
      )?.account;
      if (account) {
        account.balance = accountDTO.balance;
        account.updated_at = DateTime.utc().toJSDate();
        const result = await this.accountRepository.update(account.id, account);
        if (result)
          return {
            isSuccess: true,
          } as ICommonResponse;
        else
          return {
            isSuccess: false,
            error: {
              statusCode: '1001',
              statusMessage: 'no se encontro la cuenta',
              traceError: null,
            } as IErrorResponse,
          } as ICommonResponse;
      } else {
        return {
          isSuccess: false,
          error: {
            statusCode: '1001',
            statusMessage: 'no se encontro la cuenta',
            traceError: null,
          } as IErrorResponse,
        } as ICommonResponse;
      }
    } catch (error) {
      return {
        isSuccess: false,
        error: {
          statusCode: '9001',
          statusMessage: 'Ocurrio un error inesperado',
          traceError: error,
        },
      };
    }
  }
  async getUserStatusAndBalance(
    data: UserStatusBalanceBindingDTO,
  ): Promise<ICommonResponse<UserStatusBalanceResponseDTO>> {
    const user =
      data.searchType == 'userId'
        ? await this.userRepository.getByCondition({
            where: {
              id: data.userSearchParam,
            },
            relations: {
              account: true,
              status: true,
            },
          })
        : await this.userRepository.getByCondition({
            where: {
              person: {
                phoneNumber: data.userSearchParam,
              },
            },
            relations: {
              account: true,
              status: true,
              person: true,
            },
          });
    if (!user)
      return {
        isSuccess: false,
        error: {
          statusCode: '9001',
          statusMessage: 'usuario no existe',
        } as IErrorResponse,
      };
    return {
      isSuccess: true,
      data: {
        userId: user.id,
        status: user.status.status,
        balance: user.account.balance,
      },
    };
  }
}
