import { Request, Response } from "express";

export class AnamnesisFormController {
    async getFormTemplateById(req: Request, res: Response) {
        const anamnesisFormService = req.scope.resolve("anamnesisFormService")

        const { id } = req.params

        const result = await anamnesisFormService.getAdminFormTemplateById(id)

        res.json({
            "success": true,
            data: result,
        })
    }
}
