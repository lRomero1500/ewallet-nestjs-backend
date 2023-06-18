import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingMissingUniqueIndexToPersonTable1687056807640
  implements MigrationInterface
{
  name = 'AddingMissingUniqueIndexToPersonTable1687056807640';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" DROP CONSTRAINT "FK_892a2061d6a04a7e2efe4c26d6f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ALTER COLUMN "status_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_92e53922e1adab8e7546fd1ccc" ON "enrollment"."person" ("identification_number", "doc_type_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ADD CONSTRAINT "FK_892a2061d6a04a7e2efe4c26d6f" FOREIGN KEY ("status_id") REFERENCES "enrollment"."status"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" DROP CONSTRAINT "FK_892a2061d6a04a7e2efe4c26d6f"`,
    );
    await queryRunner.query(
      `DROP INDEX "enrollment"."IDX_92e53922e1adab8e7546fd1ccc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ALTER COLUMN "status_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ADD CONSTRAINT "FK_892a2061d6a04a7e2efe4c26d6f" FOREIGN KEY ("status_id") REFERENCES "enrollment"."status"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }
}
