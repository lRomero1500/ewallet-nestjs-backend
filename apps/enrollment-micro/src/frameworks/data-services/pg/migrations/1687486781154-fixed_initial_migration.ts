import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixedInitialMigration1687486781154 implements MigrationInterface {
  name = 'FixedInitialMigration1687486781154';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "enrollment"."status" ("id" SERIAL NOT NULL, "status" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "enrollment"."gender" ("id" SERIAL NOT NULL, "type" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "enrollment"."document_type" ("id" SERIAL NOT NULL, "type" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "PK_2e1aa55eac1947ddf3221506edb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "enrollment"."person" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "gender_id" integer NOT NULL, "identification_number" character varying(50) NOT NULL, "doc_type_id" integer NOT NULL, "phone_number" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "UQ_14092a0ddb4f4b457f1d05b0fc6" UNIQUE ("phone_number"), CONSTRAINT "UQ_d2d717efd90709ebd3cb26b936c" UNIQUE ("email"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_92e53922e1adab8e7546fd1ccc" ON "enrollment"."person" ("identification_number", "doc_type_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "enrollment"."user" ("id" uuid NOT NULL, "statusId" integer NOT NULL, "person_id" uuid NOT NULL, "account_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "REL_a4cee7e601d219733b064431fb" UNIQUE ("person_id"), CONSTRAINT "REL_6acfec7285fdf9f463462de3e9" UNIQUE ("account_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "enrollment"."account" ("id" uuid NOT NULL, "balance" numeric(10,2) NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" ADD CONSTRAINT "FK_ed2fe2232f9ac9d53729688c13c" FOREIGN KEY ("gender_id") REFERENCES "enrollment"."gender"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" ADD CONSTRAINT "FK_ad6382862b5059c2a52175e5cce" FOREIGN KEY ("doc_type_id") REFERENCES "enrollment"."document_type"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "enrollment"."status"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
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
      `ALTER TABLE "enrollment"."user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" DROP CONSTRAINT "FK_ad6382862b5059c2a52175e5cce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" DROP CONSTRAINT "FK_ed2fe2232f9ac9d53729688c13c"`,
    );
    await queryRunner.query(`DROP TABLE "enrollment"."account"`);
    await queryRunner.query(`DROP TABLE "enrollment"."user"`);
    await queryRunner.query(
      `DROP INDEX "enrollment"."IDX_92e53922e1adab8e7546fd1ccc"`,
    );
    await queryRunner.query(`DROP TABLE "enrollment"."person"`);
    await queryRunner.query(`DROP TABLE "enrollment"."document_type"`);
    await queryRunner.query(`DROP TABLE "enrollment"."gender"`);
    await queryRunner.query(`DROP TABLE "enrollment"."status"`);
  }
}
