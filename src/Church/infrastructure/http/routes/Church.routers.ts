import { ChurchController } from "../controllers/Church.controller";
import { ChurchPaginateRequest } from "../requests/ChurchPaginate.request";
import { FastifyInstance } from "fastify";
import { ChurchRequest } from "../requests/Church.request";
import { PermissionMiddleware } from "../../../../Shared/infrastructure/middleware/Permission.middleware";

const churchRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    "/",
    {
      preHandler: PermissionMiddleware,
    },
    async (req, res) => {
      await ChurchController.createOrUpdate(req.body as ChurchRequest, res);
    },
  );

  fastify.get(
    "/",
    {
      preHandler: PermissionMiddleware,
    },
    async (req, res) => {
      const params = req.query as unknown as ChurchPaginateRequest;
      await ChurchController.list(params, res);
    },
  );

  fastify.get(
    "/without-assigned-minister",
    {
      preHandler: PermissionMiddleware,
    },
    async (req, res) => {
      const params = req.query as unknown as ChurchPaginateRequest;
      await ChurchController.listWithoutAssignedMinister(res);
    },
  );

  fastify.post(
    "/remove-minister/:churchId",
    {
      preHandler: PermissionMiddleware,
    },
    async (req, res) => {
      await ChurchController.removeMinister(req.params["churchId"], res);
    },
  );

  fastify.get(
    "/:churchId",
    {
      preHandler: PermissionMiddleware,
    },
    async (req, res) => {
      const { churchId } = req.params as any;
      await ChurchController.findByChurchId(churchId, res);
    },
  );
};

export default churchRoute;
