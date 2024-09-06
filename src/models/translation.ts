import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { EntityType } from "../common/enums/translation.enum";

@Entity()
export class Translation extends BaseEntity {
    @PrimaryColumn()
    id: string

    @Column({
        type: 'enum',
        enum: EntityType
    })
    entity_type: EntityType;

    @Column({ type: "varchar" })
    entity_id: string | null

    @Column({ type: "varchar" })
    language_code: string | null

    @Column({ type: "varchar" })
    translated_text: string | null

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "translation")
    }
}
