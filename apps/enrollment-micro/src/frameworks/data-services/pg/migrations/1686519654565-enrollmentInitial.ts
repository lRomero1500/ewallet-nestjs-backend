import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnrollmentInitial1686519654565 implements MigrationInterface {
  name = 'EnrollmentInitial1686519654565';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "enrollment"."status" ("id" SERIAL NOT NULL, "status" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "enrollment"."user" ("id" uuid NOT NULL, "user_name" character varying(50) NOT NULL, "password" character varying(200) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, "status_id" integer, "account_id" uuid, CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name"), CONSTRAINT "REL_892a2061d6a04a7e2efe4c26d6" UNIQUE ("status_id"), CONSTRAINT "REL_6acfec7285fdf9f463462de3e9" UNIQUE ("account_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "enrollment"."account" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "enrollment"."document_type" ("id" SERIAL NOT NULL, "type" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "PK_2e1aa55eac1947ddf3221506edb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "enrollment"."person" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "identification_number" character varying(50) NOT NULL, "phone_number" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, "gender_id" integer, "doc_type_id" integer, CONSTRAINT "UQ_14092a0ddb4f4b457f1d05b0fc6" UNIQUE ("phone_number"), CONSTRAINT "UQ_d2d717efd90709ebd3cb26b936c" UNIQUE ("email"), CONSTRAINT "REL_ed2fe2232f9ac9d53729688c13" UNIQUE ("gender_id"), CONSTRAINT "REL_ad6382862b5059c2a52175e5cc" UNIQUE ("doc_type_id"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "enrollment"."gender" ("id" SERIAL NOT NULL, "type" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ADD CONSTRAINT "FK_892a2061d6a04a7e2efe4c26d6f" FOREIGN KEY ("status_id") REFERENCES "enrollment"."status"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" ADD CONSTRAINT "FK_6acfec7285fdf9f463462de3e9f" FOREIGN KEY ("account_id") REFERENCES "enrollment"."account"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" ADD CONSTRAINT "FK_ed2fe2232f9ac9d53729688c13c" FOREIGN KEY ("gender_id") REFERENCES "enrollment"."gender"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" ADD CONSTRAINT "FK_ad6382862b5059c2a52175e5cce" FOREIGN KEY ("doc_type_id") REFERENCES "enrollment"."document_type"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" DROP CONSTRAINT "FK_ad6382862b5059c2a52175e5cce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."person" DROP CONSTRAINT "FK_ed2fe2232f9ac9d53729688c13c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" DROP CONSTRAINT "FK_6acfec7285fdf9f463462de3e9f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollment"."user" DROP CONSTRAINT "FK_892a2061d6a04a7e2efe4c26d6f"`,
    );
    await queryRunner.query(`DROP TABLE "enrollment"."gender"`);
    await queryRunner.query(`DROP TABLE "enrollment"."person"`);
    await queryRunner.query(`DROP TABLE "enrollment"."document_type"`);
    await queryRunner.query(`DROP TABLE "enrollment"."account"`);
    await queryRunner.query(`DROP TABLE "enrollment"."user"`);
    await queryRunner.query(`DROP TABLE "enrollment"."status"`);
  }
}
