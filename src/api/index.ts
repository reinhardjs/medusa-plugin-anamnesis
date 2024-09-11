import { Router } from "express"
import { AnamnesisFormController } from "../controllers/admin/anamnesis-form.controller";

export default (rootDirectory, options) => {
  const router = Router()
  const anamnesisFormController = new AnamnesisFormController();

  router.get("/admin/custom/forms/:id/template", (req, res) => {
    anamnesisFormController.getFormTemplateById(req, res)
  })

  return router
}
