import { MigrationInterface, QueryRunner } from "typeorm";

export class AnamnesisCreate1725598348742 implements MigrationInterface {
    name = 'AnamnesisCreate1725598348742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."anamnesis_question_question_type_enum" AS ENUM('short_answer', 'long_answer', 'date', 'date_time', 'time', 'multiple_choice', 'select')`);
        await queryRunner.query(`CREATE TABLE "anamnesis_question" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "question_text" character varying NOT NULL, "question_type" "public"."anamnesis_question_question_type_enum" NOT NULL, "options" jsonb, "section_id" character varying, CONSTRAINT "PK_86e2e63da3196fcb17521a2d3e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "anamnesis_question" ADD CONSTRAINT "FK_07fc6f23b8318255968ad61a21b" FOREIGN KEY ("section_id") REFERENCES "anamnesis_section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anamnesis_question" DROP CONSTRAINT "FK_07fc6f23b8318255968ad61a21b"`);
        await queryRunner.query(`DROP TABLE "anamnesis_question"`);
        await queryRunner.query(`DROP TYPE "public"."anamnesis_question_question_type_enum"`);
    }

}
