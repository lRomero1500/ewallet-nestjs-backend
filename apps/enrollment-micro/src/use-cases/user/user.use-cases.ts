import { Mapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { ICommonResponse, IUserRepository, UserProfileDTO } from '../../core';
import { UserEntity } from '../../frameworks';

@Injectable()
export class UserUseCases {
  constructor(
    @Inject(getMapperToken()) private readonly mapper: Mapper,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async getUserProfile(email: string): Promise<UserProfileDTO> {
    try {
      const userProfile = await this.userRepository.getByCondition({
        where: {
          person: {
            email: email,
          },
        },
        relations: {
          person: {
            documentType: true,
          },
          account: true,
        },
      });
      const result = await this.mapper.mapAsync(
        userProfile,
        UserEntity,
        UserProfileDTO,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getUserProfileById(userId: string): Promise<UserProfileDTO> {
    try {
      const userProfile = await this.userRepository.getByCondition({
        where: {
          id: userId,
        },
        relations: {
          person: {
            documentType: true,
          },
          account: true,
        },
      });
      const result = await this.mapper.mapAsync(
        userProfile,
        UserEntity,
        UserProfileDTO,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}
