import { AnamnesisForm } from '../models/anamnesis-form';
import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"

export const AnamnesisFormRepository = dataSource
    .getRepository(AnamnesisForm)
    .extend({
        customMethod(): void {
            // TODO add custom implementation
            return
        },
    })

export default AnamnesisFormRepository
