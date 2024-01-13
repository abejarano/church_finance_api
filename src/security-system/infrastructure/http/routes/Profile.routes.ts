import { FastifyInstance } from "fastify";
import { PermissionMiddleware } from "../../../../shared/infrastructure/middleware/Permission.middleware";
import { ProfileController } from "../controllers/dashboard/Profile.controller";
import { CreateProfileRequest } from "../../../domain";

export const profileRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    "/",
    { preValidation: PermissionMiddleware },
    async (req, res) => {
      await ProfileController.createProfile(
        req.body as unknown as CreateProfileRequest,
        res,
      );
    },
  );

  fastify.get(
    "/",
    { preValidation: PermissionMiddleware },
    async (req, res) => {
      await ProfileController.fetchAllProfile(res);
    },
  );

  fastify.get(
    "/:profileId",
    { preValidation: PermissionMiddleware },
    async (req, res) => {
      const { profileId } = req.params as any;
      await ProfileController.findByProfileId(profileId, res);
    },
  );
};
