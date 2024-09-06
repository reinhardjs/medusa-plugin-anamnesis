import { MigrationInterface, QueryRunner } from "typeorm";

export class AnamnesisCreate1725597116440 implements MigrationInterface {
    name = 'AnamnesisCreate1725597116440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "anamnesis_form" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_f1a2f2f2baedfd42b23244f15eb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "anamnesis_form"`);
    }

}
