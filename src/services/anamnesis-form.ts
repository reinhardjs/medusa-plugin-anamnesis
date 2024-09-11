import { TransactionBaseService } from "@medusajs/medusa"
import AnamnesisFormRepository from "../repositories/anamnesis-form"
import { AnamnesisForm } from "../models/anamnesis-form"

class AnamnesisFormService extends TransactionBaseService {
    protected anamnesisFormRepository_: typeof AnamnesisFormRepository

    constructor(container) {
        super(container)
        this.anamnesisFormRepository_ = container.anamnesisFormRepository
    }
    
    /**
     * Creates a new anamnesis form with the provided title and description.
     *
     * @param data - An object containing the title and description of the anamnesis form to create.
     * @returns The newly created anamnesis form.
     */
    async create(
        data: Pick<AnamnesisForm, "title" | "description">
    ): Promise<AnamnesisForm> {
        const forms = this.anamnesisFormRepository_.create(data)
        return await this.anamnesisFormRepository_.save(forms)
    }

    /**
     * Retrieves all anamnesis forms.
     *
     * @returns An array of all anamnesis forms.
     */
    async list(): Promise<AnamnesisForm[]> {
        return await this.anamnesisFormRepository_.find()
    }

    /**
     * Retrieves an anamnesis form by its ID.
     *
     * @param id - The ID of the anamnesis form to retrieve.
     * @returns The anamnesis form with the specified ID.
     */
    async get(id: string): Promise<AnamnesisForm> {
        return await this.anamnesisFormRepository_.findOne({ where: { id } })
    }

    /**
     * Retrieves an anamnesis form template by its form ID.
     *
     * @param formId - The ID of the anamnesis form to retrieve.
     * @returns The anamnesis form template with the specified ID.
     */
    async getAdminFormTemplateById(formId: string): Promise<AnamnesisForm> {
        return await this.anamnesisFormRepository_.getAdminFormTemplateById(formId)
    }

    /**
     * Updates an existing anamnesis form with the provided data.
     *
     * @param id - The ID of the anamnesis form to update.
     * @param data - An object containing the fields to update.
     * @returns The updated anamnesis form.
     */
    async update(
        id: string,
        data: Partial<Pick<AnamnesisForm, "title" | "description">>
    ): Promise<AnamnesisForm> {
        const form = await this.anamnesisFormRepository_.findOne({ where: { id } })
        if (!form) {
            throw new Error("Anamnesis form not found")
        }
        Object.assign(form, data)
        return await this.anamnesisFormRepository_.save(form)
    }

    /**
     * Deletes an anamnesis form by its ID.
     *
     * @param id - The ID of the anamnesis form to delete.
     * @returns The deleted anamnesis form.
     */
    async delete(id: string): Promise<AnamnesisForm> {
        const form = await this.anamnesisFormRepository_.findOne({ where: { id } })
        if (!form) {
            throw new Error("Anamnesis form not found")
        }
        return await this.anamnesisFormRepository_.remove(form)
    }
}

export default AnamnesisFormService
