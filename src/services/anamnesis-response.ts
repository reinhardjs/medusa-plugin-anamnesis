import { TransactionBaseService } from "@medusajs/medusa"
import AnamnesisResponseRepository from "../repositories/anamnesis-response"
import { AnamnesisResponse } from "../models/anamnesis-response"
import { CreateAnamnesisResponseDto, UpdateAnamnesisResponseDto } from "../common/dtos/anamnesis-response"

class AnamnesisResponseService extends TransactionBaseService {
    protected anamnesisResponseRepository_: typeof AnamnesisResponseRepository

    constructor(container) {
        super(container)
        this.anamnesisResponseRepository_ = container.anamnesisResponseRepository
    }
    
    /**
     * Creates a new anamnesis response with the provided data.
     *
     * @param data - An object containing the data fields of the anamnesis response to create.
     * @returns The newly created anamnesis response.
     */
    async create(
        dto: CreateAnamnesisResponseDto
    ): Promise<AnamnesisResponse> {
        const data = {
            customer_id: dto.customer_id,
            order_id: dto.order_id,
            form_id: dto.form_id,
            responses: dto.responses,
        }
        const response = this.anamnesisResponseRepository_.create(data)
        let result = await this.anamnesisResponseRepository_.save(response)
        delete result.form
        
        return result
    }

    /**
     * Retrieves all anamnesis responses.
     *
     * @returns An array of all anamnesis responses.
     */
    async list(): Promise<AnamnesisResponse[]> {
        return await this.anamnesisResponseRepository_.find()
    }

    /**
     * Retrieves an anamnesis response by its ID.
     *
     * @param id - The ID of the anamnesis response to retrieve.
     * @returns The anamnesis response with the specified ID.
     */
    async get(id: string): Promise<AnamnesisResponse> {
        return await this.anamnesisResponseRepository_.findOne({ where: { id } })
    }

    /**
     * Retrieves an anamnesis response template by its response ID.
     *
     * @param responseId - The ID of the anamnesis response to retrieve.
     * @returns The anamnesis response template with the specified ID.
     */
    async getStoreResponseTemplateById(responseId: string): Promise<AnamnesisResponse> {
        return await this.anamnesisResponseRepository_.getStoreResponseTemplateById(responseId)
    }

    /**
     * Updates an existing anamnesis response with the provided data.
     *
     * @param id - The ID of the anamnesis response to update.
     * @param data - An object containing the fields to update.
     * @returns The updated anamnesis response.
     */
    async update(
        id: string,
        dto: UpdateAnamnesisResponseDto
    ): Promise<AnamnesisResponse> {
        const response = await this.anamnesisResponseRepository_.findOne({ where: { id } })
        if (!response) {
            throw new Error("Anamnesis response not found")
        }
        const data = {
            customer_id: dto.customer_id,
            order_id: dto.order_id,
            form_id: dto.form_id,
            responses: dto.responses,
        }
        Object.assign(response, data)
        let result = await this.anamnesisResponseRepository_.save(response)
        delete result.form

        return result
    }

    /**
     * Deletes an anamnesis response by its ID.
     *
     * @param id - The ID of the anamnesis response to delete.
     * @returns The deleted anamnesis response.
     */
    async delete(id: string): Promise<AnamnesisResponse> {
        const response = await this.anamnesisResponseRepository_.findOne({ where: { id } })
        if (!response) {
            throw new Error("Anamnesis response not found")
        }
        return await this.anamnesisResponseRepository_.remove(response)
    }
}

export default AnamnesisResponseService
