import { AnamnesisQuestion } from '../models/anamnesis-question';
import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"

export const AnamnesisQuestionRepository = dataSource
    .getRepository(AnamnesisQuestion)
    .extend({
        customMethod(): void {
            // TODO add custom implementation
            return
        },
    })

export default AnamnesisQuestionRepository
