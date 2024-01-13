import { FastifyInstance } from "fastify";
import {
  UserController,
  userLoginPayload,
} from "../controllers/dashboard/user.controller";
import { CreateUserRequest, FilterUserRequest } from "../../../domain";
import { PermissionMiddleware } from "../../../../shared/infrastructure/middleware/Permission.middleware";

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get(
    "/",
    { preValidation: PermissionMiddleware },
    async (req, res) => {
      await UserController.fetchAllUser(
        req.query as unknown as FilterUserRequest,
        res,
      );
    },
  );

  fastify.post(
    "/create",
    { preValidation: PermissionMiddleware },
    async (req, res) => {
      await UserController.createOrUpdateUser(
        req.body as unknown as CreateUserRequest,
        res,
      );
    },
  );

  fastify.put(
    "/edit-user/:userId",
    { preValidation: PermissionMiddleware },
    async (req, res) => {
      const { userId } = req.params as any;
      await UserController.createOrUpdateUser(
        { ...(req.body as unknown as CreateUserRequest), userId: userId },
        res,
      );
    },
  );

  fastify.post("/login", async (req, res) => {
    await UserController.login(req.body as unknown as userLoginPayload, res);
  });
};
