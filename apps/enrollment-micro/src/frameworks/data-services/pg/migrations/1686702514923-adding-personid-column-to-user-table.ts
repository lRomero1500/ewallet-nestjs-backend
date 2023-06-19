import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingPersonidColumnToUserTable1686702514923
  implements MigrationInterface
{
  name = 'AddingPersonidColumnToUserTable1686702514923';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" DROP CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" DROP COLUMN "user_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" DROP COLUMN "password"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ADD "person_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ADD CONSTRAINT "UQ_a4cee7e601d219733b064431fba" UNIQUE ("person_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" DROP CONSTRAINT "FK_ed2fe2232f9ac9d53729688c13c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" DROP CONSTRAINT "FK_ad6382862b5059c2a52175e5cce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" ALTER COLUMN "gender_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" ALTER COLUMN "doc_type_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" DROP CONSTRAINT "FK_6acfec7285fdf9f463462de3e9f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ALTER COLUMN "account_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" ADD CONSTRAINT "FK_ed2fe2232f9ac9d53729688c13c" FOREIGN KEY ("gender_id") REFERENCES "enrollment"."gender"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" ADD CONSTRAINT "FK_ad6382862b5059c2a52175e5cce" FOREIGN KEY ("doc_type_id") REFERENCES "enrollment"."document_type"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ADD CONSTRAINT "FK_a4cee7e601d219733b064431fba" FOREIGN KEY ("person_id") REFERENCES "enrollment"."person"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ADD CONSTRAINT "FK_6acfec7285fdf9f463462de3e9f" FOREIGN KEY ("account_id") REFERENCES "enrollment"."account"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" DROP CONSTRAINT "FK_6acfec7285fdf9f463462de3e9f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" DROP CONSTRAINT "FK_a4cee7e601d219733b064431fba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" DROP CONSTRAINT "FK_ad6382862b5059c2a52175e5cce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" DROP CONSTRAINT "FK_ed2fe2232f9ac9d53729688c13c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ALTER COLUMN "account_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ADD CONSTRAINT "FK_6acfec7285fdf9f463462de3e9f" FOREIGN KEY ("account_id") REFERENCES "enrollment"."account"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" ALTER COLUMN "doc_type_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" ALTER COLUMN "gender_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" ADD CONSTRAINT "FK_ad6382862b5059c2a52175e5cce" FOREIGN KEY ("doc_type_id") REFERENCES "enrollment"."document_type"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" ADD CONSTRAINT "FK_ed2fe2232f9ac9d53729688c13c" FOREIGN KEY ("gender_id") REFERENCES "enrollment"."gender"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" DROP CONSTRAINT "UQ_a4cee7e601d219733b064431fba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" DROP COLUMN "person_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ADD "password" character varying(200) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ADD "user_name" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ADD CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name")`,
    );
  }
}
