import { AnamnesisResponse } from '../models/anamnesis-response';
import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"

export const AnamnesisResponseRepository = dataSource
    .getRepository(AnamnesisResponse)
    .extend({
        customMethod(): void {
            // TODO add custom implementation
            return
        },
    })

export default AnamnesisResponseRepository
