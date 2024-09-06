import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn, BeforeInsert } from 'typeorm';
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { AnamnesisForm } from './anamnesis-form';

@Entity()
export class AnamnesisResponse extends BaseEntity {
    @PrimaryColumn()
    id: string

    @Column()
    customer_id: string;

    @Column()
    order_id: string;

    @Column()
    form_id: string;

    @ManyToOne(() => AnamnesisForm)
    @JoinColumn({ name: 'form_id' })
    form: AnamnesisForm;

    @Column({ type: 'jsonb', nullable: true })
    responses: object;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "anamnesis_response")
    }
}
