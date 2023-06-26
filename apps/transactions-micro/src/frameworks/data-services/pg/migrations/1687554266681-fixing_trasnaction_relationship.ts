import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixingTrasnactionRelationship1687554266681
  implements MigrationInterface
{
  name = 'FixingTrasnactionRelationship1687554266681';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
  }
}
