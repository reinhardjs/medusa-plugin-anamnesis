import { Request, Response } from "express";

export class AnamnesisResponseController {
    async getResponseTemplateById(req: Request, res: Response) {
        const anamnesisResponseService = req.scope.resolve("anamnesisResponseService")

        const { id } = req.params

        const result = await anamnesisResponseService.getStoreResponseTemplateById(id)

        res.json({
            "success": true,
            data: result,
        })
    }
}
