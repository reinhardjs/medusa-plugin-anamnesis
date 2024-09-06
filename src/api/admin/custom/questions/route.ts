import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { CreateAnamnesisQuestionDto } from "../../../../common/dtos/anamnesis-question"

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const anamnesisQuestionService = req.scope.resolve("anamnesisQuestionService")

    const dto: CreateAnamnesisQuestionDto = req.body

    try {
        const newAnamnesisQuestion = await anamnesisQuestionService.create(dto)

        res.status(201).json({
            "success": true,
            data: newAnamnesisQuestion
        })
    } catch (error) {
        res.status(400).json({
            message: "Error creating anamnesis question",
            error: error.message,
        })
    }
}

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
 ) => {
    const anamnesisQuestionService = req.scope.resolve("anamnesisQuestionService")

    const list = await anamnesisQuestionService.list()

    res.json({
        "success": true,
        data: list,
    })
}
