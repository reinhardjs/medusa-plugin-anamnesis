import { AnamnesisSection } from '../models/anamnesis-section';
import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"

export const AnamnesisSectionRepository = dataSource
    .getRepository(AnamnesisSection)
    .extend({
        customMethod(): void {
            // TODO add custom implementation
            return
        },
    })

export default AnamnesisSectionRepository
