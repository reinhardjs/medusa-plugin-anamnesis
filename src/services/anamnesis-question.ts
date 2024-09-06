import { TransactionBaseService } from "@medusajs/medusa"
import AnamnesisQuestionRepository from "../repositories/anamnesis-question"
import { AnamnesisQuestion } from "../models/anamnesis-question"
import { CreateAnamnesisQuestionDto, UpdateAnamnesisQuestionDto } from "../common/dtos/anamnesis-question"

class AnamnesisQuestionService extends TransactionBaseService {
    protected anamnesisQuestionRepository_: typeof AnamnesisQuestionRepository

    constructor(container) {
        super(container)
        this.anamnesisQuestionRepository_ = container.anamnesisQuestionRepository
    }
    
    /**
     * Creates a new anamnesis question with the provided title and description.
     *
     * @param data - An object containing the title and description of the anamnesis question to create.
     * @returns The newly created anamnesis question.
     */
    async create(
        dto: CreateAnamnesisQuestionDto
    ): Promise<AnamnesisQuestion> {
        const data = {
            question_text: dto.question_text,
            question_type: dto.question_type,
            options: dto.options,
            section: {
                id: dto.section_id,
            },
            section_id: dto.section_id,
        }
        const question = this.anamnesisQuestionRepository_.create(data)
        let result = await this.anamnesisQuestionRepository_.save(question)
        delete result.section
        
        return result
    }

    /**
     * Retrieves all anamnesis questions.
     *
     * @returns An array of all anamnesis questions.
     */
    async list(): Promise<AnamnesisQuestion[]> {
        return await this.anamnesisQuestionRepository_.find()
    }

    /**
     * Retrieves an anamnesis question by its ID.
     *
     * @param id - The ID of the anamnesis question to retrieve.
     * @returns The anamnesis question with the specified ID.
     */
    async get(id: string): Promise<AnamnesisQuestion> {
        return await this.anamnesisQuestionRepository_.findOne({ where: { id } })
    }

    /**
     * Updates an existing anamnesis question with the provided data.
     *
     * @param id - The ID of the anamnesis question to update.
     * @param data - An object containing the fields to update.
     * @returns The updated anamnesis question.
     */
    async update(
        id: string,
        dto: UpdateAnamnesisQuestionDto
    ): Promise<AnamnesisQuestion> {
        const question = await this.anamnesisQuestionRepository_.findOne({ where: { id } })
        if (!question) {
            throw new Error("Anamnesis question not found")
        }
        const data = {
            question_text: dto.question_text,
            question_type: dto.question_type,
            options: dto.options,
            section: {
                id: dto.section_id,
            },
            section_id: dto.section_id,
        }
        Object.assign(question, data)
        let result = await this.anamnesisQuestionRepository_.save(question)
        delete result.section

        return result
    }

    /**
     * Deletes an anamnesis question by its ID.
     *
     * @param id - The ID of the anamnesis question to delete.
     * @returns The deleted anamnesis question.
     */
    async delete(id: string): Promise<AnamnesisQuestion> {
        const question = await this.anamnesisQuestionRepository_.findOne({ where: { id } })
        if (!question) {
            throw new Error("Anamnesis question not found")
        }
        return await this.anamnesisQuestionRepository_.remove(question)
    }
}

export default AnamnesisQuestionService
