import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { AnamnesisForm } from "./anamnesis-form"
import { AnamnesisQuestion } from "./anamnesis-question"

@Entity()
export class AnamnesisSection extends BaseEntity {
    @PrimaryColumn()
    id: string

    @ManyToOne(() => AnamnesisForm)
    @JoinColumn({ name: "form_id" })
    form: AnamnesisForm

    @Column({ type: "varchar" })
    title: string | null

    @Column({ type: "varchar" })
    description: string | null

    @Column({ type: "int" })
    order: number | null

    @Column({ type: "varchar" })
    form_id: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => AnamnesisQuestion, (question) => question.section)
    @JoinColumn({ name: "section_id" })
    questions: AnamnesisQuestion[]

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "anamnesis_section")
    }
}
