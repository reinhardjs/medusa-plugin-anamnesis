import { Router } from "express"
import { AnamnesisFormController } from "../controllers/admin/anamnesis-form.controller";
import { AnamnesisResponseController } from "../controllers/store/anamnesis-response.controller";

export default (rootDirectory, options) => {
  const router = Router()
  const anamnesisFormController = new AnamnesisFormController();
  const anamnesisResponseController = new AnamnesisResponseController();

  router.get("/admin/custom/forms/:id/template", (req, res) => {
    anamnesisFormController.getFormTemplateById(req, res)
  })

  router.get("/store/custom/responses/:id/template", (req, res) => {
    anamnesisResponseController.getResponseTemplateById(req, res)
  })

  return router
}
