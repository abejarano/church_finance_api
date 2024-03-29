import ministerValidator from "../validators/Mininister.validator";
import { MinisterController } from "../controllers/Minister.controller";
import { MinisterPaginateRequest } from "../requests/MinisterPaginate.request";
import { FastifyInstance } from "fastify";
import { MinisterStructureType } from "../../../domain";
import { PermissionMiddleware } from "../../../../Shared/infrastructure/middleware/Permission.middleware";
import AssignChurchValidator from "../validators/AssignChurch.validator";

const opts = {
  schema: {
    body: {
      type: "object",
      properties: {
        someKey: { type: "string" },
        someOtherKey: { type: "number" },
      },
    },
  },
};

const ministerRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    "/",
    { preHandler: ministerValidator },
    async (req, res): Promise<void> => {
      await MinisterController.createOrUpdate(
        req.body as MinisterStructureType,
        res,
      );
    },
  );

  fastify.get("/without-assigned-church", async (req, res): Promise<void> => {
    await MinisterController.withoutAssignedChurch(res);
  });

  fastify.post(
    "/assign-church",
    { preHandler: [PermissionMiddleware, AssignChurchValidator] },
    async (req, res): Promise<void> => {
      await MinisterController.assignChurch(
        req.body as { churchId: string; ministerId: string },
        res,
      );
    },
  );

  fastify.get(
    "/",
    {
      preHandler: PermissionMiddleware,
    },
    async (req, res): Promise<void> => {
      const params = req.query as unknown as MinisterPaginateRequest;
      await MinisterController.search(params, res);
    },
  );

  fastify.get(
    "/:ministerDni",
    {
      preHandler: PermissionMiddleware,
    },
    async (req, res): Promise<void> => {
      const { ministerDni } = req.params as any;
      await MinisterController.findByDNI(ministerDni, res);
    },
  );
};
export default ministerRoute;
