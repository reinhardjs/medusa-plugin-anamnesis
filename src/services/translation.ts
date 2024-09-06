import { TransactionBaseService } from "@medusajs/medusa"
import TranslationRepository from "../repositories/translation"
import { Translation } from "../models/translation"
import { CreateTranslationDto, UpdateTranslationDto } from "../common/dtos/translation"

class TranslationService extends TransactionBaseService {
    protected translationRepository_: typeof TranslationRepository

    constructor(container) {
        super(container)
        this.translationRepository_ = container.translationRepository
    }
    
    /**
     * Creates a new translation with the provided dto fields.
     *
     * @param data - An object containing the fields of the translation to create.
     * @returns The newly created translation.
     */
    async create(
        dto: CreateTranslationDto
    ): Promise<Translation> {
        const data = {
            entity_type: dto.entity_type,
            entity_id: dto.entity_id,
            language_code: dto.language_code,
            translated_text: dto.translated_text,
        }

        const translation = this.translationRepository_.create(data)
        let result = await this.translationRepository_.save(translation)
        
        return result
    }

    /**
     * Retrieves all translations.
     *
     * @returns An array of all translations.
     */
    async list(): Promise<Translation[]> {
        return await this.translationRepository_.find()
    }

    /**
     * Retrieves an translation by its ID.
     *
     * @param id - The ID of the translation to retrieve.
     * @returns The translation with the specified ID.
     */
    async get(id: string): Promise<Translation> {
        return await this.translationRepository_.findOne({ where: { id } })
    }

    /**
     * Updates an existing translation with the provided data.
     *
     * @param id - The ID of the translation to update.
     * @param data - An object containing the fields to update.
     * @returns The updated translation.
     */
    async update(
        id: string,
        dto: UpdateTranslationDto
    ): Promise<Translation> {
        const translation = await this.translationRepository_.findOne({ where: { id } })
        if (!translation) {
            throw new Error("Translation not found")
        }
        const data = {
            entity_type: dto.entity_type,
            entity_id: dto.entity_id,
            language_code: dto.language_code,
            translated_text: dto.translated_text,
        }
        Object.assign(translation, data)
        let result = await this.translationRepository_.save(translation)

        return result
    }

    /**
     * Deletes an translation by its ID.
     *
     * @param id - The ID of the translation to delete.
     * @returns The deleted translation.
     */
    async delete(id: string): Promise<Translation> {
        const translation = await this.translationRepository_.findOne({ where: { id } })
        if (!translation) {
            throw new Error("Translation not found")
        }
        return await this.translationRepository_.remove(translation)
    }
}

export default TranslationService
