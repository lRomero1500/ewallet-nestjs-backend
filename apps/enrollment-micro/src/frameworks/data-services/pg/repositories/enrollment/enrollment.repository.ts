import { Injectable } from '@nestjs/common';
import { IEnrollmentRepository } from 'apps/enrollment-micro/src/core/interfaces/repositories/enrollment/enrollment-repository.interface';
import { DataSource } from 'typeorm';
import { AccountEntity, PersonEntity, UserEntity } from '../../entities';

@Injectable()
export class EnrollmentRepository implements IEnrollmentRepository {
  constructor(private dataSource: DataSource) {}
  async newEnrollment(
    person: PersonEntity,
    user: UserEntity,
  ): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      person = await queryRunner.manager.save(person);
      const account = new AccountEntity();
      account.id = crypto.randomUUID();
      await queryRunner.manager.save(account);
      user.personId = person.id;
      user.accountId = account.id;
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    return true;
  }
}
