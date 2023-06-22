import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingMissingFieldBankbooksUserId1687295941762
  implements MigrationInterface
{
  name = 'AddingMissingFieldBankbooksUserId1687295941762';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ADD "user_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ADD CONSTRAINT "UQ_72bca844fe80578f811b72194bf" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ADD CONSTRAINT "FK_72bca844fe80578f811b72194bf" FOREIGN KEY ("user_id") REFERENCES "operations"."user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" DROP CONSTRAINT "FK_72bca844fe80578f811b72194bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" DROP CONSTRAINT "UQ_72bca844fe80578f811b72194bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" DROP COLUMN "user_id"`,
    );
  }
}
