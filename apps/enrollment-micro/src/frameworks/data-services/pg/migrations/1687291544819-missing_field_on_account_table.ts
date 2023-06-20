import { MigrationInterface, QueryRunner } from 'typeorm';

export class MissingFieldOnAccountTable1687291544819
  implements MigrationInterface
{
  name = 'MissingFieldOnAccountTable1687291544819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enrollment"."account" ADD "balance" numeric(10,2) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enrollment"."account" DROP COLUMN "balance"`,
    );
  }
}
