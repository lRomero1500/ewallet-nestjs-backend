import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixingRelationships1687487479821 implements MigrationInterface {
  name = 'FixingRelationships1687487479821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" DROP CONSTRAINT "FK_05fbbdf6bc1db819f47975c8c0b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" DROP CONSTRAINT "FK_e4e15bcea926d360cfeea703c36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" DROP CONSTRAINT "FK_4191d59823ed20612e07f0bea4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" DROP CONSTRAINT "FK_41d845c4e0b4179739eb7f4f745"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" DROP CONSTRAINT "REL_05fbbdf6bc1db819f47975c8c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" DROP CONSTRAINT "REL_e4e15bcea926d360cfeea703c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" DROP CONSTRAINT "REL_4191d59823ed20612e07f0bea4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" DROP CONSTRAINT "REL_41d845c4e0b4179739eb7f4f74"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" DROP CONSTRAINT "FK_8d1607b8da7dc87b76ac4630333"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" DROP CONSTRAINT "FK_72bca844fe80578f811b72194bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" DROP CONSTRAINT "FK_d2ca91ecd973ef3a0af61c65f08"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" DROP CONSTRAINT "REL_8d1607b8da7dc87b76ac463033"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" DROP CONSTRAINT "UQ_72bca844fe80578f811b72194bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" DROP CONSTRAINT "REL_d2ca91ecd973ef3a0af61c65f0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ADD CONSTRAINT "FK_05fbbdf6bc1db819f47975c8c0b" FOREIGN KEY ("status_id") REFERENCES "operations"."status"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ADD CONSTRAINT "FK_e4e15bcea926d360cfeea703c36" FOREIGN KEY ("type_id") REFERENCES "operations"."transaction_types"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ADD CONSTRAINT "FK_4191d59823ed20612e07f0bea4d" FOREIGN KEY ("user_from_id") REFERENCES "operations"."user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ADD CONSTRAINT "FK_41d845c4e0b4179739eb7f4f745" FOREIGN KEY ("user_to_id") REFERENCES "operations"."user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ADD CONSTRAINT "FK_8d1607b8da7dc87b76ac4630333" FOREIGN KEY ("type_id") REFERENCES "operations"."movement_types"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ADD CONSTRAINT "FK_72bca844fe80578f811b72194bf" FOREIGN KEY ("user_id") REFERENCES "operations"."user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ADD CONSTRAINT "FK_d2ca91ecd973ef3a0af61c65f08" FOREIGN KEY ("transaction_id") REFERENCES "operations"."transaction"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" DROP CONSTRAINT "FK_d2ca91ecd973ef3a0af61c65f08"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" DROP CONSTRAINT "FK_72bca844fe80578f811b72194bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" DROP CONSTRAINT "FK_8d1607b8da7dc87b76ac4630333"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" DROP CONSTRAINT "FK_41d845c4e0b4179739eb7f4f745"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" DROP CONSTRAINT "FK_4191d59823ed20612e07f0bea4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" DROP CONSTRAINT "FK_e4e15bcea926d360cfeea703c36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" DROP CONSTRAINT "FK_05fbbdf6bc1db819f47975c8c0b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ADD CONSTRAINT "REL_d2ca91ecd973ef3a0af61c65f0" UNIQUE ("transaction_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ADD CONSTRAINT "UQ_72bca844fe80578f811b72194bf" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ADD CONSTRAINT "REL_8d1607b8da7dc87b76ac463033" UNIQUE ("type_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ADD CONSTRAINT "FK_d2ca91ecd973ef3a0af61c65f08" FOREIGN KEY ("transaction_id") REFERENCES "operations"."transaction"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ADD CONSTRAINT "FK_72bca844fe80578f811b72194bf" FOREIGN KEY ("user_id") REFERENCES "operations"."user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."bank_books" ADD CONSTRAINT "FK_8d1607b8da7dc87b76ac4630333" FOREIGN KEY ("type_id") REFERENCES "operations"."movement_types"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ADD CONSTRAINT "REL_41d845c4e0b4179739eb7f4f74" UNIQUE ("user_to_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ADD CONSTRAINT "REL_4191d59823ed20612e07f0bea4" UNIQUE ("user_from_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ADD CONSTRAINT "REL_e4e15bcea926d360cfeea703c3" UNIQUE ("type_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ADD CONSTRAINT "REL_05fbbdf6bc1db819f47975c8c0" UNIQUE ("status_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ADD CONSTRAINT "FK_41d845c4e0b4179739eb7f4f745" FOREIGN KEY ("user_to_id") REFERENCES "operations"."user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ADD CONSTRAINT "FK_4191d59823ed20612e07f0bea4d" FOREIGN KEY ("user_from_id") REFERENCES "operations"."user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ADD CONSTRAINT "FK_e4e15bcea926d360cfeea703c36" FOREIGN KEY ("type_id") REFERENCES "operations"."transaction_types"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "operations"."transaction" ADD CONSTRAINT "FK_05fbbdf6bc1db819f47975c8c0b" FOREIGN KEY ("status_id") REFERENCES "operations"."status"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }
}
