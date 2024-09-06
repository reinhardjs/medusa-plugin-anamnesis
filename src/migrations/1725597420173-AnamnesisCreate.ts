import { MigrationInterface, QueryRunner } from "typeorm";

export class AnamnesisCreate1725597420173 implements MigrationInterface {
    name = 'AnamnesisCreate1725597420173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "anamnesis_section" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "order" integer NOT NULL, "form_id" character varying, CONSTRAINT "PK_ae5930ce318f2c9c5627c6d4fb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "anamnesis_section" ADD CONSTRAINT "FK_6f3c436585444bb4a97e79d1015" FOREIGN KEY ("form_id") REFERENCES "anamnesis_form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anamnesis_section" DROP CONSTRAINT "FK_6f3c436585444bb4a97e79d1015"`);
        await queryRunner.query(`DROP TABLE "anamnesis_section"`);
    }

}
