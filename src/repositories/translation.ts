import { Translation } from '../models/translation';
import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"

export const TranslationRepository = dataSource
    .getRepository(Translation)
    .extend({
        customMethod(): void {
            // TODO add custom implementation
            return
        },
    })

export default TranslationRepository
