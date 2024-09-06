import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { UpdateAnamnesisResponseDto } from "../../../../../common/dtos/anamnesis-response"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const anamnesisResponseService = req.scope.resolve("anamnesisResponseService")

    const { id } = req.params

    const result = await anamnesisResponseService.get(id)

    res.json({
        "success": true,
        data: result,
    })
}

export const PUT = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const anamnesisResponseService = req.scope.resolve("anamnesisResponseService")

    const dto: UpdateAnamnesisResponseDto = req.body
    const { id } = req.params

    try {
        const updatedAnamnesisResponse = await anamnesisResponseService.update(id, dto)

        res.json({
            "success": true,
            data: updatedAnamnesisResponse,
        })
    } catch (error) {
        res.status(400).json({
            message: "Error updating anamnesis response",
            error: error.message,
        })
    }
}

export const DELETE = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const anamnesisResponseService = req.scope.resolve("anamnesisResponseService")

    const { id } = req.params

    try {
        const deletedAnamnesisResponse = await anamnesisResponseService.delete(id)

        res.json({
            "success": true,
            data: deletedAnamnesisResponse,
        })
    } catch (error) {
        res.status(400).json({
            message: "Error deleting anamnesis response",
            error: error.message,
        })
    }
}
