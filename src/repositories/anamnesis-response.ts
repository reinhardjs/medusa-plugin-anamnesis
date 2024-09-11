import { AnamnesisResponse } from '../models/anamnesis-response';
import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"

export const AnamnesisResponseRepository = dataSource
    .getRepository(AnamnesisResponse)
    .extend({
        async getStoreResponseTemplateById(responseId: string): Promise<AnamnesisResponse | null> {
            return this.createQueryBuilder("response")
                .leftJoinAndSelect("response.form", "form")
                .leftJoinAndSelect("form.sections", "section")
                .leftJoinAndSelect("section.questions", "question")
                .where("response.id = :responseId", { responseId })
                .getOne()
        },
    })

export default AnamnesisResponseRepository
