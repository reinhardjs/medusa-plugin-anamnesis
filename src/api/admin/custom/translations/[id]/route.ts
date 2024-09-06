import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { UpdateTranslationDto } from "../../../../../common/dtos/translation"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
 ) => {
    const translationService = req.scope.resolve("translationService")

    const { id } = req.params

    const result = await translationService.get(id)

    res.json({
        "success": true,
        data: result,
    })
}

export const PUT = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const translationService = req.scope.resolve("translationService")

    const dto: UpdateTranslationDto = req.body
    const { id } = req.params

    try {
        const updatedAnamnesisSection = await translationService.update(id, dto)

        res.json({
            "success": true,
            data: updatedAnamnesisSection,
        })
    } catch (error) {
        res.status(400).json({
            message: "Error updating translation",
            error: error.message,
        })
    }
}

export const DELETE = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const translationService = req.scope.resolve("translationService")

    const { id } = req.params

    try {
        const deletedAnamnesisSection = await translationService.delete(id)

        res.json({
            "success": true,
            data: deletedAnamnesisSection,
        })
    } catch (error) {
        res.status(400).json({
            message: "Error deleting translation",
            error: error.message,
        })
    }
}
