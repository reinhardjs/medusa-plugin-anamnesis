import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { CreateTranslationDto } from "../../../../common/dtos/translation"

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const translationService = req.scope.resolve("translationService")

    const dto: CreateTranslationDto = req.body

    try {
        const newTranslation = await translationService.create(dto)

        res.status(201).json({
            "success": true,
            data: newTranslation
        })
    } catch (error) {
        res.status(400).json({
            message: "Error creating translation",
            error: error.message,
        })
    }
}

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
 ) => {
    const translationService = req.scope.resolve("translationService")

    const list = await translationService.list()

    res.json({
        "success": true,
        data: list,
    })
}
