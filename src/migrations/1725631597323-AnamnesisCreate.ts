import { MigrationInterface, QueryRunner } from "typeorm";

export class AnamnesisCreate1725631597323 implements MigrationInterface {
    name = 'AnamnesisCreate1725631597323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."translation_entity_type_enum" AS ENUM('form', 'section', 'question')`);
        await queryRunner.query(`CREATE TABLE "translation" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "entity_type" "public"."translation_entity_type_enum" NOT NULL, "entity_id" character varying NOT NULL, "language_code" character varying NOT NULL, "translated_text" character varying NOT NULL, CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "anamnesis_section" DROP CONSTRAINT "FK_6f3c436585444bb4a97e79d1015"`);
        await queryRunner.query(`ALTER TABLE "anamnesis_section" ALTER COLUMN "form_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anamnesis_question" DROP CONSTRAINT "FK_07fc6f23b8318255968ad61a21b"`);
        await queryRunner.query(`ALTER TABLE "anamnesis_question" ALTER COLUMN "section_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anamnesis_section" ADD CONSTRAINT "FK_6f3c436585444bb4a97e79d1015" FOREIGN KEY ("form_id") REFERENCES "anamnesis_form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anamnesis_question" ADD CONSTRAINT "FK_07fc6f23b8318255968ad61a21b" FOREIGN KEY ("section_id") REFERENCES "anamnesis_section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anamnesis_question" DROP CONSTRAINT "FK_07fc6f23b8318255968ad61a21b"`);
        await queryRunner.query(`ALTER TABLE "anamnesis_section" DROP CONSTRAINT "FK_6f3c436585444bb4a97e79d1015"`);
        await queryRunner.query(`ALTER TABLE "anamnesis_question" ALTER COLUMN "section_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anamnesis_question" ADD CONSTRAINT "FK_07fc6f23b8318255968ad61a21b" FOREIGN KEY ("section_id") REFERENCES "anamnesis_section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anamnesis_section" ALTER COLUMN "form_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anamnesis_section" ADD CONSTRAINT "FK_6f3c436585444bb4a97e79d1015" FOREIGN KEY ("form_id") REFERENCES "anamnesis_form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "translation"`);
        await queryRunner.query(`DROP TYPE "public"."translation_entity_type_enum"`);
    }

}
