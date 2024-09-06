import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { UpdateAnamnesisQuestionDto } from "../../../../../common/dtos/anamnesis-question"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
 ) => {
    const anamnesisQuestionService = req.scope.resolve("anamnesisQuestionService")

    const { id } = req.params

    const result = await anamnesisQuestionService.get(id)

    res.json({
        "success": true,
        data: result,
    })
}

export const PUT = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const anamnesisQuestionService = req.scope.resolve("anamnesisQuestionService")

    const dto: UpdateAnamnesisQuestionDto = req.body
    const { id } = req.params

    try {
        const updatedAnamnesisQuestion = await anamnesisQuestionService.update(id, dto)

        res.json({
            "success": true,
            data: updatedAnamnesisQuestion,
        })
    } catch (error) {
        res.status(400).json({
            message: "Error updating anamnesis question",
            error: error.message,
        })
    }
}

export const DELETE = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const anamnesisQuestionService = req.scope.resolve("anamnesisQuestionService")

    const { id } = req.params

    try {
        const deletedAnamnesisQuestion = await anamnesisQuestionService.delete(id)

        res.json({
            "success": true,
            data: deletedAnamnesisQuestion,
        })
    } catch (error) {
        res.status(400).json({
            message: "Error deleting anamnesis question",
            error: error.message,
        })
    }
}
