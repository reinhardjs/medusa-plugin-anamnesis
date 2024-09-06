import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { CreateAnamnesisResponseDto } from "../../../../common/dtos/anamnesis-response"

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const anamnesisResponseService = req.scope.resolve("anamnesisResponseService")

    const dto: CreateAnamnesisResponseDto = req.body

    try {
        const newAnamnesisQuestion = await anamnesisResponseService.create(dto)

        res.status(201).json({
            "success": true,
            data: newAnamnesisQuestion
        })
    } catch (error) {
        res.status(400).json({
            message: "Error creating anamnesis response",
            error: error.message,
        })
    }
}

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
 ) => {
    const anamnesisResponseService = req.scope.resolve("anamnesisResponseService")

    const list = await anamnesisResponseService.list()

    res.json({
        "success": true,
        data: list,
    })
}
