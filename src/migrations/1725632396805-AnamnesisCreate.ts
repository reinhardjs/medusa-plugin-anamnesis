import { MigrationInterface, QueryRunner } from "typeorm";

export class AnamnesisCreate1725632396805 implements MigrationInterface {
    name = 'AnamnesisCreate1725632396805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "anamnesis_response" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customer_id" character varying NOT NULL, "order_id" character varying NOT NULL, "form_id" character varying NOT NULL, "responses" jsonb, CONSTRAINT "PK_bb330d0e712b14d7454c226238d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "anamnesis_response" ADD CONSTRAINT "FK_c5666e28d5998c82ec0080d382b" FOREIGN KEY ("form_id") REFERENCES "anamnesis_form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anamnesis_response" DROP CONSTRAINT "FK_c5666e28d5998c82ec0080d382b"`);
        await queryRunner.query(`DROP TABLE "anamnesis_response"`);
    }

}
