import { Router } from "express";
import { PermissionMiddleware } from "../../../../Shared/infrastructure";
import { SystemModuleController } from "../controllers/dashboard/SystemModule.controller";
import { CreateModuleRequest, OptionModuleDTO } from "../../../domain";

const modulesRoutes = Router();

modulesRoutes.get("/", PermissionMiddleware, async (req, res) => {
  await SystemModuleController.fetchAllModules(res);
});

modulesRoutes.post("/create-module", PermissionMiddleware, async (req, res) => {
  await SystemModuleController.createModule(
    req.body as unknown as CreateModuleRequest,
    res,
  );
});

modulesRoutes.put("/edit-module", PermissionMiddleware, async (req, res) => {
  await SystemModuleController.createModule(
    req.body as unknown as CreateModuleRequest,
    res,
  );
});

modulesRoutes.put(
  "/add-options-module/:systemModule",
  PermissionMiddleware,
  async (req, res) => {
    const { systemModule } = req.params as any;
    await SystemModuleController.addOptionsToModule(
      {
        option: req.body as unknown as OptionModuleDTO,
        systemModuleId: systemModule,
      },
      res,
    );
  },
);

export default modulesRoutes;
