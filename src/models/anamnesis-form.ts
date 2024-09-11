import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn
} from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { AnamnesisSection } from "./anamnesis-section"

@Entity()
export class AnamnesisForm extends BaseEntity {
    @PrimaryColumn()
    id: string

    @Column({ type: "varchar" })
    title: string | null

    @Column({ type: "varchar" })
    description: string | null

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => AnamnesisSection, (section) => section.form)
    @JoinColumn({ name: "form_id" })
    sections: AnamnesisSection[]

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "anamnesis_form")
    }
}
