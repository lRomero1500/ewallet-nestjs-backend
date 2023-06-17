import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1686944966502 implements MigrationInterface {
    name = 'InitialMigration1686944966502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth"."auth0_api_tokens" ("id" SERIAL NOT NULL, "api_token" character varying(4096) NOT NULL, "expires_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_2bcc57e84a6efa0ac61e29e9d11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."user" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "auth"."user"`);
        await queryRunner.query(`DROP TABLE "auth"."auth0_api_tokens"`);
    }

}
