import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn, BeforeInsert } from 'typeorm';
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { AnamnesisSection } from './anamnesis-section';
import { QuestionType } from '../common/enums/anamnesis-question.enum';

@Entity()
export class AnamnesisQuestion extends BaseEntity {
    @PrimaryColumn()
    id: string

    @Column()
    section_id: string;

    @ManyToOne(() => AnamnesisSection)
    @JoinColumn({ name: 'section_id' })
    section: AnamnesisSection;

    @Column()
    question_text: string;

    @Column({
        type: 'enum',
        enum: QuestionType
    })
    question_type: QuestionType;

    @Column({ type: 'jsonb', nullable: true })
    options: object;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "anamnesis_question")
    }
}
