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
}

export default AnamnesisFormService
