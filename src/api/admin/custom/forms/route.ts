import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { CreateAnamnesisFormDto } from "../../../../common/dtos/anamnesis-form"

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const anamnesisFormService = req.scope.resolve("anamnesisFormService")

    const { title, description }: CreateAnamnesisFormDto = req.body

    try {
        const newAnamnesisForm = await anamnesisFormService.create({
            title,
            description,
        })

        res.status(201).json({
            "success": true,
            data: newAnamnesisForm
        })
    } catch (error) {
        res.status(400).json({
            message: "Error creating anamnesis form",
            error: error.message,
        })
    }
}

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
 ) => {
    const anamnesisFormService = req.scope.resolve("anamnesisFormService")

    const list = await anamnesisFormService.list()

    res.json({
        "success": true,
        data: list,
    })
}
