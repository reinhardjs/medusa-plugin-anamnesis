import { TransactionBaseService } from "@medusajs/medusa"
import AnamnesisFormRepository from "../repositories/anamnesis-form"
import { AnamnesisForm } from "../models/anamnesis-form"

class AnamnesisFormService extends TransactionBaseService {
    protected anamnesisFormRepository_: typeof AnamnesisFormRepository

    constructor(container) {
        super(container)
        this.anamnesisFormRepository_ = container.anamnesisFormRepository
    }
    
    async create(
        data: Pick<AnamnesisForm, "title" | "description">
    ): Promise<AnamnesisForm> {
        return this.atomicPhase_(async (manager) => {
            const postRepo = manager.withRepository(
                this.anamnesisFormRepository_
            )
            const post = postRepo.create()
            post.title = data.title
            post.description = data.description
            const result = await postRepo.save(post)

            return result
        })
    }

    async list(): Promise<AnamnesisForm[]> {
        const anamnesisFormRepo = this.activeManager_.withRepository(
            this.anamnesisFormRepository_
        )
        return await anamnesisFormRepo.find()
    }
}

export default AnamnesisFormService
