import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { UpdateAnamnesisFormDto } from "../../../../../common/dtos/anamnesis-form"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
 ) => {
    const anamnesisFormService = req.scope.resolve("anamnesisFormService")

    const { id } = req.params

    const result = await anamnesisFormService.get(id)

    res.json({
        "success": true,
        data: result,
    })
}

export const PUT = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const anamnesisFormService = req.scope.resolve("anamnesisFormService")

    const { title, description }: UpdateAnamnesisFormDto = req.body
    const { id } = req.params

    try {
        const updatedAnamnesisForm = await anamnesisFormService.update(id, {
            title,
            description,
        })

        res.json({
            "success": true,
            data: updatedAnamnesisForm,
        })
    } catch (error) {
        res.status(400).json({
            message: "Error updating anamnesis form",
            error: error.message,
        })
    }
}
