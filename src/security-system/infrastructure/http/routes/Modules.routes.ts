import { FastifyInstance } from "fastify";
import { PermissionMiddleware } from "../../../../shared/infrastructure/middleware/Permission.middleware";
import { SystemModuleController } from "../controllers/dashboard/SystemModule.controller";
import { CreateModuleRequest, OptionModuleDTO } from "../../../domain";

export const modulesRoutes = async (fastify: FastifyInstance) => {
  fastify.get(
    "/",
    { preValidation: PermissionMiddleware },
    async (req, res) => {
      await SystemModuleController.fetchAllModules(res);
    },
  );

  fastify.post(
    "/create-module",
    { preValidation: PermissionMiddleware },
    async (req, res) => {
      await SystemModuleController.createModule(
        req.body as unknown as CreateModuleRequest,
        res,
      );
    },
  );

  fastify.put(
    "/edit-module",
    { preValidation: PermissionMiddleware },
    async (req, res) => {
      await SystemModuleController.createModule(
        req.body as unknown as CreateModuleRequest,
        res,
      );
    },
  );

  fastify.put(
    "/add-options-module/:systemModule",
    { preValidation: PermissionMiddleware },
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
};
