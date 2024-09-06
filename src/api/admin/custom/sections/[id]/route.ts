import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { UpdateAnamnesisSectionDto } from "../../../../../common/dtos/anamnesis-section"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
 ) => {
    const anamnesisSectionService = req.scope.resolve("anamnesisSectionService")

    const { id } = req.params

    const result = await anamnesisSectionService.get(id)

    res.json({
        "success": true,
        data: result,
    })
}

export const PUT = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const anamnesisSectionService = req.scope.resolve("anamnesisSectionService")

    const dto: UpdateAnamnesisSectionDto = req.body
    const { id } = req.params

    try {
        const updatedAnamnesisSection = await anamnesisSectionService.update(id, dto)

        res.json({
            "success": true,
            data: updatedAnamnesisSection,
        })
    } catch (error) {
        res.status(400).json({
            message: "Error updating anamnesis section",
            error: error.message,
        })
    }
}

export const DELETE = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const anamnesisSectionService = req.scope.resolve("anamnesisSectionService")

    const { id } = req.params

    try {
        const deletedAnamnesisSection = await anamnesisSectionService.delete(id)

        res.json({
            "success": true,
            data: deletedAnamnesisSection,
        })
    } catch (error) {
        res.status(400).json({
            message: "Error deleting anamnesis section",
            error: error.message,
        })
    }
}
