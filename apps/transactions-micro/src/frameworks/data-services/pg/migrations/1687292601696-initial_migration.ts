import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1687292601696 implements MigrationInterface {
    name = 'InitialMigration1687292601696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "operations"."movement_types" ("id" SERIAL NOT NULL, "type" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "PK_157378727fd686272582297d37f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operations"."status" ("id" SERIAL NOT NULL, "status" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operations"."user" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operations"."transaction_types" ("id" SERIAL NOT NULL, "type" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "PK_2a49fe7879bf8a02812639cea61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operations"."transaction" ("id" BIGSERIAL NOT NULL, "status_id" integer NOT NULL, "type_id" integer NOT NULL, "user_from_id" uuid NOT NULL, "user_to_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "REL_05fbbdf6bc1db819f47975c8c0" UNIQUE ("status_id"), CONSTRAINT "REL_e4e15bcea926d360cfeea703c3" UNIQUE ("type_id"), CONSTRAINT "REL_4191d59823ed20612e07f0bea4" UNIQUE ("user_from_id"), CONSTRAINT "REL_41d845c4e0b4179739eb7f4f74" UNIQUE ("user_to_id"), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operations"."bank_books" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "type_id" integer NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT '0', "transaction_id" bigint NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "REL_8d1607b8da7dc87b76ac463033" UNIQUE ("type_id"), CONSTRAINT "REL_d2ca91ecd973ef3a0af61c65f0" UNIQUE ("transaction_id"), CONSTRAINT "PK_706231685ee1b05786486c9cae3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "operations"."transaction" ADD CONSTRAINT "FK_05fbbdf6bc1db819f47975c8c0b" FOREIGN KEY ("status_id") REFERENCES "operations"."status"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "operations"."transaction" ADD CONSTRAINT "FK_e4e15bcea926d360cfeea703c36" FOREIGN KEY ("type_id") REFERENCES "operations"."transaction_types"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "operations"."transaction" ADD CONSTRAINT "FK_4191d59823ed20612e07f0bea4d" FOREIGN KEY ("user_from_id") REFERENCES "operations"."user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "operations"."transaction" ADD CONSTRAINT "FK_41d845c4e0b4179739eb7f4f745" FOREIGN KEY ("user_to_id") REFERENCES "operations"."user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "operations"."bank_books" ADD CONSTRAINT "FK_8d1607b8da7dc87b76ac4630333" FOREIGN KEY ("type_id") REFERENCES "operations"."movement_types"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "operations"."bank_books" ADD CONSTRAINT "FK_d2ca91ecd973ef3a0af61c65f08" FOREIGN KEY ("transaction_id") REFERENCES "operations"."transaction"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operations"."bank_books" DROP CONSTRAINT "FK_d2ca91ecd973ef3a0af61c65f08"`);
        await queryRunner.query(`ALTER TABLE "operations"."bank_books" DROP CONSTRAINT "FK_8d1607b8da7dc87b76ac4630333"`);
        await queryRunner.query(`ALTER TABLE "operations"."transaction" DROP CONSTRAINT "FK_41d845c4e0b4179739eb7f4f745"`);
        await queryRunner.query(`ALTER TABLE "operations"."transaction" DROP CONSTRAINT "FK_4191d59823ed20612e07f0bea4d"`);
        await queryRunner.query(`ALTER TABLE "operations"."transaction" DROP CONSTRAINT "FK_e4e15bcea926d360cfeea703c36"`);
        await queryRunner.query(`ALTER TABLE "operations"."transaction" DROP CONSTRAINT "FK_05fbbdf6bc1db819f47975c8c0b"`);
        await queryRunner.query(`DROP TABLE "operations"."bank_books"`);
        await queryRunner.query(`DROP TABLE "operations"."transaction"`);
        await queryRunner.query(`DROP TABLE "operations"."transaction_types"`);
        await queryRunner.query(`DROP TABLE "operations"."user"`);
        await queryRunner.query(`DROP TABLE "operations"."status"`);
        await queryRunner.query(`DROP TABLE "operations"."movement_types"`);
    }

}
