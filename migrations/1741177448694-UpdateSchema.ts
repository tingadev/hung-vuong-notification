import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1741177448694 implements MigrationInterface {
    name = 'UpdateSchema1741177448694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" ADD "user_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "user_id"`);
    }

}
