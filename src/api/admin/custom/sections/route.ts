import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { CreateAnamnesisSectionDto } from "../../../../common/dtos/anamnesis-section"

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const anamnesisSectionService = req.scope.resolve("anamnesisSectionService")

    const dto: CreateAnamnesisSectionDto = req.body

    try {
        const newAnamnesisSection = await anamnesisSectionService.create(dto)

        res.status(201).json({
            "success": true,
            data: newAnamnesisSection
        })
    } catch (error) {
        res.status(400).json({
            message: "Error creating anamnesis section",
            error: error.message,
        })
    }
}

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
 ) => {
    const anamnesisSectionService = req.scope.resolve("anamnesisSectionService")

    const list = await anamnesisSectionService.list()

    res.json({
        "success": true,
        data: list,
    })
}
