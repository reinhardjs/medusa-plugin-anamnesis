import { AnamnesisForm } from '../models/anamnesis-form';
import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"

export const AnamnesisFormRepository = dataSource
    .getRepository(AnamnesisForm)
    .extend({
        async getAdminFormTemplateById(formId: string): Promise<AnamnesisForm | null> {
            return this.createQueryBuilder("form")
                .leftJoinAndSelect("form.sections", "section")
                .leftJoinAndSelect("section.questions", "question")
                .where("form.id = :formId", { formId })
                .getOne()
        },
    })

export default AnamnesisFormRepository
