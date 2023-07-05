import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangingUserFromToNullableTrasnactionsTable1687362608834
  implements MigrationInterface
{
  name = 'ChangingUserFromToNullableTrasnactionsTable1687362608834';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" DROP CONSTRAINT "FK_4191d59823ed20612e07f0bea4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ALTER COLUMN "user_from_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ADD CONSTRAINT "FK_4191d59823ed20612e07f0bea4d" FOREIGN KEY ("user_from_id") REFERENCES "operations"."user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" DROP CONSTRAINT "FK_4191d59823ed20612e07f0bea4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ALTER COLUMN "user_from_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ADD CONSTRAINT "FK_4191d59823ed20612e07f0bea4d" FOREIGN KEY ("user_from_id") REFERENCES "operations"."user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }
}
