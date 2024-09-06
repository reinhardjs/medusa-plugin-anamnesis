import { TransactionBaseService } from "@medusajs/medusa"
import AnamnesisSectionRepository from "../repositories/anamnesis-section"
import { AnamnesisSection } from "../models/anamnesis-section"
import { CreateAnamnesisSectionDto, UpdateAnamnesisSectionDto } from "../common/dtos/anamnesis-section"

class AnamnesisSectionService extends TransactionBaseService {
    protected anamnesisSectionRepository_: typeof AnamnesisSectionRepository

    constructor(container) {
        super(container)
        this.anamnesisSectionRepository_ = container.anamnesisSectionRepository
    }
    
    /**
     * Creates a new anamnesis section with the provided dto data.
     *
     * @param data - An object containing the data of the anamnesis section to create.
     * @returns The newly created anamnesis section.
     */
    async create(
        dto: CreateAnamnesisSectionDto
    ): Promise<AnamnesisSection> {
        const data = {
            title: dto.title,
            description: dto.description,
            order: dto.order,
            form: {
                id: dto.form_id
            },
        }
        const section = this.anamnesisSectionRepository_.create(data)
        let result = await this.anamnesisSectionRepository_.save(section)
        delete result.form

        return result
    }

    /**
     * Retrieves all anamnesis sections.
     *
     * @returns An array of all anamnesis sections.
     */
    async list(): Promise<AnamnesisSection[]> {
        return await this.anamnesisSectionRepository_.find()
    }

    /**
     * Retrieves an anamnesis section by its ID.
     *
     * @param id - The ID of the anamnesis section to retrieve.
     * @returns The anamnesis section with the specified ID.
     */
    async get(id: string): Promise<AnamnesisSection> {
        return await this.anamnesisSectionRepository_.findOne({ where: { id } })
    }

    /**
     * Updates an existing anamnesis section with the provided data.
     *
     * @param id - The ID of the anamnesis section to update.
     * @param data - An object containing the fields to update.
     * @returns The updated anamnesis section.
     */
    async update(
        id: string,
        dto: UpdateAnamnesisSectionDto
    ): Promise<AnamnesisSection> {
        const section = await this.anamnesisSectionRepository_.findOne({ where: { id } })
        if (!section) {
            throw new Error("Anamnesis section not found")
        }
        const data = {
            title: dto.title,
            description: dto.description,
            order: dto.order,
            form: {
                id: dto.form_id
            },
        }
        Object.assign(section, data)
        let result = await this.anamnesisSectionRepository_.save(section)
        delete result.form

        return result
    }

    /**
     * Deletes an anamnesis section by its ID.
     *
     * @param id - The ID of the anamnesis section to delete.
     * @returns The deleted anamnesis section.
     */
    async delete(id: string): Promise<AnamnesisSection> {
        const section = await this.anamnesisSectionRepository_.findOne({ where: { id } })
        if (!section) {
            throw new Error("Anamnesis section not found")
        }
        return await this.anamnesisSectionRepository_.remove(section)
    }
}

export default AnamnesisSectionService
